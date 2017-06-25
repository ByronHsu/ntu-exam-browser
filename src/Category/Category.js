import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Department from '../Department/Department';
import DepartmentLink from '../DepartmentLink/DepartmentLink'

class CategoryHome extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <DepartmentLink path='1'/>
                    <DepartmentLink path='2'/>
                    <DepartmentLink path='3'/>
                    <DepartmentLink path='4'/>
                    <DepartmentLink path='5'/>
                    <DepartmentLink path='6'/>
                </div>
            </div>
        )
    }
}

const Category = () => (
  <Switch>
      <Route exact path="/category" component={()=>(<CategoryHome/>)} />
      <Route path="/category/:id" component={()=>(<Department/>)} />
  </Switch>
);

export default Category;
