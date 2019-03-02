import React, { Component } from 'react';
import '../App.css';
import Command from './Command';
import Game from './Game';

class App extends Component {
  state = {
    pacmanState:[]
    
  }
  addState= (pacman) =>{
    const pacmanState=this.state.pacmanState;
    pacmanState.push(pacman)
    this.setState(pacmanState)
    console.log(this.state.pacmanState)
  }
  render() {
    return (
      <div className="App">
      <h1>Pacman Simulator</h1>
      <div className = "gameSpace">
        <Command 
          addPacmanState = {this.addState}
        />
        <Game
          pacmanState = {this.state.pacmanState}
         />
      </div>
        
      </div>
    );
  }
}

export default App;
