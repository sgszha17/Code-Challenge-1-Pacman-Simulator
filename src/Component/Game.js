import React, { Component } from 'react';
import "../App.css";

class Game extends Component{
    // state = {
    //     reportContent:""
    // }
    render(){
        const pacmanStates = this.props.pacmanState;
        var content = ""
        if (pacmanStates.length>=1){
           
            for(var n = 0;n<pacmanStates.length;n++){
                const previousContent = content
                content = previousContent+"\n"+pacmanStates[n].x+", "+pacmanStates[n].y+", "+pacmanStates[n].f;
            }
        }
        
        return(
            <div className='Game'>
                <div className='title'>Report:</div>
                <div className='resultBoard'>{content}</div>
            </div>
        )
    }
}

export default Game;