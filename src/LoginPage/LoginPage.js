import React, { Component } from 'react';
import './LoginPage.css'
const LoginPage = () => {
  return (
    <div className="LoginPage container">
      <div className="loginRow row">
        <div className="col-lg-3 col-md-4 col-sm-8">
          <a href="/login/facebook">
            <img className="img-fluid"src="https://www.yesmaster.com.hk/web/img/icon_login_fb.png"></img>
          </a>
        </div>
      </div>
    </div> 
  );
}

export default LoginPage;
