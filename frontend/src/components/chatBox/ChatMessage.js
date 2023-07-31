import React from 'react'

class ChatMessage extends React.Component {

  render() {
    return (
      <p className={this.props.role}>
        <span>{this.props.role}</span>
        <strong>{ this.props.name }:</strong> { this.props.text }
      </p>
    )
  }
}

export default ChatMessage
