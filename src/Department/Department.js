import React, { Component } from 'react';
import './Department.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Course from '../Course/Course'
class Department extends Component{
    render(){
        return(
            <div className="container">
                <div className="list-group">
                    <Link to = {`/course/1`}> <a className="list-group-item list-group-item-action">電子學</a> </Link>
                    <Link to = {`/course/2`}> <a className="list-group-item list-group-item-action">電路學</a> </Link>
                    <Link to = {`/course/3`}> <a className="list-group-item list-group-item-action">微分方程</a> </Link>
                    <Link to = {`/course/4`}> <a className="list-group-item list-group-item-action">交換電路</a> </Link>
                </div>
            </div>
        )
    }
}

export default Department;