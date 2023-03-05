import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = ({
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
}) => {
  return (
    <div>
      <h2>Login to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="loginFormUsername">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginFormPassword">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm