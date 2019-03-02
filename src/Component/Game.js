import React, { Component } from 'react';
import "../App.css";

class Game extends Component{
    render(){
        const pacmanStates = this.props.pacmanState;
        var content = ""
        if (pacmanStates.length>=1){
           
            for(var n = 0;n<pacmanStates.length;n++){

                if (content===""){
                    content = pacmanStates[n].x+", "+pacmanStates[n].y+", "+pacmanStates[n].f;
                    
                }else{
                    const previousContent = content
                    content = previousContent+"\n"+pacmanStates[n].x+", "+pacmanStates[n].y+", "+pacmanStates[n].f;
                }
            }
        }
        
        return(
            <div className='Game'>
                <div className='title'>Report:</div>
                <div id = 'resultBoard' className='resultBoard'>{content.split("\n").map(i => {
                                                return <div>{i}</div>;
                                                })}</div>
            </div>
        )
    }
}

export default Game;