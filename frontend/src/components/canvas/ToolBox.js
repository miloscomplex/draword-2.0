import React from 'react'

class ToolBox extends React.Component {

  isActive = color => {
    if (this.props.color === color) {
      return 'hi-light'
    }
  }

  renderButtons = colors => {
    return colors.map( (color, index) => {
      return ( <li key={index}
        className={ 'color-selector ' + color + ' ' + this.isActive(color) }
        onClick={event => this.props.handleColorChange(color)}>
      </li> )
    })
  }

  render() {
    const colors = ['white', 'yellow', 'red', 'blue', 'green']

    return (
      <div id='toolbox'>
        <li
          onClick={event => this.props.handleClearClick(event)}>
          clear
        </li>
        { this.renderButtons(colors) }
      </div>
    )
  }
}

export default ToolBox
