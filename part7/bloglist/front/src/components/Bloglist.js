import { useState } from 'react'

import CreateForm from './CreateForm'
import Togglable from './Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { showTemporalMessage } from '../reducers/notificationReducer'
import { createBlogAction } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table'

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

  return (
    <div>
      {!user ? (
        <></>
      ) : (
        <div>
          <Togglable buttonId="create" buttonLabel="new blog">
            <CreateForm newBlog={newBlog} setNewBlog={setNewBlog} createNewBlog={createNewBlog} />
          </Togglable>
          <br/>
          <h4>Blogs registered by {user.name}</h4>
          <Table striped bordered hover>
            <tbody>
              {blogs.map(blog =>
                <tr key={blog.id}>
                  <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default Bloglist