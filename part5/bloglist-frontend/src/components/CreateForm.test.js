import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from '../components/CreateForm'

describe('<CreateForm />', () => {
  test('Create new blog', () => {
    const setNewBlog = jest.fn()
    const createNewBlog = jest.fn()

    const component = render(<CreateForm setNewBlog={setNewBlog} createNewBlog={createNewBlog} />)

    const titulo = component.container.querySelector('#title')
    const autor = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(titulo, { target: { value: 'Mi nuevo blog' } })
    fireEvent.change(autor, { target: { value: 'Valentina LM' } })
    fireEvent.change(url, { target: { value: 'https://nuevo.com' } })

    const button = component.container.querySelector('.createButton')
    fireEvent.click(button)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(setNewBlog.mock.calls[0][0].title).toBe('Mi nuevo blog')
    expect(setNewBlog.mock.calls[1][0].author).toBe('Valentina LM')
    expect(setNewBlog.mock.calls[2][0].url).toBe('https://nuevo.com')
  })
})