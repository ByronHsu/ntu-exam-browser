import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Category from '../Category/Category';
import Department from '../Department/Department';
import Course from '../Course/Course';
import Home from '../Home/Home';
import PostPage from '../PostPage/PostPage';
import ExamPage from '../ExamPage/ExamPage';
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
        </nav>
      </div>

      <Switch>
        <Route exact path="/" component={()=>(<Home/>)} />
        <Route exact path="/category" component={()=>(<Category/>)} />
        <Route exact path="/category/:id" component={(props)=>(<Department {...props}/>)} />
        <Route exact path="/course/:id" component={(props)=>(<Course {...props}/>)} />
        <Route exact path="/exampage/:id" component={(props)=>(<ExamPage {...props}/>)} />
        <Route path="/postpage" component={()=>(<PostPage/>)} /> 
      </Switch>
    </div>

  </Router>
);
export default Controller;
