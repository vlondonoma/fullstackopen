const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog has id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'My new blog',
    author: 'me',
    url: 'https://myblog.org/',
    likes: 100,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain('My new blog')
})

test('0 by default in likes property', async () => {
  const newBlog = {
    title: 'My new blog',
    author: 'me',
    url: 'https://myblog.org/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const lastIndex = blogsAtEnd.length - 1
  expect(blogsAtEnd[lastIndex].likes).toBe(0)
})

test('400 error when create blog without title or author', async () => {
  const withoutTitle = {
    author: 'me',
    url: 'https://myblog.org/',
  }

  const withoutAuthor = {
    title: 'My new blog',
    url: 'https://myblog.org/',
  }

  await api
    .post('/api/blogs')
    .send(withoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(withoutAuthor)
    .expect(400)
})


afterAll(async () => {
  await mongoose.connection.close()
})