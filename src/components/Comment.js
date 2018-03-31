import React, { Component } from 'react';
import CommentList from './CommentList.js'
import CommentInput from './CommentInput.js'
import {Link} from 'react-router-dom';
import './Comment.css';
import Music_list from '../config/music-list.js';

class CommentBox extends Component{
    constructor(){
    	super()
    	this.state={
            musicList:Music_list,
            user:{id:14,author:'myself',profilePphoto:'http://img4.imgtn.bdimg.com/it/u=1373411777,3992091759&fm=27&gp=0.jpg'}
    	}
    }
    commentAdd(text){
        let newS=this.state.musicList
           newS[this.props.match.params.id-1].comment.push(text)
         this.setState({musicList:newS})
      }

	render(){
		var data=this.state.musicList[this.props.match.params.id-1];
    console.log(this.props)
		return(
			<div className='commentBox row'>
			<div  className='cover'>
			<Link to='/'>
              <div className='song-f clearfix'>
                 <div className='songInfo-img'><img src={this.state.musicList[this.props.match.params.id-1]['cover']} alt='a'/></div>
                 <div className='songInfo'>
                   <p>{this.state.musicList[this.props.match.params.id-1]['title']}</p>
                   <span>{this.state.musicList[this.props.match.params.id-1]['artist']}</span>
                 </div>
                 <i className='back'></i>
              </div>
              </Link>
             </div>
			 <CommentList data={data['comment']}/>
			 <CommentInput commentAdd={this.commentAdd.bind(this)} user={this.state.user}/>
			</div>
		)
	}
}
export default CommentBox;