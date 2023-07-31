import React from 'react'

class FourOFour extends React.Component {

  render() {
    return (
      <div>
        <h2>Hmm... Something isn't right</h2>
        <p>Whoops! something went wrong maybe <strong><code>{this.props.match.url}</code></strong> isn't a valid URL</p>
      </div>
    )
  }

}

export default FourOFour
