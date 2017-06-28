import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import './SinglePage.css';
class SinglePage extends Component{
    constructor() {
        super();
        this.state = {
            data: {imgUrl:' ',content:' '},
        }
    }
    componentWillMount() {
        fetch(`/api/get-data/singlepage?pageNumber=${this.props.pageNumber}&examId=${this.props.examId}`)
                .then(response => response.json())
                .then((page) => {
                    this.setState({ data: page[0] });
                })
                .catch((error) => {
                    console.log(error);
                });
    }
    componentWillReceiveProps(nextProps) {
        fetch(`/api/get-data/singlepage?pageNumber=${nextProps.pageNumber}&examId=${nextProps.examId}`)
                .then(response => response.json())
                .then((page) => {
                    this.setState({ data: page[0] });
                })
                .catch((error) => {
                    console.log(error);
                });
    }
    render(){ 
        //console.log(this.state.data);
        return(
            <div className="container fluid">
                <div className="row">
                    <div className="imgDiv col-12"><img src={this.state.data.imgUrl} className="pageImg img-fluid" alt="Responsive image"/></div>
                    {ReactHtmlParser(this.state.data.content.replace(/\r?\n/g, '<br />'))}
                </div> 
            </div>
        )
    }
}
export default SinglePage;