import React, { Component } from 'react';
import './CommentList.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class Comment extends Component{
	render(){
		return (
			<div className='author clearfix'>
				<div className='authorPhoto'><img src={this.props.photo} alt='a' /></div>
				<div className='authorComment'>
				  <span>{this.props.author}</span>
				  <span className='commenttime'>{this.props.time}</span>
				  
				</div>
				<i className='icons-like'></i>
			<div className='commenttext'>{this.props.text}</div>
			</div>
		)
	}
}
class CommentList extends Component{
	render(){
		var commentNodes=this.props.data.map((comment,index)=>{
			 return <Comment time={comment.time} photo={comment.profilePphoto} key={index} author={comment.author} text={comment.comment}/>
		})
		return(
			<div className='commentList'>
            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>{commentNodes}</ReactCSSTransitionGroup>
			
			</div>
		)
	}
}
export default CommentList;