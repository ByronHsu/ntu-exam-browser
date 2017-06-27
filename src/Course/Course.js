import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

class Course extends Component{
    render(){
        return(
            <div className="container">
                <div className="list-group">
                    <Link to = {`/exampage/1`}>  <a className="list-group-item list-group-item-action">100-1</a> </Link>
                    <Link to = {`/exampage/2`}>  <a className="list-group-item list-group-item-action">100-2</a> </Link>
                    <Link to = {`/exampage/3`}>  <a className="list-group-item list-group-item-action">101-1</a> </Link>
                    <Link to = {`/exampage/4`}>  <a className="list-group-item list-group-item-action">101-2</a> </Link>
                </div>
            </div>
        )
    }
}
export default Course;