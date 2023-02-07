import React, { useState, useEffect } from 'react';
import TopNavBar from './TopNavBar';
import axios from 'axios';
import { getUsernameFromLocalStorageSettings } from '../auxiliar_files/LocalStorage';
import $ from 'jquery';
import { Aula, Cadeira, Curso} from '../auxiliar_files/ObjectStrucutre';

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

    //TODO CHANGE THIS TO ONLY RELOAD THE HORARIOS COMPONENT INSTEAD OF RELOADING WHOLE PAGE

    window.location.reload();
  }

  handlePaste = (event) => {
    console.log("Fez isto");

    var string = event.clipboardData.getData('text');

    var nome_numero_cadeira = $('[class="subtitle"]',string)[0].innerText.trim();
    var nome_cadeira = nome_numero_cadeira.split(" - ")[0].trim();
    var numero_cadeira = nome_numero_cadeira.split(" - ")[1].trim();

    var unidade_organica =  $('[class="cellcontentSmall"]',string)[0].innerText.trim();
    var regime_semestre =  $('[class="cellcontentSmall"]',string)[1].innerText.trim();

    var docente_responsavel = $('[class="cellcontent"]',string)[0].innerText.trim();

    var cursos = $('[class="cellcontent"]',string)[1].innerText;

    var lista_cursos = cursos.split("\n");

    console.log(lista_cursos);

    var cadeira_estrutura = Cadeira;
    cadeira_estrutura.departamento = unidade_organica;
    cadeira_estrutura.regime = regime_semestre;
    cadeira_estrutura.nome = nome_cadeira;
    cadeira_estrutura.numero = numero_cadeira;
    cadeira_estrutura.docente_responsavel = docente_responsavel;

    cadeira_estrutura.cursos = [];

    for (let i=0;i< lista_cursos.length; i++){;
      var nome_curso = lista_cursos[i].trim();

      if (nome_curso.length > 2){
        cadeira_estrutura.cursos.push({
          nome: lista_cursos[i].trim()
        });
      }
    }

    //console.log(nome_cadeira,numero_cadeira);
    //console.log(unidade_organica, regime_semestre);
    console.log(cadeira_estrutura);


  };


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
        
          <input onPaste = {this.handlePaste} type="text" id = "adicionarCadeira"></input>
          <button >Adicionar Cadeira</button>  

          </header>
        </div>
      );
    }
  }
}

export default PaginaHorario;