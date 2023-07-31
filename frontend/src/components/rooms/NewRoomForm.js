import React from 'react'
import { API_ROOT, HEADERS } from '../../constants';

class NewRoomForm extends React.Component {
  state = {
    title: '',
    status: 'preplay'
  }

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault()
    event.stopPropagation()
    fetch(`${API_ROOT}/rooms`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ title: '' })
  };

  render = () => {
    return (
      <div className="newRoomForm">
        <form name='newRoomForm' onSubmit={event => this.handleSubmit(event)}>
          <label>Create A New Room (3-15) characters-long:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <button value='submit'>submit</button>
        </form>
      </div>
    );
  };
}

export default NewRoomForm;
