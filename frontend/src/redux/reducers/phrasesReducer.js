const defaultStore = {
  phrasesList: [],
}

function phrasesReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'ADD_PHRASES':
      return {...state, phrasesList: action.payload }
    case 'LOAD_PHRASES':
      return action.payload
    default:
      return state
  }

}

export default phrasesReducer
