import React from 'react'
import Button from 'react-bootstrap/Button'

const Logout = ({ username, handleLogout }) => {
  return (
    <div>
      <p>
        {username} logged in <Button variant="secondary" size="sm" onClick={handleLogout}>Logout</Button>
      </p>
    </div>
  )
}

export default Logout