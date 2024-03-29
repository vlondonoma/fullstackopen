import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: null,
    author: null,
    url: null,
  })
  const [refreshBlogs, setRefreshBlogs] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [refreshBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage('danger','Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const showMessage = (type, message) => {
    setMessage({ 'type':type,'text':message })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createNewBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      setRefreshBlogs(!refreshBlogs)
      setNewBlog({
        title: null,
        author: null,
        url: null,
      })
      showMessage('success',`a new blog ${response.title} by ${response.author} added`)
    } catch (error) {
      showMessage('danger',error.message)
    }
  }

  const likesUpdate = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)
      setRefreshBlogs(!refreshBlogs)
      showMessage('success','Successfully like added')
    } catch (error) {
      showMessage('danger',error.message)
    }
  }

  const removeBlog = async id => {
    try {
      await blogService.remove(id)
      setRefreshBlogs(!refreshBlogs)
      showMessage('success','The blog was successfully deleted')
    } catch (error) {
      showMessage('danger',error.message)
    }
  }

  return (
    <Container>
      <h1>Blogs App</h1>
      <Notification message={message} />
      {!user ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <Logout
            username = {user.name}
            handleLogout={handleLogout}
          />
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              likesUpdate = {likesUpdate}
              removeBlog = {removeBlog}
              user={user}
            />
          )}
          <Togglable buttonId="create" buttonLabel="new blog">
            <CreateForm newBlog={newBlog} setNewBlog={setNewBlog} createNewBlog={createNewBlog} />
          </Togglable>
        </div>
      )}
    </Container>
  )
}

export default App