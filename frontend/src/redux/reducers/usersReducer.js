
const defaultStore = {
  loading: false,
  user: []
}

function usersReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'LOADING_USER':
      return {...state, loading: true }
    case 'CREATE_USER':
      return {...state, user: action.payload, loading: false }
    case 'UPDATE_USER':
      return {...state, user: action.payload, loading: false }
    case 'REMOVE_USER':
      return {...state, user: [] }
    default:
      return state
  }
}

export default usersReducer
