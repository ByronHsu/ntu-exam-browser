import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom';
import './LoginPage.css'
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
      <div className="Signup container">
        {this.state.sending === true ? <Redirect to="/authentication" /> : null}
        <div className="loginRow row">
          <div className="col-lg-3 col-md-4 col-sm-8">
              <input 
                type="text"
                value={this.state.studentId}
                onChange={this.handleInputChange}
                placeholder="Type Your NTUid"
                autoFocus
              />
              <button className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
      </div> 
    );
  }
}

export default Signup;
