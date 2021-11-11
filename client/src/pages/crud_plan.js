import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Buttons.css';
import Create_Plan from "./plan/create.js";
import Read_Plan from "./plan/read.js";
import Update_Plan from "./plan/update.js";
import Delete_Plan from "./plan/delete.js";
const BASE_PATH = '/crud_plan';
const CREATE_PATH = `${BASE_PATH}/create`;
const READ_PATH = `${BASE_PATH}/read`;
const UPDATE_PATH = `${BASE_PATH}/update`;
const DELETE_PATH = `${BASE_PATH}/delete`;
const SAVE_PATH = `${BASE_PATH}/save`;

class Crud_Plan extends React.Component {

  onClickCreate() {
	this.props.history.push({CREATE_PATH});
  }

  render() {
    return (
    <Router>
      <div align='center' >
        <h1>Administración de Plan de Estudios</h1>
        <p/>
        <Link to={CREATE_PATH} className="favorite styled">
          Cargar nuevo Plan de Estudio
        </Link>
        <Link to={READ_PATH} className="favorite styled">
          Consultar Plan de estudios existente
        </Link>
        <Link to={UPDATE_PATH} className="favorite styled">
          Modificar Plan de estudios
        </Link>
        <Link to={DELETE_PATH} className="favorite styled">
          Eliminar Plan de estudios
        </Link>
        <a class="favorite styled" href={SAVE_PATH}>
          Persistir Plan de estudios en la Blockchain
        </a>
      </div>

      <Switch>
	<Route path={CREATE_PATH}>
	  <Create_Plan />
	</Route>
        <Route path={READ_PATH}>
          <Read_Plan />
        </Route>
        <Route path={UPDATE_PATH}>
          <Update_Plan />
        </Route>
        <Route path={DELETE_PATH}>
          <Delete_Plan />
        </Route>
      </Switch>
    </Router>
  );
  }
};

export default Crud_Plan;
