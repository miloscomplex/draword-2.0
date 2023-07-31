import React from 'react'

class PrePlay extends React.Component {

  render() {
    return (
      <div className='wrapper'>

        <h2>
          Hi there, {this.props.currentUser.name}
        </h2>

        <p>
          I know, I know, <strong>{this.props.currentUser.name}</strong> isn't your name, but keeping with the theme it's your alias in the chat window. Click on a button to get this party started. If you only see the 'I will guess' button that means someone is already drawing in this room.
        </p>

        { !this.props.drawer_id && <button className='button, smaller' onClick={ event => this.props.handleDrawClick({type: 'drawer'}) }>I will draw</button> }

        <button className='button, smaller' onClick={ event => this.props.handleGuessClick({type: 'guesser'}) }>I will guess</button>

      </div>
    )
  }

}

export default PrePlay
