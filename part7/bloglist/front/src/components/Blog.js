import Button from 'react-bootstrap/Button'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showTemporalMessage } from '../reducers/notificationReducer'
import { updateBlogAction } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [ likes, setLikes ] = useState(blog.likes)

  const likesUpdate = async (id, blogObject) => {
    try {
      dispatch(updateBlogAction(id, blogObject))
      dispatch(showTemporalMessage({ 'type': 'success','text': 'Successfully like added' }))
    } catch (error) {
      dispatch(showTemporalMessage({ 'type': 'danger','text': error.message }))
    }
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
    setLikes(blogObj.likes)
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <a href={blog.url}>{blog.url}</a>
      <br/>
      added by {blog.author}
      <br/>
      Likes {likes} <Button className="likeButton" variant="secondary" size="sm" onClick={handleLike}> like </Button>
      <br/>
    </div>
  )}

export default Blog