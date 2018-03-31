import React, { Component } from 'react';
import MusicListItem from './MusicListItem.js'
import './MusicListItem.css';

class MusicList extends Component{

      render(){
      	 let listEle=null;
      	 listEle=this.props.musicList.map((item)=>{
      	 	 return <MusicListItem focus={item===this.props.currentMusicItem} musicItem={item} key={item.id}>{item.title}</MusicListItem>
      	 })
        
      	return (
               <div>
               	{this.props.display?
               <div className={`wrap clearfix ${this.props.show?'wrapshow':'wraphide'}`}>
      		   <div  className={`animateUl ${this.props.show?'':'ulhide'}`}>
      		   <div className='musiclistInfo'><span onClick={this.props.listContrl}></span></div>
               <ul ref='ullist'>{listEle}</ul>
               </div>
               </div>:null}
               </div>
      		 )
      }
}
export default MusicList