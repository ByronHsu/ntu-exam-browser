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
    constructor() {
        super();
        this.state = {
            data: [],
        };
    }
    componentWillMount() {
        fetch(`/api/get-data/department/${this.props.match.params}`)
            .then(response => response.json())
            .then((courses) => {
                this.setState({ data: courses });
            })
            .catch((error) => {
            console.log(error);
            });
    }
    render(){
        return(
            <div className="container">
                <div className="list-group">
                    this.state.data.map(course => (
                        <Link to = {`/course/${course._id}`}> <a className="list-group-item list-group-item-action">{`${course.name}`}</a> </Link>
                    ))
                </div>
            </div>
        )
    }
}

export default Department;