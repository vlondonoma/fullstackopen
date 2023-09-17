import { Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table'

const Userlist = ({ users }) => {

  return (
    <div>
      <h4>Users</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> Name </th>
            <th> Blog created </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Userlist