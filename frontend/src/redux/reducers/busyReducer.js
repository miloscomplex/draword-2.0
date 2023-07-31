function busyReducer(state = false, action) {
  switch (action.type) {
    case 'FETCHING':
      return true
    case 'ADD_PHRASES':
      return false
    case 'LOAD_ROOMS':
      return false
    case 'ADD_ROOMS':
      return false
    case 'UPDATE_USER':
      return false
    case 'LOAD_CHATS':
      return false
    case 'UPDATE_SELECTED_ROOM':
      return false
    default:
      return state
  }

}

export default busyReducer
