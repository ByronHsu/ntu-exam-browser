import React, { Component } from 'react';
import Ceiba from 'ceiba-sdk';

class LoginPage extends Component {
  handleLogin = () => {
    
  }
  render() {
    return (
      <div className="LoginPage">
        {this.handleLogin()}
        <iframe src="https://mail.ntu.edu.tw/owa/auth/logon.aspx?url=https://mail.ntu.edu.tw/owa/&reason=3" scrolling="no" />
      </div>
    );
  }
}

export default LoginPage;
