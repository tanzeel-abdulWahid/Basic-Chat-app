import React, { Component } from 'react';
import AppRouter from './config/router'
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div>
        <AppRouter />
      </div>
    )
  }
}

export default App
