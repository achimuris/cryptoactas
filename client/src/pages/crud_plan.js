import React from 'react';
import './Buttons.css';
const BASE_PATH = '/crud_materias'
const CREATE_PATH = `${BASE_PATH}/create`
const READ_PATH = `${BASE_PATH}/read`
const UPDATE_PATH = `${BASE_PATH}/update`
const DELETE_PATH = `${BASE_PATH}/delete`
const SAVE_PATH = `${BASE_PATH}/save`

const Crud_Plan = () => {
  return (
    <div align='center' >
      <h1>Administración de Plan de Estudios</h1>
      <p/>
      <a class="favorite styled" href={CREATE_PATH}>
        Cargar nuevo Plan de Estudio
      </a>
	<br/> <br/>
      <a class="favorite styled" href={READ_PATH}>
        Consultar Plan de estudios existente
      </a>
	<br/> <br/>
      <a class="favorite styled" href={UPDATE_PATH}>
        Modificar Plan de estudios
      </a>
	<br/> <br/>
      <a class="favorite styled" href={DELETE_PATH}>
        Eliminar Plan de estudios
      </a>
        <br/> <br/> <br/> <br/>
      <a class="favorite styled" href={SAVE_PATH}>
        Persistir Plan de estudios en la Blockchain
      </a>

    </div>
  );
};

export default Crud_Plan;
