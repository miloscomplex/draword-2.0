
const defaultStore = {
  room_id: null,
  time: 0,
  isOn: false,
  start: 0
}

function timerReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'FETCHING_TIMER':
      return {...state, loading: true }
    case 'UPDATE_TIMER':
      return action.payload
    default:
      return state
  }
}

export default timerReducer
