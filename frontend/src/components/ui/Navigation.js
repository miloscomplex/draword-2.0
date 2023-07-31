import React from 'react'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
  render() {
    return (
      <div id='nav'>
        <Link to='/new'>New Game</Link>
        <Link to='/how-to-play'>How To Play</Link>
        <Link to='/leaderboard'>Leaderboard</Link>
      </div>
    )
  }
}

export default Navigation
