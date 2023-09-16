import { useState } from 'react'
import Button from 'react-bootstrap/Button'

const Blog = ({ blog, likesUpdate, removeBlog, user }) => {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const showWhenCreatorUser = { display: blog.user.username === user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }
    likesUpdate(blog.id, blogObj)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.tile} by ${blog.author}?`) === true) {
      removeBlog(blog.id)
    }
  }

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderColor: '#6c757d',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author} <Button className="showButton" variant="warning" size="sm" onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</Button>
        <div className="detailInfo" style={showWhenVisible}>
          {blog.url}
          <br/>
          Likes {blog.likes} <Button className="likeButton" variant="secondary" size="sm" onClick={handleLike}> like </Button>
          <br/>
          <br/>
          <Button style={showWhenCreatorUser} variant="danger" size="sm" onClick={handleRemove}> remove </Button>
        </div>
      </div>
    </div>
  )}

export default Blog