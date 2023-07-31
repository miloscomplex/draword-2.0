import React from 'react'
import Timer from '../ui/Timer'
import Score from '../ui/Score'
import Canvas from './Canvas'
import ChatArea from '../chatBox/ChatArea'
import { connect } from 'react-redux'

class CanvasContainer extends React.Component {

  state = {
    playing: false
  }

  render() {
    /* this.props.match.params ==> what's the url for the room */
    const roomURL = this.props.match.params
    const selectedPhrase = this.props.selectedPhrase

    return (
      <div>
            {
            this.state.playing
            ?
              <React.Fragment>
                <div className='phraseReminder'> Your phrase/word is <strong>{ selectedPhrase }</strong></div>
                <div id='wrapper'>
                  <div id='canvas'>
                    <Canvas  params={roomURL} />
                    <Timer />
                  </div>
                  <ChatArea params={roomURL} />
                </div>
              </React.Fragment>
            :
              <React.Fragment>
                <h2>Reminder:</h2>
                <p>Your Word/Phrase is { selectedPhrase }</p>
                <button onClick={this.handleClick}>Click to start!</button>
              </React.Fragment>
            }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    selectedPhrase: state.rooms.selectedRoom.phrase
  }
}



export default connect(mapStateToProps)(CanvasContainer)
