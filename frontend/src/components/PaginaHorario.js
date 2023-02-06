import React, { useState, useEffect } from 'react';
import TopNavBar from './TopNavBar';
import axios from 'axios';
import { getUsernameFromLocalStorageSettings } from '../auxiliar_files/LocalStorage';

class PaginaHorario extends React.Component {
  state = {
    horarios: null,
    hasAwsResponded: false,
  }

  componentDidMount(){

    var username = getUsernameFromLocalStorageSettings();
    let payload = { 
      username: username, 
    };

    axios
      .post("http://localhost:8000/verHorarios", payload)
      .then(response => {
        console.log("Entrou 20");
        const dados = response.data;

        const newState = Object.assign({
          horarios: dados,
          hasAwsResponded: true
        });

        console.log(newState);

        // store the new state object in the component's state
        this.setState(newState);
      })

      .catch(error => console.log(error));
  }

  adicionarHorario = () => {
    var nomeHorario = document.getElementById('nomeHorario').value;

    var username = getUsernameFromLocalStorageSettings();

    console.log("Username is " + username);

    let payload = { 
      username: username,
      nome_horario: nomeHorario 
    };

    axios
      .post("http://localhost:8000/adicionarHorario", payload)
      .then((response) => {
        // create an array of contacts only with relevant data
        console.log(response);
      })
      .catch((error) => console.log(error));
  }


  render(){
    if (this.state.hasAwsResponded === false){
      return (
        <div>
          Please wait a bit for AWS...
        </div>
      )
    }
    else{
      return (
        <div className="PaginaHorario">
          <TopNavBar></TopNavBar>
          <header className="PaginaHorario-header">
          <p>Os seus horarios são: </p> <br/>

          {this.state.horarios.map (
            (
              {nome}, index
            ) => {
              return (
                <p>O nome do horario é: {nome}</p>
              )
            }
          )
          }

          <input type="text" id="nomeHorario"></input>
          <button onClick={() => this.adicionarHorario()}>Adicionar Horario</button>

          </header>
        </div>
      );
    }
  }
}

export default PaginaHorario;