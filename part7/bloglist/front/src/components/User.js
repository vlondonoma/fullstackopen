import { Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table'

const User = ({ user }) => {

  return (
    <div>
      <br/>
      <h4>Blogs registered by {user.name}</h4>
      <Table striped bordered hover>
        <tbody>
          {user.blogs.map(blog =>
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default User