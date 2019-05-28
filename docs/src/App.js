import React from 'react';
import './App.css';

export default class App extends React.Component {

  handleClick = (e, path) => {

  }

  render(){
    return(
      <div className="App">
        <header className="App-header">
          <a onClick={e => this.handleClick(e, "/")}>Home</a>
          <a onClick={e => this.handleClick(e, "/items")}>Items</a>
          <a onClick={e => this.handleClick(e, "/about")}>About</a>
        </header>
      </div>
    )
  }
}
