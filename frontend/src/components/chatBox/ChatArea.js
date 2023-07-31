import React from 'react';
import ChatBoxInput from '../chatBox/ChatBoxInput';
import ChatMessage from './ChatMessage';
import cable from '../../services/Cable'
import { connect } from 'react-redux'
import { loadChats, addChat, editSelectedRoom } from '../../redux/actions'
import ChatBoxBot from './ChatBoxBot'

class ChatsArea extends React.Component {

  chatsChannelRef = null
  roomURL = this.props.match.params.id

  componentDidMount = () => {
    console.log('chatArea mounted!');
    this.scrollToBottom()
    this.props.loadChats(this.roomURL)
    this.chatsChannel()
  }

  componentDidUpdate = () => {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  chatsChannel = () => {
    this.chatsChannelRef = cable.subscriptions.create({
    channel: `ChatsChannel`,
    id: this.props.selectedRoom.id,
    },
      {connected: () => {
        console.log('ChatsChannel connected!')
      },
        disconnected: () => {
          console.log('ChatsChannel disconnected!')
        },
        received: data => {
          this.handleReceivedChat(data)
          console.log('ChatsChannel data received')
        },
    })
  }

  componentWillUnmount = () => {
    this.chatsChannelRef.unsubscribe()
    //cable.subscriptions.remove(this.subscriptionRef)
    console.log('subscriptionRef', this.chatsChannelRef)
    //this.subscriptionRef.unsubscribe()
    console.log('subscriptionRef2', this.chatsChannelRef)
    // cable.subscriptions.subscriptions.forEach( subscription => {
    //   subscription.unsubscribe()
    // })
    //cable.disconnect()
  }

  handleReceivedChat = response => {
    const { chat } = response
    this.checkForPhrase( chat, this.props.selectedRoom.phrase )
    this.props.addChat(chat)
  }

  handleWin = (phraseObj, end) => {
    this.props.editSelectedRoom({ room_id:  this.props.selectedRoom.id, status: end })
    // alert(`Hot Dang you got it: ${phraseObj.phrase}`)
  }

  checkForPhrase = (chatObj, phraseObj) => {
    console.log('checkForPhrase= ', phraseObj)
    const end = 'end'
    phraseObj && chatObj.text.toLowerCase().includes(phraseObj.phrase.toLowerCase()) && this.handleWin(phraseObj, end)
  }

  render = () => {
    //console.log('orderedChats= ', orderedChats(this.props.chats));
    //console.log(cable);
    const { chats } = this.props.selectedRoom
    const { currentUser, selectedRoom } = this.props
    //console.log('chats= ', chats);

    return (
      <div id='chatWindow'>
        <h2>Chat Window</h2>
        { /* you can't pass down objects via props */ }
        <div ref={this.chatContainer} className='chat-messages'>
          { orderedChats(chats) ? orderedChats(chats) : suchEmpty }
          <div className='scroll-fix'
            ref={(el) => { this.messagesEnd = el }}>
          </div>
        </div>

        <ChatBoxInput roomId={this.roomURL} currentUser={currentUser} selectedRoom={selectedRoom} />

        <ChatBoxBot roomId={this.roomURL} currentUser={currentUser} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    busySignal: state.busySignal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadChats: roomId => { dispatch(loadChats(roomId)) },
    addChat: chatObj => { dispatch(addChat(chatObj)) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsArea)

// helpers

const orderedChats = chats => {
  const sortedChats = chats.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  return sortedChats.map(chat => {
    return <ChatMessage key={chat.id} text={chat.text} role={chat.role} name={chat.name} />
  })
}

const suchEmpty = 'Wow Such Empty'
