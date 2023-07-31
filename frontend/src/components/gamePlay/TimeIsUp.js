import React from 'react'
import { editSelectedRoom } from '../../redux/actions'
import { MAXTIME } from '../../constants'
import { connect } from 'react-redux'

class TimeIsUp extends React.Component {

  matchId = this.props.match.params.id

  componentDidMount = () => {
    // ping the db to update status
    this.props.setSelectedRoom(this.matchId)
    console.log('match= ', this.props.match)
  }

  handleClick = () => {
    const { selectedRoom, editSelectedRoom } = this.props
    const preplay = 'preplay'

    editSelectedRoom({room_id: selectedRoom.id, status: preplay, selected_phrase_id: null, drawer_id: null })
  }

  render() {
    const { selectedRoom } = this.props

    return (
      <div className='wrapper'>
        <h2>
          { `Whoops! Time ran out. You couldn't guess the correct answer in ${MAXTIME} seconds. The correct answer was "${selectedRoom.phrase.phrase}"` }
        </h2>
        <p>
          { `Better luck next-time ${selectedRoom.title}! This is the end of Game. You will be redirected automatically once the drawer starts over or you click Start Over.` }
        </p>
        <button onClick={ () => this.handleClick() }>start over
        </button>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) }
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    user: state.users.user,
    timer: state.timer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeIsUp)
