import React, { Component } from 'react';
import './Department.css';
class Department extends Component{
    render(){
        return(
            <div className="container">
                <div className="list-group">
                    <a className="list-group-item list-group-item-action">電子學</a>
                    <a className="list-group-item list-group-item-action">電路學</a>
                    <a className="list-group-item list-group-item-action">微分方程</a>
                    <a className="list-group-item list-group-item-action">交換電路</a>
                </div>
            </div>
        )
    }
}
export default Department;