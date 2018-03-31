import React, { Component } from 'react';
import $ from "jquery";
import 'jplayer';
import Controller from './Controller.js';
import Page from './Page.js'
import PubSub from 'pubsub-js';
class Player extends Component{
	 constructor(props){
        super(props)
        this.state={
            progress:"-",
            volume:0,
            duration:null,
            lefttime:''
        }

    }
    componentDidMount(){
 
    	 $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            this.setState({
                progress:e.jPlayer.status.currentPercentAbsolute,
                duration:e.jPlayer.status.duration,
                volume:e.jPlayer.options.volume*100,
                lefttime:this.formatLeftTime((1-this.state.progress/100)*this.state.duration)
            });
        })
    }
    formatLeftTime(time){
      let min=Math.floor(time/60),
          sec=Math.floor(time%60);
      sec=sec<10?'0'+sec:sec;
      return `${min}:${sec}`
    }
    componentWillUnMount(){
        $('#player').unbind($.jPlayer.event.timeupdate)
    }
    ProgressChangeHandler(progress){
       $('#player').jPlayer('play',this.state.duration*progress)
    }   
    changeVolumeHandler(progress){
    	 $('#player').jPlayer('volume',progress)
    	 this.setState({

				volume: progress * 100,

			});
    }
    play(){
    	if(this.props.isPlay){
    		$('#player').jPlayer('pause')
    	}else{
    		$('#player').jPlayer('play')
    	}
    	PubSub.publish('MUSIC_ISPLAY',!this.props.isPlay)
    }
    render() {
        return (
        	     <div>
				
				<Page currentMusicItem={this.props.currentMusicItem} onvolumechange={this.changeVolumeHandler.bind(this)} progress={this.state.volume} Cover={this.props.currentMusicItem['cover']} />
                <Controller lefttime={this.state.lefttime} listContrl={this.props.listContrl} isPlay={this.props.isPlay} play={()=>this.play()} currentMusicItem={this.props.currentMusicItem} progress={this.state.progress} 
                ProgressChangeHandler={(progress)=>this.ProgressChangeHandler(progress)}/>
                </div>
        );
    }
}
export default Player;