import React from 'react'

const Logout = ({username, handleLogout}) => {
  return (
    <div>
      <p>
        {username} logged in <button onClick={handleLogout}>Log out</button>
      </p>
    </div>
  )
}

export default Logout