  export const filterAnecdotes = (text) => {
    return {
      type: 'FILTER',
      data: text
    }
  }
  
  const reducer = (state = "", action) => {
    switch (action.type) {
      case 'FILTER':
        return action.data
      default: return state
    }
  }
  
  export default reducer