import React, { Component } from 'react';

import './App.css';
import Comanda from './components/Comanda'

class App extends Component {
  render() {
    return (
      <div id ="root">
        <div className="container">
        <h1 className="title"> Comandas Common Sense</h1>
        <div>
        <Comanda/>
        </div>


        </div>
         
      </div>
     
    );
  }
}

export default App;
