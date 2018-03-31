import React, { Component } from 'react';
import './App.css';
import './common.css';
import Header from './components/Header.js';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Music_list from './config/music-list.js';
import MusicList from './components/MusicList.js';
import Player from './components/Player.js';
import CommentBox from './components/Comment.js'
import PubSub from 'pubsub-js';
import $ from "jquery";
import 'jplayer';
//总控制
class App extends Component{
    constructor(){
    super();
    this.state={
      currentMusicItem:[],
      music_List:Music_list,
                show:false,
            display:false,
            isPlay:true
            
                 }
    this.listHideContrl=this.listHideContrl.bind(this)
          this.listShowContrl=this.listShowContrl.bind(this)
  }
    listHideContrl(){
          var that=this;
          that.setState({show:!that.state.show})
          setTimeout(function(){

            that.setState({display:!that.state.display})
          },360)
        }
      listShowContrl(){
          var that=this;
           that.setState({display:true})
            setTimeout(function(){

            that.setState({show:!that.state.show})
          },100)

      }
      playMusic(item){
        $('#player').jPlayer(
            'setMedia',
                {
                    mp3:item['file']
                }
            ).jPlayer('play');
        this.setState({currentMusicItem:item})
        }
      
       playNext(type= 'next'){
           let index=this.getIndex(this.state.currentMusicItem),
               len=this.state.music_List.length,
               newIndex=null;
           if(this.state.music_List.length===0){
               return
            }
           if(type ==='next'){
               newIndex=(index+1)%len;
           }else{
               newIndex=(index-1+len)%len
           }
           this.playMusic(this.state.music_List[newIndex])
           this.setState({isPlay:true})
       }
       getIndex(musicItem){
          return this.state.music_List.indexOf(musicItem)
       }
      componentDidMount(){
          $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
          });
           $('#player').bind($.jPlayer.event.ended,(e)=>{
               this.playNext()
           })
         this.playMusic(Music_list[0]);
         //删除歌单列表其中一项
        PubSub.subscribe('MUSIC_DELETE',(msg,Id)=>{

            this.setState({music_List:this.state.music_List.filter(item=>{
                 return item.id!==Id;
            })})
            if(this.state.music_List.length===0){
               this.playMusic(Music_list[Id-1])
            }else if(this.state.currentMusicItem.id ===Id){this.playNext()}
        
         });
         //切歌
         PubSub.subscribe('MUSIC_PLAY',(msg,Id)=>{
           this.playMusic(Music_list[Id-1])
           this.setState({isPlay:true})
         })
         //是否正在播放
         PubSub.subscribe('MUSIC_ISPLAY',(msg,isplay)=>{
          this.setState({isPlay:isplay})
         })
         //下一首
         PubSub.subscribe('MUSIC_PLAYNEXT',(msg)=>{
               this.playNext()
         })
         //上一首
         PubSub.subscribe('MUSIC_PLAYPREV',(msg)=>{
               this.playNext('prev')
         })
         //播放顺序
         PubSub.subscribe('MUSIC_PLAYWAY',(msg,playway)=>{
               $('#player').unbind($.jPlayer.event.ended)
               if(playway==='circle'){
                 $('#player').bind($.jPlayer.event.ended,(e)=>{
                     this.playMusic(this.state.currentMusicItem)
                  })
               }else if(playway==='random'){
                 $('#player').bind($.jPlayer.event.ended,(e)=>{
                    let list=this.state.music_List
                   this.playMusic(list[Math.floor(Math.random()*list.length)])
                  })

               }else{
                  $('#player').bind($.jPlayer.event.ended,(e)=>{
                      this.playNext()
                  })
               }
         })
      }
      componentWillUnMount(){
        PubSub.subscribe('MUSIC_ISPLAY')
        PubSub.subscribe('MUSIC_DELETE')
        PubSub.subscribe('MUSIC_PLAY')
        PubSub.subscribe('MUSIC_PLAYPREV')
        PubSub.subscribe('MUSIC_PLAYNEXT')
         $('#player').unbind($.jPlayer.event.ended);
      }
    render(){
        return (
             <Router>
                <section>)
        PubSub.subscribe('MUSIC_ISPLAY')
                 <Header/>
                  <div id='player'></div>
                  <MusicList listContrl={this.listHideContrl} show={this.state.show} display={this.state.display} currentMusicItem={this.state.currentMusicItem} musicList={this.state.music_List}/>                   
                   
                    <Switch>
                       
                       <Route path="musicplayer/:id" component={CommentBox}/>

                       <Route path="/" render={()=><Player isPlay={this.state.isPlay} listContrl={this.listShowContrl} currentMusicItem={this.state.currentMusicItem}/>} /> 
                    </Switch>     
                    </section>                  
             </Router>
             
        );
    }
}


export default App;

