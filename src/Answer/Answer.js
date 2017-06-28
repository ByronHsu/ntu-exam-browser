import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import './Answer.css';
import ReactHtmlParser from 'react-html-parser';
class Answer extends Component{
    constructor() {
        super(); 
        this.state = {
            commentData:[]
        };
    }
    componentWillMount() {
        fetch(`/api/get-data/answer/${this.props.id}`)
                .then(response => response.json())
                .then((comments) => {
                    this.setState({ commentData: comments });
                })
                .catch((error) => {
                    console.log(error);
                })
    }
    componentWillReceiveProps(nextProps){
        fetch(`/api/get-data/answer/${nextProps.id}`)
                .then(response => response.json())
                .then((comments) => {
                    this.setState({ commentData: comments });
                })
                .catch((error) => {
                    console.log(error);
                })
    }
    CommentOnClick = () => {

        let comment = {
            answerId:this.props.id,
            content:this.refs.text.value,
        }
        //console.log(comment);
        fetch(`/api/insert/comment`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        })
        .then(res => res.json())
        .then((res)=>{
            let commentData=this.state.commentData;
            const commentToPush={
                answerId:this.props.id,
                _id:res,
                content:this.refs.text.value,
            }
            commentData.push(commentToPush);
            this.setState({commentData});
            this.refs.text.value="";
        })
    }
    render(){
        return(
            <li className="comment">
                <a className="pull-left" href="#">
                    <img className="avatar" src="http://bootdey.com/img/Content/user_1.jpg" alt="avatar"/>
                </a>
                <div className="comment-body">
                    <div className="comment-heading">
                        <h4 className="user">Gavino Free</h4>
                        <h5 className="time">5 minutes ago</h5>
                    </div>
                    <p>{ReactHtmlParser(this.props.content.replace(/\r?\n/g, '<br />'))}</p>
                    <ul className="comments-list">
                    {
                        this.state.commentData.map((entry)=>(
                            <li className="comment">
                                <a className="pull-left" href="#">
                                    <img className="avatar" src="http://bootdey.com/img/Content/user_3.jpg" alt="avatar"/>
                                </a>
                                <div className="comment-body">
                                    <div className="comment-heading">
                                        <h4 className="user">Ryan Haywood</h4>
                                        <h5 className="time">3 minutes ago</h5>
                                    </div>
                                    <p>{entry.content}</p>
                                </div>
                            </li> 
                        ))
                    }
                    </ul>
                    <textarea ref='text' className="form-control" rows="3"></textarea>
                    <button type="submit" className="btn btn-secondary" onClick={this.CommentOnClick}>Comment!</button>
                </div>
            </li>
        )
    }  
}

export default Answer;
