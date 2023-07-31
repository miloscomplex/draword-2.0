import { API_ROOT, PARSE_JSON, HEADERS } from '../../constants'

export function loadPhrases() {
  return (dispatch) => {
    fetch(`${API_ROOT}/random-phrases`).then(PARSE_JSON)
    .then(data => dispatch({type: 'ADD_PHRASES', payload: data}))
  }
}

export function loadChats(roomId) {
  return (dispatch) => {
    //dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${roomId}`)
    .then(PARSE_JSON)
    //.then(data => console.log('loadChats= ', data.chats ))
    .then(data => dispatch({type: 'LOAD_CHATS', payload: data}))
  }
}

export function addChat(chatObj) {
  return (dispatch) => {
    dispatch({ type: 'ADD_CHAT', payload: chatObj })
  }
}

export function setPhrase(phraseObj) {
  return (dispatch) => {
    //dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/phrases/${phraseObj.phrase_id}`)
    .then(PARSE_JSON)
    //.then(data => console.log('setPhrase= ', data))
    .then(data => dispatch({ type: 'SET_ROOM_PHRASE', payload: data }))
    .catch( err =>  console.log('err= ', err))
  }
}

export function setRoom(roomId) {
  return (dispatch) => {
    //dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${roomId}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(roomId)
    }).then(PARSE_JSON)
    .then(data => dispatch({ type: 'UPDATE_ROOM', payload: data }))
  }
}

export function getPhrase(phraseId) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/phrases/${phraseId}`)
    .then(PARSE_JSON)
    .then(data => dispatch({ type: 'SET_ROOM_PHRASE', payload: data }))
  }
}

export function loadRooms() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_ROOMS' })
    fetch(`${API_ROOT}/rooms`)
    .then(PARSE_JSON)
    .then(data => dispatch({type: 'ADD_ROOMS', payload: data}))
  }
}

export function broadcastRoomStatus(roomObj) {
  return (dispatch) => {
      dispatch({ type: 'UPDATE_SELECTED_ROOM', payload: roomObj.room })
      console.log('broadcastRoomStatus', roomObj.room );
    }
}

export function setSelectedRoom(roomId) {
  return (dispatch) => {
    dispatch({ type: 'LOADING_ROOM' })
    fetch(`${API_ROOT}/rooms/${roomId}`)
    .then(PARSE_JSON)
    .then(data => dispatch({ type: 'UPDATE_SELECTED_ROOM', payload: data}) )
    .then( data => console.log('setSelectedRoom', data) )
    .catch( err =>  console.log('err= ', err))
  }
}

export function updateSelectedRoom(roomId) {
  return (dispatch) => {
    //dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${roomId}`)
    .then(PARSE_JSON)
    .then(data => dispatch({ type: 'UPDATE_SELECTED_ROOM', payload: data}) )
    .catch( err =>  console.log('err= ', err))
  }
}

export function loadRoom(roomObj) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${roomObj.room_id}`)
    .then(PARSE_JSON)
    .then(data => dispatch({ type: 'LOAD_ROOM', payload: data}) )
    .catch( err =>  console.log('err= ', err))
  }
}

export function editSelectedRoom(roomObj) {
  //console.log('editRoom roomObj= ', roomObj);
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${roomObj.room_id}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(roomObj),
    }).then(PARSE_JSON)
    .then(data => dispatch({ type: 'UPDATE_SELECTED_ROOM', payload: data }))
  }
}

export function editTimer(timerObj) {
  //console.log('editRoom timerObj= ', timerObj);
  return (dispatch) => {
    dispatch({ type: 'FETCHING_TIMER' })
    fetch(`${API_ROOT}/timer/${timerObj.room_id}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(timerObj),
    }).then(PARSE_JSON)
    .then(data => dispatch({ type: 'UPDATE_TIMER', payload: data }))
  }
}

export function createOrFindUser(userId) {
  //console.log('editUser roomObj= ', roomObj);
  return (dispatch) => {
    dispatch({ type: 'LOADING_USER' })
    fetch(`${API_ROOT}/users`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(userId),
    }).then(PARSE_JSON)
    .then(data => dispatch({ type: 'UPDATE_USER', payload: data }))
  }
}

export function editUser(userObj) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/users/${userObj.user_id}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(userObj),
    }).then(PARSE_JSON)
    .then(data => dispatch({ type: 'UPDATE_USER', payload: data }))
  }
}

export function updateTimer(timerObj) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_TIMER', payload: timerObj })
  }
}

export function removeUser(userObj) {
  return (dispatch) => {
    fetch(`${API_ROOT}/users/${userObj.user_id}`, {
      method: 'DELETE',
      headers: HEADERS,
      body: JSON.stringify(userObj),
    }).then(PARSE_JSON)
    .then(data => dispatch({ type: 'REMOVE_USER', payload: data }))
  }
}

export function loadScores() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_SCORES' })
    fetch(`${API_ROOT}/scores`).then(PARSE_JSON)
    .then(data => dispatch({type: 'ADD_SCORES', payload: data}))
  }
}
