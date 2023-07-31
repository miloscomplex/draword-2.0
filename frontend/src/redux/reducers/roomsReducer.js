
const defaultStore = {
  loading: false,
  roomsList: [],
  selectedRoom: ''
}

function roomsReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'LOAD_CHAT':
      return {...state, chats: action.payload.chats }
    case 'ADD_CHAT':
      const newChat = action.payload
      return {
        ...state,
        selectedRoom: {
          ...state.selectedRoom,
            chats: [ ...state.selectedRoom.chats, newChat ]
        }
      }
    case 'LOADING_ROOMS':
      return {...state, loading: true }
    case 'LOADING_ROOM':
      return {...state, loading: true }
    case 'ADD_ROOMS':
      return {...state, roomsList: action.payload, loading: false }
    case 'UPDATE_SELECTED_ROOM':
      return {...state, selectedRoom: action.payload, loading: false }
    case 'UPDATE_LOCAL_STATUS':
      return {
        ...state,
        selectedRoom: {
          ...state.selectedRoom,
          status: action.payload
        }
    }
    case 'REMOVE_SELECTED_ROOM':
      return {...state, selectedRoom: '' }
    case 'LOAD_ROOM':
      return {...state, roomsList: { ...state.roomsList, roomsList: action.payload }}
    case 'RELEASE_PHRASE':
      return {
        ...state,
        selectedRoom: {
          ...state.selectedRoom,
            selected_phrase_id: null,
            selectedPhrase: null
        }
      }
    default:
      return state
  }
}

export default roomsReducer
