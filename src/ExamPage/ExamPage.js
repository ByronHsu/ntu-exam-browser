import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import SinglePage from '../SinglePage/SinglePage';
import './ExamPage.css';
class ExamPage extends Component{
    constructor() {
        super();
        this.state = {
            pageNumber:1,
            numOfPages:0,
        };
    }
    componentWillMount() {
        fetch(`/api/get-data/exam/${this.props.match.params.id}`)
                .then(response => response.json())
                .then((exam) => {
                    this.setState({ numOfPages: exam[0].numOfPages });
                })
                .catch((error) => {
                    console.log(error);
                });
    }
    pageOnClick = (e) =>{
        console.log(e.target.id);
        this.setState({pageNumber:e.target.id});
    }
    render(){
        let array=[];
        for(let i=0;i<this.state.numOfPages;i++)
            array.push(i);
        return(
            <div className="container-fluid">
                <div className="container">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                        {
                            array.map((entry,index) => (
                                <li className="page-item"><a className="page-link" id={index+1} onClick={this.pageOnClick} >{index+1}</a></li>
                            )) 
                            //<li className="page-item"><a className="page-link" >i+1</a></li>
                        }
                        </ul>
                    </nav>
                </div>
                <SinglePage examId={this.props.match.params.id} pageNumber={this.state.pageNumber} user={this.props.user}/>
            </div>
        ) 
    }
}


export default ExamPage;

