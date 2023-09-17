import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Blog from './Blog'
import CreateForm from './CreateForm'
import Togglable from './Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { showTemporalMessage } from '../reducers/notificationReducer'
import { createBlogAction, updateBlogAction, deleteBlogAction } from '../reducers/blogReducer'

const Bloglist = ({ blogs }) => {

  const user = useSelector((state) => state.user)

  const [newBlog, setNewBlog] = useState({
    title: null,
    author: null,
    url: null,
  })

  const dispatch = useDispatch()

  const showMessage = (type, message) => {
    dispatch(showTemporalMessage({ 'type':type, 'text':message }))
  }

  const createNewBlog = async (newBlog) => {
    try {
      dispatch(createBlogAction(newBlog))
      setNewBlog({
        title: null,
        author: null,
        url: null,
      })
      showMessage('success',`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      showMessage('danger',error.message)
    }
  }

  const likesUpdate = async (id, blogObject) => {
    try {
      dispatch(updateBlogAction(id, blogObject))
      showMessage('success','Successfully like added')
    } catch (error) {
      showMessage('danger',error.message)
    }
  }

  const removeBlog = async id => {
    try {
      dispatch(deleteBlogAction(id))
      showMessage('success','The blog was successfully deleted')
    } catch (error) {
      showMessage('danger',error.message)
    }
  }

  return (
    <div>
      {!user ? (
        <></>
      ) : (
        <div>
          <Togglable buttonId="create" buttonLabel="new blog">
            <CreateForm newBlog={newBlog} setNewBlog={setNewBlog} createNewBlog={createNewBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              likesUpdate = {likesUpdate}
              removeBlog = {removeBlog}
              user={user}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Bloglist