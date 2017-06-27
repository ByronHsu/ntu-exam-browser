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
    render(){
        return(
            <form>
            <div className="form-group">
                <label for="exampleSelect1">Department</label>
                <select className="form-control" id="exampleSelect1">
                <option>EE</option>
                <option>MED</option>
                <option>CS</option>
                <option>HIS</option>
                <option>CHE</option>
                </select>
            </div>
            <div className="form-group">
                <label for="exampleSelect1">Course</label>
                <select className="form-control" id="exampleSelect1">
                <option>電子</option>
                <option>電路</option>
                <option>電磁</option>
                <option>交電</option>
                <option>微方</option>
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