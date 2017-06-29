import React, { Component } from 'react';
import './DepartmentLink.css';
import {
  Link,
} from 'react-router-dom';
class DepartmentLink extends Component{
    render(){
        return(
            <div className="DepartmentLink col-lg-3 col-md-6 col-sm-12">
                <Link to ={`category/${this.props.path}`}>
                <img src={`${this.props.imgUrl}`} className="img-fluid" alt="Responsive image"/>
                </Link> 
            </div>
        )
    }
}
export default DepartmentLink;  