import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom';

class Signup extends Component{
  constructor() {
    super();
    this.state = {
      studentId: '',
      sending: false
    };
  }
  handleInputChange = (e) => {
    this.setState({studentId: e.target.value});
  }
  handleSubmit = () => {
    if(this.state.studentId.trim().length === 9) {
      fetch('/mail/sendtoken', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: this.state.studentId.trim().toUpperCase()})
      });
      this.setState({sending: true});
    }
  }
  render() {
    return (
      <div className="Signup">
        {this.state.sending === true ? <Redirect to="/authentication" /> : null}
        <input 
          type="text"
          value={this.state.studentId}
          onChange={this.handleInputChange}
          autoFocus
        />
        <a className="btn btn-secondary" onClick={this.handleSubmit} role="button">Submit</a>
      </div>
    );
  }
}

export default Signup;
