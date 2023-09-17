import Button from 'react-bootstrap/Button'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showTemporalMessage } from '../reducers/notificationReducer'
import { updateBlogAction, commentBlogAction } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [ likes, setLikes ] = useState(blog.likes)
  const [comment, setComment] = useState('')

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

  const handleComment = async (event) => {
    try {
      event.preventDefault()
      dispatch(commentBlogAction(blog.id, comment))
      setComment('')
    } catch (error) {
      console.log(error)
    }
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
      <h4>Comments</h4>
      <form onSubmit={handleComment}>
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button id="submit-button" type="submit"> Add comment </Button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => {
          return <li key={index}> {comment}</li>
        })}
      </ul>
    </div>
  )}

export default Blog