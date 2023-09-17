import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

import Bloglist from './components/Bloglist'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import blogService from './services/blogs'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import { Routes, Route, Link, Navigate } from 'react-router-dom'


const App = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
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
        <Route
          path="/login/"
          element={user ? <Navigate replace to="/" /> : <LoginForm />}
        />
      </Routes>
    </Container>
  )
}

export default App