import React, { Component } from 'react';
import Department from '../Department/Department'
class Category extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Department/>
                    <Department/>
                    <Department/>
                    <Department/>
                    <Department/>
                    <Department/>
                </div>
            </div>
        )
    }
}
export default Category;