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
import Signup from '../LoginPage/Signup';
import Sent from '../LoginPage/Sent';
//import 'disable-react-devtools';
import $ from 'jquery'; 
  
$(document).ready(function(){
  $(".nav-item.nav-link").click(function() {
      $(".nav-item.nav-link").removeClass('active');
      $(this).addClass('active');
  });}
);
class Controller extends Component{
  constructor() {
    super();
    this.state = {
      user: null,
      signup: false
    };
  }
  componentWillMount = () => {
    fetch('/api/user', {credentials: "same-origin"} )
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        if(data === 'MAIL') {
          this.setState({signup: true});
        } else if(data !== 'NO') {
          this.setState({user: data});
        }
      });
  }
  render() {
    return (
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
              {this.state.user === null ? <Link to="/loginpage"><a className="btn btn-secondary" role="button">Login</a></Link> :
                                          <a className="btn btn-secondary" role="button">{this.state.user}</a> }
            </nav>
          </div>
          {this.state.signup === true ? <Redirect to="/signup" /> : null}
          <div>
            <Route exact path="/" component={()=><Home user={this.state.user}/>} />
            <Route exact path="/_=_" component={() => <Redirect to="/" />} />
            <Route exact path="/category" component={()=><Category/>} />
            <Route exact path="/category/:id" component={(props)=>(<Department {...props}/>)} />
            <Route exact path="/course/:id" component={(props)=>(<Course {...props}/>)} />
            <Route exact path="/exampage/:id" component={(props)=>(<ExamPage {...props} user={this.state.user}/>)} />
            {this.state.user === null? null :<Route path="/postpage" component={()=><PostPage user={this.state.user}/>} />}
            <Route path="/loginpage" component={LoginPage}/>
            <Route path="/signup" component={Signup} />
            <Route path="/authentication" component={Sent} />
          </div>
        </div>
      </Router>
    );
  }
}
export default Controller;
