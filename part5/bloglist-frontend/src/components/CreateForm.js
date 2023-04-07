import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CreateForm = ({
  newBlog,
  setNewBlog,
  createNewBlog,
}) => {

  const handleNewBlog = async (event) => {
    event.preventDefault()
    createNewBlog(newBlog)
    event.target.reset()
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group className="mb-3">
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            id="title"
            name="title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            id="author"
            name="author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>url</Form.Label>
          <Form.Control
            type="url"
            id="url"
            name="url"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </Form.Group>
        <Button className="createButton" variant="primary" type="submit">create</Button>
      </Form>
    </div>
  )
}

export default CreateForm