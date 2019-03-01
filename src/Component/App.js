import React, { Component } from 'react';
import '../App.css';
import Command from './Command';
import Game from './Game';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Pacman Simulator</h1>
      <div className = "gameSpace">
        <Command />
        <Game />
      </div>
        
      </div>
    );
  }
}

export default App;
