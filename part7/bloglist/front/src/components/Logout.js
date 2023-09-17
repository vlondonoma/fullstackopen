import React from 'react'
import Button from 'react-bootstrap/Button'

const Logout = ({ username, handleLogout }) => {
  return (
    <em>
      {username} logged in <Button variant="secondary" size="sm" onClick={handleLogout}>Logout</Button>
    </em>
  )
}

export default Logout