import React from 'react'
import Button from 'react-bootstrap/Button';

const Logout = ({username, handleLogout}) => {
  return (
    <div>
      <p>
        {username} logged in <Button variant="primary" onClick={handleLogout}>Log out</Button>
      </p>
    </div>
  )
}

export default Logout