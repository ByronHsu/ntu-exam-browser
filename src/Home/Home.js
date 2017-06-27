import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import PostPage from '../PostPage/PostPage';
import LoginPage from '../LoginPage/LoginPage';

class Home extends Component{
    render(){
        return(
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">Share with others!</h1>
                    <p className="lead">Our website makes sharing of past exam papers quite easy</p>
                    <hr className="my-4"/> 
                    <p>Try now and add a post!</p>
                    <p className="lead">
                        <Link to="/postpage"><a className="btn btn-secondary" href="#" role="button">Add a post!</a></Link>
                        <Link to="/loginpage"><a className="btn btn-secondary" href="#" role="button">Login</a></Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default Home;