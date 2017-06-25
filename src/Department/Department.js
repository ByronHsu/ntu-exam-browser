import React, { Component } from 'react';
import './Department.css';
class Department extends Component{
    render(){
        return(
            <div className="department col-lg-3 col-md-6 col-sm-12">
                <img src="./img/ee.jpg" className="img-fluid" alt="Responsive image"/>
            </div>
        )
    }
}
export default Department;