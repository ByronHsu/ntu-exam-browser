import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import './PostPage.css';
/*
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'ntu-exam-browswer', 
  api_key: '575565893452142', 
  api_secret: 'pl9MJ6fRRBsDEP99cHWWike8lOM'
})
cloudinary.uploader.upload("http://imgur.com/gallery/Os7JM", function(result) { 
  console.log(result) 
});*/
class PostPage extends Component{
    constructor() {
        super();
        this.state = {
            department:' ',
            course:' ',
            departmentOptions:[],
            courseOptions:[],
        }; 
    } 
    componentWillMount() {
        fetch('/api/get-data/category')
            .then(response => response.json())
            .then((departments) => {
                this.setState({ departmentOptions: departments });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleSelectChange = (e) => {
        this.setState({department:e.target.value});
        fetch(`/api/get-data/department/name/${e.target.value}`)
            .then(response => response.json())
            .then((courses) => {
                this.setState({ courseOptions: courses });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render(){
        return(
            <form>
            <div className="form-group">  
                <label for="exampleSelect1">Department</label>
                <select className="form-control" id="exampleSelect1" onChange={this.handleSelectChange}  >
                    { 
                        this.state.departmentOptions.map(department => (
                            <option>{department.name}</option>
                        ))
                    }
                </select> 
            </div>
            <div className="form-group">
                <label for="exampleSelect1">Course</label>
                <select className="form-control" id="exampleSelect1">
                { 
                    this.state.courseOptions.map(course => (
                        <option>{course.name}</option>
                    )) 
                }
                </select>
            </div>
            <div className="form-group">
                <label for="exampleTextarea">Textarea</label>
                <textarea className="newPage form-control" id="exampleTextarea" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default PostPage;