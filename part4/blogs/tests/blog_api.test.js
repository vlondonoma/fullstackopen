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

describe('test on blog list:', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('are returned with correct length', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('has id on one blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('test on blog post:', () => {
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
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.titles)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newLikes = blogToUpdate.likes + 1

    const likeInfo = {
      likes: newLikes
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(likeInfo)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(newLikes)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})