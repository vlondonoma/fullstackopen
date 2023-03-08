import { useState } from 'react'
import Button from 'react-bootstrap/Button';

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderColor: '#6c757d',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <Button variant="warning" size="sm" onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</Button>
        <div style={showWhenVisible}>
          {blog.url}
          <br/>
          Likes {blog.likes} <Button variant="secondary" size="sm"> like </Button>
          <br/>
          {blog.user !== undefined && blog.user.name}
          <br/>
          <Button variant="danger" size="sm"> remove </Button>
        </div>
      </div>
  </div>
)}

export default Blog