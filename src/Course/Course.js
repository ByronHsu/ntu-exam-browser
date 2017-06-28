import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

class Course extends Component{
    constructor() {
        super();
        this.state = {
            data: [],
        };
    }
    componentWillMount() {
        //console.log(this.props.match.params.id); 
        fetch(`/api/get-data/course/${this.props.match.params.id}`)
            .then(response => response.json())
            .then((exampages) => {
                this.setState({ data: exampages });
            })
            .catch((error) => {
            console.log(error);
            });     
    }
    render(){
        return(
            <div className="container">
                <div className="list-group">
                {
                    this.state.data.map(exampage => (
                        <Link to = {`/exampage/${exampage._id}`}> <a className="list-group-item list-group-item-action">{exampage.name}</a> </Link>
                    ))
                }
                </div>
            </div>
        )
    }
}
export default Course;