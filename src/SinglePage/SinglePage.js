import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Answer from '../Answer/Answer';
import ReactHtmlParser from 'react-html-parser';
import './SinglePage.css';
 

class SinglePage extends Component{
    constructor() {
        super();
        this.state = {
            pageData: {imgUrl:' ',content:' '},
            answerData:[],
        }
    }
    componentWillMount() {
        fetch(`/api/get-data/singlepage?pageNumber=${this.props.pageNumber}&examId=${this.props.examId}`)
                .then(response => response.json())
                .then((page) => {
                    this.setState({ pageData: page[0] });
                    return page[0]._id;
                })
                .catch((error) => {
                    console.log(error);
                })
                .then((id)=>{
                        fetch(`/api/get-data/singlepageAnswers/${id}`)
                            .then(response => response.json())
                            .then((answers)=>{
                                this.setState({answerData:answers});
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                )
    }
    componentWillReceiveProps(nextProps) {
        fetch(`/api/get-data/singlepage?pageNumber=${nextProps.pageNumber}&examId=${nextProps.examId}`)
            .then(response => response.json())
            .then((page) => {
                this.setState({ pageData: page[0] });
                return page[0]._id;
            })
            .catch((error) => {
                console.log(error);
            })
            .then((id)=>{
                fetch(`/api/get-data/singlepageAnswers/${id}`)
                    .then(response => response.json())
                    .then((answers)=>{
                        this.setState({answerData:answers});
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            )
    }
    AnswerOnClick = () => {
        let Answer = {
            pageId:this.state.pageData._id,
            content:this.refs.text.value,
        }

        fetch(`/api/insert/Answer`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Answer),
        })
        .then(res => res.json())
        .then((res)=>{
            let answerData=this.state.answerData;
            const answerToPush={
                pageId:this.state.pageData._id,
                _id:res,
                content:this.refs.text.value,
            }
            console.log(answerToPush);
            answerData.push(answerToPush);
            this.setState({answerData});
            this.refs.text.value="";
        })
    }
    render(){ 
        //console.log(this.state.data);
        return(
            <div className="container">
                <div className="col-12">
                    <div className="panel panel-white post panel-shadow">
                        <div className="post-heading">
                            <div className="pull-left image">
                                <img src="http://bootdey.com/img/Content/user_1.jpg" className="img-circle avatar" alt="user profile image"/>
                            </div>
                            <div className="pull-left meta">
                                <div className="title h5">
                                    <a href="#"><b>Ryan Haywood </b></a>
                                    made a post.
                                </div>
                                <h6 className="text-muted time">1 minute ago</h6>
                            </div>
                        </div> 
                        <div className="post-description"> 
                            <div className="container-fluid">
                                <div className="imgDiv col-12"><img src={this.state.pageData.imgUrl} className="pageImg img-fluid" alt="Responsive image"/></div>
                                {ReactHtmlParser(this.state.pageData.content.replace(/\r?\n/g, '<br />'))}
                            </div>
                            <div className="stats">
                                <button href="#" type="button" className="btn btn-secondary">
                                    <i className="fa fa-thumbs-up icon"></i>2
                                </button>
                                <button href="#" type="button" className="btn btn-secondary">
                                    <i className="fa fa-share icon"></i>12
                                </button>
                            </div>
                        </div>
                        <ul className="comments-list">
                        {
                            this.state.answerData.map((entry)=>(
                                <Answer content={entry.content} id={entry._id}/>
                            ))
                        }
                        </ul>
                        <textarea ref='text' className="form-control" rows="3"></textarea>
                        <button type="submit" className="btn btn-secondary" onClick={this.AnswerOnClick}>Answer!</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default SinglePage;
