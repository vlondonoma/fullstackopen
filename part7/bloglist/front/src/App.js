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

  return (
    <Container>
      <h1>Blogs App</h1>
      <Notification />
      {!user ? (
        <LoginForm/>
      ) : (
        <>
          <Logout username = {user.name} handleLogout={handleLogout}/>
          <Bloglist blogs={ blogs } />
        </>
      )}
    </Container>
  )
}

export default App