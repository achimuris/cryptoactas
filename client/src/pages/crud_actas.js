import React from 'react';
import './Buttons.css';
const BASE_PATH = '/crud_actas'
const CREATE_PATH = `${BASE_PATH}/create`
const READ_PATH = `${BASE_PATH}/read`
const UPDATE_PATH = `${BASE_PATH}/update`
const DELETE_PATH = `${BASE_PATH}/delete`

const Crud_Actas = () => {
  return (
    <div align='center' >
      <h1>Administración de Actas</h1>
      <p/>
      <a class="favorite styled" href={CREATE_PATH}>
        Cargar nueva acta
      </a>
	<br/> <br/>
      <a class="favorite styled" href={READ_PATH}>
        Consultar acta existente
      </a>
	<br/> <br/>
      <a class="favorite styled" href={UPDATE_PATH}>
        Modificar acta
      </a>
	<br/> <br/>
    </div>
  );
};

export default Crud_Actas;
