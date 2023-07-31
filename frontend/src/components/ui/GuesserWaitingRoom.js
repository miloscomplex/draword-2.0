import React from 'react'
import { connect } from 'react-redux'

class GuesserWaitingRoom extends React.Component {
  // TODO: Make a set timeout and enter mainGamePlay
  loadMainGamePlay = () => {
    //const status = 'playing'
    //this.props.updateLocalStatus( status )
  }

  componentDidMount = () => {
    setTimeout(this.loadMainGamePlay, 500)
  }

  render() {

    return (
      <div>
        <h2>The drawee is selecting a phrase</h2>
        <p className='description'>The game will appear once they have decided on a clue</p>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateLocalStatus: status => dispatch({ type: 'UPDATE_LOCAL_STATUS', payload: status})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuesserWaitingRoom)
