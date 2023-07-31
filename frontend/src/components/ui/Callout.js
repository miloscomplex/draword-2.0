import React from 'react'

class Callout extends React.Component {

  render() {
    const { currentUser, selectedRoom } = this.props
    return (
      currentUser.id === selectedRoom.drawer_id
        ?
      (<div className='phraseReminder'>
        Hey, <strong>{currentUser.name}</strong>! Your phrase/word is <strong>{ this.props.selectedRoom.phrase.phrase }</strong>
      </div>)
      :
      (<div className='phraseReminder'>
        Hey, <strong>{currentUser.name}</strong>! Remember to think of popular Karaoke songs
      </div>)
    )
  }
}

export default Callout
