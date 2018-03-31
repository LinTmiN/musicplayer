import React,{Component} from "react";
import './Header.css'
import list from '../images/icons-music-logo.svg'
class Header extends Component{
   render(){
       return (
            <div className="components-header">
                <img  alt='icons-list' src={list} className='icons-list'/>
                
                <h1 className='caption'>React Music Player</h1>
                
            </div>
        )      
   }
}
export default Header