import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Department from '../Department/Department';
import DepartmentLink from '../DepartmentLink/DepartmentLink';

class Category extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <DepartmentLink path='EE'/>
                    <DepartmentLink path='EE'/>
                    <DepartmentLink path='EE'/>
                    <DepartmentLink path='EE'/>
                    <DepartmentLink path='EE'/>
                    <DepartmentLink path='EE'/>
                </div>
            </div>
        )
    }
}



export default Category;
 