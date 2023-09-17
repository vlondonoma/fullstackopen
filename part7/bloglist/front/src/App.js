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

import { useDispatch, useSelector } from 'react-redux'
import { showTemporalMessage } from './reducers/notificationReducer'
import { initializeBlogs, createBlogAction, updateBlogAction, deleteBlogAction } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlog, setNewBlog] = useState({
    title: null,
    author: null,
    url: null,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      console.log('holi')
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage('danger','Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const showMessage = (type, message) => {
    dispatch(showTemporalMessage({ 'type':type, 'text':message }))
  }

  const createNewBlog = async (newBlog) => {
    try {
      dispatch(createBlogAction(newBlog))
      setNewBlog({
        title: null,
        author: null,
        url: null,
      })
      showMessage('success',`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      showMessage('danger',error.message)
    }
  }

  const likesUpdate = async (id, blogObject) => {
    try {
      dispatch(updateBlogAction(id, blogObject))
      showMessage('success','Successfully like added')
    } catch (error) {
      showMessage('danger',error.message)
    }
  }

  const removeBlog = async id => {
    try {
      dispatch(deleteBlogAction(id))
      showMessage('success','The blog was successfully deleted')
    } catch (error) {
      showMessage('danger',error.message)
    }
  }

  return (
    <Container>
      <h1>Blogs App</h1>
      <Notification />
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