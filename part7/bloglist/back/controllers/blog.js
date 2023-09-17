const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
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

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blogModel = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.votes,
    user: user._id
  })

  const savedBlog = await blogModel.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== request.userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const opc = { new: true, runValidators: true, context: 'query' }

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== request.userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: body.likes }, opc)
  response.json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: body.comment } },
    { new: true }
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter