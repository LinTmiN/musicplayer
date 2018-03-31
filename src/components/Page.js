import React, { Component } from 'react';
import './Page.css';
import Progress from './Progress.js';
import {Link} from 'react-router-dom';
class Page extends Component{
   constructor(){
     super()
     this.state={greet:false}
   }
	render(){

		return (
            <div className='PageContain'>
            	<div className='musicCover'><div ><img src={this.props.Cover} alt='musicCover'/></div></div>
               <div className='volumeControl'><i className='icons-sound'></i><div className='musicvolume'><Progress progress={this.props.progress} onProgressChange={this.props.onvolumechange} barColor='#A29A9A' /></div></div> 
               <div className='icons-all'>
                <Link to={`/${this.props.currentMusicItem['id']}`}><i className='icons-comment'></i></Link>
		   	    <i onClick={()=>this.setState({greet:!this.state.greet})} className={`icons-static ${this.state.greet?'icons-greeted':'icons-greet'}`}></i>
		   	    <i className='icons-download'></i>
               </div>
            </div>

		)
	}
}
export default Page;
