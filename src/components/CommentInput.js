import React, { Component } from 'react';
import './CommentInput.css'
class CommentInput extends Component{
	constructor(){
		super()
		this.state={
			fontlimit:'',
			value:''
		}

	}
	fontlimit(e){
		e.preventDefault()
		var value=e.target.value,
		    len=1;
        this.setState({value:'sfsf'})
		for(var i=0;i<value.length;i++){
			if(value.charCodeAt(i)>124){
                len ++
			}else{
				len +=0.5;
			}
		}
        this.setState({value:'safsafasg'})
		this.setState({fontlimit:Math.floor(len)+'/100',value:e.target.value})
		if(value.length===0){
			this.setState({fontlimit:''})
		}

	}
	submitComments(e){
       e.preventDefault()
       let user=this.props.user,
           date=new Date(),
           time=date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日',
       comment={id:user.id,author:user.author,profilePphoto:user.profilePphoto,comment:this.state.value,time:time};
       this.props.commentAdd(comment)
       this.setState({fontlimit:'',value:''})
       e.target.reset()
	}
	render(){
		return(
			<div className='CommentInput'>
			     <form className="commentForm" onSubmit={this.submitComments.bind(this)}> 
			     <input value={this.state.value}  autoFocus="autofocus" required="required" onChange={this.fontlimit.bind(this)} className='userInput' type="text" placeholder="Please enter your comment!"/>
			     <button className='btn-send' type="submit" ><span>{this.state.fontlimit}</span> 发送</button>
			     </form>
			</div>
		)
	}
}
export default CommentInput;