import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { showTemporalMessage } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

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
      dispatch(showTemporalMessage({ 'type':'danger', 'text':'Wrong username or password' }))
    }
  }

  return (
    <div>
      <h2>Login to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>username (vlondono)</Form.Label>
          <Form.Control
            type="text"
            id="username"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>password (123456)</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button id="login-button" variant="primary" type="submit">login</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm