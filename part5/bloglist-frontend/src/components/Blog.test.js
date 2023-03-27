import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog = {
    id: '64040f7471b8e66910889a4d',
    title: 'Mi blog persona',
    author: 'Valentina Londoño Marin',
    url: 'https://valentinalondonomarin.com',
    likes: 4,
    user: {
      username: 'vlondono',
      name: 'Valentina Londoño Marin',
      id: '63fabff072d0cf357825f5b0',
    },
  }
  const mockLikesHandler = jest.fn()
  const mockRemoveHandler = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        likesUpdate = {mockLikesHandler}
        removeBlog = {mockRemoveHandler}
      />
    )
  })

  test('at start the detail info is not displayed', () => {
    const div = component.container.querySelector('.detailInfo')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, the detail info is displayed', () => {
    const button = component.container.querySelector('.showButton')
    fireEvent.click(button)

    const div = component.container.querySelector('.detailInfo')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking the button like twice, the handler is call twice', () => {
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockLikesHandler.mock.calls).toHaveLength(2)
  })
})