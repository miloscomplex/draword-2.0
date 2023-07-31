import React from 'react'
import { editSelectedRoom } from '../../redux/actions'
import { connect } from 'react-redux'
import { API_ROOT, HEADERS } from '../../constants'

class EndOfGame extends React.Component {

  state = {
    submitted: false,
  }

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

  handleSubmitScore = () => {
    this.setState({ submitted: true })
    const { selectedRoom, timer } = this.props
    const scoreObj = { room_id: selectedRoom.id, time_in_seconds: timer.time, phrase: selectedRoom.phrase.phrase }
    fetch(`${API_ROOT}/scores`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(scoreObj),
    })
  }

  isDrawer = () => {
    const { selectedRoom, user, timer } = this.props

    return (
      selectedRoom.drawer_id === user.id &&
      (
        this.state.submitted
        ?
        <div>
          <h4>Thanks for your submission!</h4>
        </div>
        :
        <div className='alt-background'>
          <h4>
            Hey there drawer do you want to record your winning?
          </h4>
          <p>
            It looks like it only took your guesser's <strong>{ timer.time }</strong> seconds to guess the phrase <strong>{ selectedRoom.phrase.phrase }</strong>
          </p>
          <button onClick={ () => this.handleSubmitScore() }>submit your time</button>
          <button onClick={ () => this.handleClick() } >maybe next time</button>
        </div>
      )
    )
  }

  render() {
    const { selectedRoom } = this.props

    return (
      <div className='wrapper'>
        <h2>
          Wow you won ! { `The correct answer was ${selectedRoom.phrase.phrase}`}
        </h2>
        <p>
          { `Good Job room: ${selectedRoom.title}! This is the end of Game. You will be redirected automatically once the drawer starts over or submits your score.` }
        </p>
        <button onClick={ () => this.handleClick() }>start over
        </button>
        { this.isDrawer() }
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
export default connect(mapStateToProps, mapDispatchToProps)(EndOfGame)
