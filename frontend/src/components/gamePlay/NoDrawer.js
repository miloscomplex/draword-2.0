import React from 'react'

class NoDrawer extends React.Component {

  render() {
    const { handleDrawClick } = this.props

    return (
      <div className='wrapper'>
        <h2>There's not an active drawer yet</h2>
        { !this.props.drawer_id && <button className='button, smaller' onClick={ event => handleDrawClick({type: 'drawer'}) }>I will draw</button> }
      </div>
    )
  }

}

export default NoDrawer
