import React from 'react'
import { Link } from 'react-router-dom'

class Footer extends React.Component {
  render() {
    return (
      <div id='footer'>
        <p>
          <Link to='/'>Draword</Link>
          <Link className='footer-link' to='/new'>New Game</Link>
          <Link className='footer-link' to='/how-to-play'> How To Play</Link>
          <Link className='footer-link' to='/leaderboard'>Leaderboard</Link>
        </p>
      </div>
    )
  }
}

export default Footer
