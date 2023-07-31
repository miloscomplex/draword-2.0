import React from 'react'

class DrawerLeft extends React.Component {

  render() {
    return (
      <div className='wrapper'>

        <h2>
          Hi there, {this.props.currentUser.name}
        </h2>

        <h3>
          The drawer left the game. So it has reset.
        </h3>

        { !this.props.drawer_id && <button className='button, smaller' onClick={ event => this.props.handleDrawClick({type: 'drawer'}) }>I will draw</button> }

        <button className='button, smaller' onClick={ event => this.props.handleGuessClick({type: 'guesser'}) }>I will guess</button>

      </div>
    )
  }

}

export default DrawerLeft
