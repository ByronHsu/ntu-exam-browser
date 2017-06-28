import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Category from '../Category/Category';
import Department from '../Department/Department';
import Course from '../Course/Course';
import Home from '../Home/Home';
import PostPage from '../PostPage/PostPage';
import ExamPage from '../ExamPage/ExamPage';
import LoginPage from '../LoginPage/LoginPage';
import $ from 'jquery'; 

$(document).ready(function(){
  $(".nav-item.nav-link").click(function() {
      $(".nav-item.nav-link").removeClass('active');
      $(this).addClass('active');
  });}
);
const Controller = () => (
  <Router>
    <div className="container-fluid">
      <div className="container-fluid">
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand">NTU-EXAM-Browser</a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/"><a className="nav-item nav-link">Home</a></Link>
              <Link to="/category"><a className="nav-item nav-link">Category</a></Link>
            </div>
          </div>
          <Link to="/loginpage"><a className="btn btn-secondary" href="#" role="button">Login</a></Link>
        </nav>
      </div>

      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/_=_" render={() => <Redirect to="/" />} />
        <Route exact path="/category" component={Category} />
        <Route exact path="/category/:id" component={(props)=>(<Department {...props}/>)} />
        <Route exact path="/course/:id" component={(props)=>(<Course {...props}/>)} />
        <Route exact path="/exampage/:id" component={ExamPage} />
        <Route path="/postpage" component={PostPage} />
        <Route path="/loginpage" component={LoginPage}/>
      </div>
    </div>

  </Router>
);
export default Controller;
