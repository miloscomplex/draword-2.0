import React from 'react'

class PhraseList extends React.Component {

  phraseList = (phrases) => {
    return phrases.map( phraseObj => {
      return (
        <li key={phraseObj.id} onClick={ event => this.props.handleClick(phraseObj.id)} > {phraseObj.phrase} </li>
      )
    })
  }

  render() {

    return (
      <div>
        <ul className='phrases' >
          { this.phraseList(this.props.phrases) }
        </ul>
      </div>
    )
  }

}

export default PhraseList
