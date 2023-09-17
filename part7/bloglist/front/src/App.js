import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

import Bloglist from './components/Bloglist'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Userlist from './components/Userlist'
import User from './components/User'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'

import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'


const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  const matchUser = useMatch('/users/:id')
  const userSelected = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
    dispatch(initializeUsers())
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <Container>
      <div>
        {user ? (
          <>
            <Link style={padding} to="/">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            <Logout username = {user.name} handleLogout={handleLogout}/>
          </>
        ) : (
          <Link style={padding} to="/login">login</Link>
        )}
      </div>
      <h1>Blogs App</h1>
      <Notification />
      <Routes>
        <Route path="/" element={<Bloglist blogs={blogs} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/users" element={<Userlist users={users} />} />
        <Route path="/users/:id" element={<User user={userSelected} />} />
        <Route
          path="/login/"
          element={user ? <Navigate replace to="/" /> : <LoginForm />}
        />
      </Routes>
    </Container>
  )
}

export default App