const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs)
    })
    .catch((error) => next(error))
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blogModel = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.votes,
  })

  blogModel
    .save()
    .then((savedBlog) => {
      response.json(savedBlog)
    })
    .catch((error) => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const opc = { new: true, runValidators: true, context: 'query' }

  Blog.findByIdAndUpdate(request.params.id, { number: body.number }, opc)
    .then((savedBlog) => {
      response.json(savedBlog)
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter