import React, { Component } from 'react';
import './Controller.css'
import Progress from './Progress.js';
import PubSub from 'pubsub-js';
class Controller extends Component{ 
	constructor(){
		super()
		this.state={
			playway:'allcircle'
		}
	}
	playNext(){
       PubSub.publish('MUSIC_PLAYNEXT')
	}
	playPrev(){
       PubSub.publish('MUSIC_PLAYPREV')
	}
	playway(){
       let list=['allcircle','circle','random'],
           index=(list.indexOf(this.state.playway)+1)%list.length;
        this.setState({playway:list[index]})
        PubSub.publish('MUSIC_PLAYWAY',list[index])
	}
	render(){
		return (
		<div className='components-controller'>
		   <i onClick={this.props.listContrl} className='icons-list'></i>
		   <div className='contrl-button'>
		        <h3>{this.props.currentMusicItem['title']}</h3>
		        <span>{this.props.currentMusicItem['artist']}</span>
		        <div className='musicprogress'>

				    <Progress progress={this.props.progress} onProgressChange={this.props.ProgressChangeHandler}/>
			        <span className='musicTime'>{this.props.lefttime}</span>
		        </div>
		   	    <i onClick={this.playPrev} className='icons-prev'></i>
		   	    <i onClick={this.props.play} className={`icons-static ${this.props.isPlay?'pause':'play'}`}></i>
		   	    <i onClick={this.playNext} className='icons-next'></i>
		   </div>
		   <div className='ctlright'>
		   		<i onClick={this.playway.bind(this)} className={`icons-playway ${this.state.playway}`}></i>
		   	</div>
		</div>
		)

	}
}
export default Controller;