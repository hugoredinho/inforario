import React, { useState, useEffect } from 'react';
import TopNavBar from './TopNavBar';
import axios from 'axios';

class PaginaHorario extends React.Component {
  state = {
    dados: null
  }

  componentDidMount(){
    axios
      .get("http://localhost:8000/verHorarios")
      .then(response => {
        console.log("Entrou 20");
        const dados = response.data;

        const newState = Object.assign({
          dados: dados
        });

        console.log(newState);

        // store the new state object in the component's state
        this.setState(newState);
      })

      .catch(error => console.log(error));
  }

  render(){
    console.log("Calling render...");
    return (
      <div className="PaginaHorario">
        <TopNavBar></TopNavBar>
        <header className="PaginaHorario-header">
        <p>Os dados que recebi foram: {this.state.dados}</p> <br/>

        </header>
      </div>
    );
  }
}

export default PaginaHorario;