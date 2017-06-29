import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import './PostPage.css';

class PostPage extends Component{
    constructor() {
        super();
        this.state = {
            department:' ',
            departmentOptions:[],
            courseOptions:[],
            text:['',],
            imgUrl:['',],
        }; 
    } 
    componentWillMount() {
        fetch('/api/get-data/category')
            .then(response => response.json())
            .then((departments) => {
                this.setState({ departmentOptions: departments });
                this.setState({ department:departments[0].name });
                return departments[0].name;
            })
            .catch((error) => {
                console.log(error);
            })
            .then((res)=>{
                fetch(`/api/get-data/department/name/${res}`)
                    .then(response => response.json())
                    .then((courses) => {
                        this.setState({ courseOptions: courses });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
    }
    selectOnChange = (e) => {
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
    nextPageOnClick = () =>{
        let text=this.state.text;
        let imgUrl=this.state.imgUrl;
        text.push('');
        imgUrl.push('');
        this.setState({text:text,imgUrl:imgUrl});
    }
    submitOnClick = () => {
        let text=[],imgUrl=[];
        this.state.text.forEach((entry)=>{text.push(entry.value)});
        this.state.imgUrl.forEach((entry)=>{imgUrl.push(entry.value)});
        const exam = { 
            examName:this.refs.examName.value,
            text: text,
            imgUrl: imgUrl,
        }; 

        //console.log(exam);
        
        fetch(`/api/insert/exam/${this.refs.course.value}`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exam),
        });
    }
    render(){
        return(
            <form onSubmit={(e)=>{e.preventDefault()}}>
            <div className="form-group">  
                <label >Department</label>
                <select className="form-control" onChange={this.selectOnChange}  >
                    { 
                        this.state.departmentOptions.map(department => (
                            <option>{department.name}</option>
                        ))
                    }
                </select> 
            </div>
            <div className="form-group">
                <label >Course</label>
                <select className="form-control" ref='course'>
                { 
                    this.state.courseOptions.map(course => (
                        <option>{course.name}</option>
                    )) 
                }
                </select>
            </div>
            <div className="form-group">
                <label>Exam Name</label>
                <input ref='examName' className="form-control" type="text" id="example-text-input"/>
            </div>
            {
                this.state.text.map((text,index) =>   
                (
                    <div className="container-fluid">
                        <div className="form-group">
                            <label>Textarea</label>
                            <textarea ref={(node)=>{this.state.text[index]=node}} className="newPage form-control" rows="10" ></textarea>
                        </div>
                        <div className="form-group">
                            <label>URL</label>
                            <input ref={(node)=>{this.state.imgUrl[index]=node}} className="form-control" type="url" />
                        </div>
                    </div>
                ))
                
            }
            <Link to= "/"><button type="submit" className="btn btn-primary" onClick={this.submitOnClick}>Submit</button></Link>
            <button type="button" className="btn btn-secondary" onClick={this.nextPageOnClick}>Next Page</button>
            </form>
        )
    }
}

export default PostPage;