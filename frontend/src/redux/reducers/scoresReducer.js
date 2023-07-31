
const defaultStore = {
  loading: true,
}

function scoresReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'LOADING_SCORES':
      return {...state, loading: true }
    case 'ADD_SCORES':
      return {...state, scoresList: action.payload, loading: false }
    default:
      return state
  }
}

export default scoresReducer
