const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((favorite, item) => {
      return favorite.likes > item.likes ? favorite : item
    })
}

const mostBlogs = (blogs) => {
  if(blogs.length > 0){
    const authorsWithCountReducer = blogs.reduce((counts, blog) => {
      if (!counts[blog.author]) {
        counts[blog.author] = 0
      }
      counts[blog.author]++
      return counts
    },{})

    return Object.entries(authorsWithCountReducer).reduce((top, [author, count]) => {
      return top.count > count ? top : { author, count }
    }, { count: 0 })
  }
  return null
}

const mostLikes = (blogs) => {
  if(blogs.length > 0){
    const authorsWithCountReducer = blogs.reduce((counts, blog) => {
      if (!counts[blog.author]) {
        counts[blog.author] = 0
      }
      counts[blog.author]+=blog.likes
      return counts
    },{})

    return Object.entries(authorsWithCountReducer).reduce((top, [author, count]) => {
      return top.count > count ? top : { author, count }
    }, { count: 0 })
  }
  return null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}