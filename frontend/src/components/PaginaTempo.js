import React, { useState, useEffect } from 'react';
import './PaginaTempo.css';

class PaginaTempo extends React.Component {
  state = {
    currentTime: null,
    currentDate: null,
  }

  componentDidMount() { // ocorre
    console.log("Calling componentDidMount...");
      fetch('http://127.0.0.1:8000/').then(res => res.json()).then(data => {
        const newState = Object.assign({
          currentTime: data.time,
          currentDate: data.date
        });

        this.setState(newState);
      });
  }

  render(){
    console.log("Calling render...");
    return (
      <div className="PaginaTempo">
        <header className="PaginaTempo-header">
        <p>The date is {this.state.currentDate} and the time is now {this.state.currentTime}.</p> <br/>

        </header>
      </div>
    );
  }
}

export default PaginaTempo;