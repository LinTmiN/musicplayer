import React, { Component } from 'react';
import point from '../images/icons-point.svg'
class Progress extends Component{
    static get defaultProps(){
        return {
            barColor:"#FC8080"
        }
    }
    constructor(){
        super()
        this.changeProgress=this.changeProgress.bind(this)
    }
    changeProgress(e){
        let progressBar=this.refs.progressBar;
        let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        console.log(progress)
        this.props.onProgressChange&&this.props.onProgressChange(progress)
    }
    render(){
        return (
            <div className='components-progress' onClick={this.changeProgress} ref='progressBar'>
                <div className='progress' style={{width:`${this.props.progress}%`,background:this.props.barColor}}>
                    <img width='9px' src={point} alt='point' className='progress-point'/>
                </div>
            </div>
        )
    }
}
export default Progress