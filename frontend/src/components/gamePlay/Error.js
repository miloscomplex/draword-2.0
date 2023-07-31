import React from 'react'
import { Link } from 'react-router-dom'

class Error extends React.Component {

  render() {

    return (
      <div className='wrapper'>
        <h2>Something isn't quite right... Please select another room</h2>
        <div className='button'><Link to='/new'>New Game</Link></div>

      </div>
    )
  }

}

export default Error
