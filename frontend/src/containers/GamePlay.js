import React from 'react'
import PrePlay from '../components/gamePlay/PrePlay'
import PhraseSelection from '../components/gamePlay/PhraseSelection'
import MainGamePlay from '../components/gamePlay/MainGamePlay'
import EndOfGame from '../components/gamePlay/EndOfGame'
import DrawerLeft from '../components/gamePlay/DrawerLeft'
import TimeIsUp from '../components/gamePlay/TimeIsUp'

import cable from '../services/Cable'
import { connect } from 'react-redux'
import { getPhrase, editSelectedRoom, editUser, loadRooms, setSelectedRoom, broadcastRoomStatus } from '../redux/actions'


class GamePlay extends React.Component {

  // match is this browser props
  matchObj = this.props.match
  matchId = this.props.match.params.id

  gamePlayChannelRef = null

  // need to add action cable to have overlays and announcements broadcasted
  gamePlayChannel = () => {
    this.gamePlayChannelRef = cable.subscriptions.create({
    channel: `RoomChannel`,
    room_id: this.props.selectedRoom.id,
    user_id: this.props.currentUser.id
    },
      {connected: () => {
        console.log('RoomChannel connected!')
      },
      disconnected: () => {
        console.log('RoomChannel disconnected!')
      },
      received: data => {
        !data.current_time && this.handleReceivedData(data)
        console.log('RoomChannel data received', data)
      },
    })
  }

  componentDidMount = () => {
    // init cable
    this.gamePlayChannel()
  }

  componentWillUnmount = () => {
    console.log('GamePlay unmounted')
    this.gamePlayChannelRef.unsubscribe()
    // removing for now seems redundant
    // console.log('cable.subscriptions', cable.subscriptions);
    // cable.subscriptions.subscriptions.forEach( subscription => {
    //   subscription.unsubscribe()
    // })
    // cable.disconnect()
    // now null-ing is executed by unsubscribe of action_cable for gamePlay
  }

  handleReceivedData = data => {
    //console.log('receivedData= ', data);
    this.props.broadcastRoomStatus(data)
  }

  handleDrawClick = userObj => {
    const { currentUser, selectedRoom } = this.props
    const statusStr = 'start'

    this.props.editSelectedRoom({room_id: selectedRoom.id, drawer_id: currentUser.id, status: statusStr })
  }

  handleGuessClick = userObj => {
    const statusStr = 'start'
    // don't forget to pass room_id elsewise sets it to null
    this.props.editSelectedRoom({ room_id: this.matchId, status: statusStr })
  }

  renderBusy = () => {
    return <span className='loading-message'> </span>
  }


  renderContent = () => {
    const { selectedRoom, currentUser, match, setSelectedRoom } = this.props

    switch (this.props.gameStatus) {
      case 'preplay':
        return <PrePlay
                  drawer_id={selectedRoom.drawer_id}
                  currentUser={currentUser}
                  handleDrawClick={this.handleDrawClick} handleGuessClick={this.handleGuessClick}
                />
      case 'start':
        return <PhraseSelection handleDrawClick={this.handleDrawClick} selectedRoom={selectedRoom} currentUser={currentUser} drawer_id={selectedRoom.drawer_id} />
      case 'playing':
        return <MainGamePlay match={match} />
      case 'end':
        return <EndOfGame match={match} setSelectedRoom={setSelectedRoom} />
      case 'drawerLeft':
        return <DrawerLeft
          match={match}
          currentUser={currentUser}
          setSelectedRoom={setSelectedRoom}
          drawer_id={selectedRoom.drawer_id}
          handleDrawClick={this.handleDrawClick} handleGuessClick={this.handleGuessClick}
        />
      case 'timeIsUp':
        return <TimeIsUp match={match} setSelectedRoom={setSelectedRoom} />
      default:
        return <h2>Something isn't quite right...</h2>
    }
  }

  render() {
    return (
      <div>
          { this.renderContent() }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    gameStatus: state.rooms.selectedRoom.status,
    selectedPhrase: state.selectedPhrase,
    currentUser: state.users.user,
    busySignal: state.busySignal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //releasePhrase: () => dispatch({ type: 'RELEASE_PHRASE' }),
    getPhrase: phraseId => { dispatch(getPhrase(phraseId)) },
    releasePhrase: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    editUser: userObj => { dispatch(editUser(userObj)) },
    addUserToRoom: userObj => { dispatch(editUser(userObj)) },
    loadRooms: () => { dispatch(loadRooms()) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    setSelectedRoom: roomId => { dispatch(setSelectedRoom(roomId)) },
    broadcastRoomStatus: roomObj => { dispatch(broadcastRoomStatus(roomObj)) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
