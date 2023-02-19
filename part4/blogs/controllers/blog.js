const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blogModel = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.votes,
  })

  const savedBlog = await blogModel.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const opc = { new: true, runValidators: true, context: 'query' }

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, { number: body.number }, opc)
  response.json(savedBlog)
})

module.exports = blogsRouter