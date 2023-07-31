import React from 'react'
import GamePlay from './GamePlay'
import { connect } from 'react-redux'
import { setSelectedRoom, editSelectedRoom, createOrFindUser } from '../redux/actions'

class GameContainer extends React.Component {

  // match is this browser props
  matchObj = this.props.match
  matchId = this.props.match.params.id

  componentDidMount = () => {
    const { currentUser } = this.props

    this.props.createOrFindUser({ user_id: currentUser.id, room_id: this.matchId })
    this.props.setSelectedRoom(this.matchId)
  }

  componentWillUnmount = () => {
    console.log('GameContainer unmounted!');
  }

  renderBusy = () => {
    return <span className='loading-message'> </span>
  }

  uhOh = () => {
    return <h2>Whoops! something went wrong maybe <code>{this.matchObj.url}</code> isn't a valid room</h2>
  }

  renderGamePlay = () => {
    return this.props.loadingUser ? this.renderBusy() : <GamePlay match={this.matchObj} />
  }

  render() {
    const { selectedRoom } = this.props

    return (
      <div>
        {
          selectedRoom
          ?
          this.renderGamePlay()
          :
          this.uhOh()
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    currentUser: state.users.user,
    loadingUser: state.users.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedRoom: roomId => { dispatch(setSelectedRoom(roomId)) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    createOrFindUser: userObj => { dispatch(createOrFindUser(userObj)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
