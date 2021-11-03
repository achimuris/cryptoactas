import React from 'react';
import './Buttons.css';
const BASE_PATH = '/crud_materias'
const CREATE_PATH = `${BASE_PATH}/create`
const READ_PATH = `${BASE_PATH}/read`
const UPDATE_PATH = `${BASE_PATH}/update`
const DELETE_PATH = `${BASE_PATH}/delete`

const Crud_Materias = () => {
  return (
    <div align='center' >
      <h1>Administración de materias</h1>
      <p/>
      <a class="favorite styled" href={CREATE_PATH}>
        Cargar nueva materia
      </a>
	<br/> <br/>
      <a class="favorite styled" href={READ_PATH}>
        Consultar materia existente
      </a>
	<br/> <br/>
      <a class="favorite styled" href={UPDATE_PATH}>
        Modificar materia
      </a>
	<br/> <br/>
      <a class="favorite styled" href={DELETE_PATH}>
        Eliminar materia
      </a>

    </div>
  );
};

export default Crud_Materias;
