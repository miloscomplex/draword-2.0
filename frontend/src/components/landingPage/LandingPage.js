import React from 'react'
import RoomsList from '../rooms/RoomsList'

class HowToPlay extends React.Component {

  render() {
    return (
      <div className='wrapper'>
        <div className='landing-page'>
          <h1>Hey there, welcome to Draword.</h1>
          <h3>The current theme for the game is Popular Karaoke Song.</h3>

          <p>So try to think of songs that you'd chose to slay the microphone, if your guessing. The title is only necessary, not the artist, to win the round. If you decide to draw, draw your heart out and keep a 'Never Gonna Give You Up' attitude until either time expires or the word is correctly guessed.</p>

          <p>If you like to draw, either choose a room that is marked 'You can draw' or make your own room. Then share the URL with your friends to start the game.</p>

          <p>If you want to guess, select a room that is marked 'be a guesser.' You'll receive updates via the chat box in regards to the gameplay.</p>

          <p className='strong'>Good Luck!</p>
        </div>

        <RoomsList />

      </div>
    )
  }
}

export default HowToPlay
