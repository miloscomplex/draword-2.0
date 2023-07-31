import React from 'react'
import PhraseContainer from '../phraseSelector/PhraseContainer'
import GuesserWaitingRoom from '../ui/GuesserWaitingRoom'
import NoDrawer from './NoDrawer.js'

class PhraseSelection extends React.Component {

  renderContent = () => {
    const { selectedRoom, currentUser } = this.props

    switch (selectedRoom.drawer_id) {
      case currentUser.id:
        return <PhraseContainer match={this.props.match} />
      case null:
        return <NoDrawer match={this.props.match} handleDrawClick={this.props.handleDrawClick}/>
      default:
        return <GuesserWaitingRoom match={this.props.match} />
      // default same as !currentUser.id
    }
  }

  render() {

    return (
      <div className='wrapper'>
        { this.renderContent() }
      </div>
    )
  }

}

export default PhraseSelection
