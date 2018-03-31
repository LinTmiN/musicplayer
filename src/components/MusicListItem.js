import React, { Component } from 'react';
import './MusicListItem.css';
import PubSub from 'pubsub-js';
class MusicListItem extends Component{
	musicPlay(Id,e){
		e.preventDefault()
		e.stopPropagation()
		PubSub.publish('MUSIC_PLAY',Id)
	}
	musicDelete(Id,e){
		e.preventDefault()
		e.stopPropagation()
		PubSub.publish('MUSIC_DELETE',Id)
	}
	render(){
		let musicItem=this.props.musicItem,
		    Id=musicItem.id

		return (
			<li onClick={this.musicPlay.bind(this,Id)} className={`Components-musiclistitem row${this.props.focus?' focus':''}`}>
			   <span className='focusIcon'></span><p>{musicItem.title} -<span>{musicItem.artist}</span></p>
			   <p onClick={this.musicDelete.bind(this,Id)} className='-col-auto delete'></p>
			</li>	
		)
	}
}
export default MusicListItem;