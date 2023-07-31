import React from 'react'
import Timer from '../ui/Timer'
import TimerDisplay from '../ui/TimerDisplay'
import Canvas from '../canvas/Canvas'
import ChatArea from '../chatBox/ChatArea'
import Callout from '../ui/Callout'
import { connect } from 'react-redux'
import { setSelectedRoom } from '../../redux/actions'

class MainGamePlay extends React.Component {

  componentDidMount = () => {
    const { id } = this.props.match.params
    // ping the db to update status
    this.props.setSelectedRoom(id)
    console.log('match= ', this.props.match)
  }

  whichTimer = () => {
    const { currentUser, selectedRoom, match } = this.props

    return currentUser.id === selectedRoom.drawer_id  && <Timer match={match} />
  }

  render() {

    const { selectedRoom, currentUser, match } = this.props

    return (
      <React.Fragment>
        <Callout selectedRoom={selectedRoom} currentUser={currentUser} />

        <div id='wrapper'>
          <div id='canvas'>
            <Canvas match={match} />
            { this.whichTimer() }
          </div>
          <ChatArea match={match} currentUser={currentUser} />
        </div>
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    selectedPhrase: state.selectedPhrase,
    currentUser: state.users.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedRoom: roomId => { dispatch(setSelectedRoom(roomId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGamePlay)
