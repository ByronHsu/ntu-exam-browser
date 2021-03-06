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
        console.log(this.props.user);
        return(
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">Share with others!</h1>
                    <p className="lead">Our website makes sharing of past exam papers quite easy</p>
                    <hr className="my-4"/>
                    {this.props.user === null ?
                            <div className="container">Login to post!</div>:
                            <div className="container">
                            <p>Try now and add a post!</p>
                            <p className="lead">
                                <Link to="/postpage"><a className="btn btn-secondary" href="#" role="button">Add a post!</a></Link>
                            </p>
                        </div>
                    }   
                </div>
            </div>
        )
    }
}

export default Home;