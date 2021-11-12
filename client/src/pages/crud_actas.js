import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Buttons.css';
import Create_Acta from "./actas/create.js";
import Read_Acta from "./actas/read.js";
const BASE_PATH = '/crud_actas';
const CREATE_PATH = `${BASE_PATH}/create`;
const READ_PATH = `${BASE_PATH}/read`;
const UPDATE_PATH = `${BASE_PATH}/update`;
const SAVE_PATH = `${BASE_PATH}/save`;

class Crud_Actas extends React.Component {

  onClickCreate() {
	this.props.history.push({CREATE_PATH});
  }

  render() {
    return (
    <Router>
      <div align='center' >
        <h1>Administración de Actas</h1>
        <p/>
        <Link to={CREATE_PATH} className="favorite styled">
          New
        </Link>
        <Link to={READ_PATH} className="favorite styled">
          List
        </Link>
      </div>

      <Switch>
        <Route path={CREATE_PATH}>
          <Create_Acta />
        </Route>
        <Route path={READ_PATH}>
          <Read_Acta />
        </Route>
        <Route path={UPDATE_PATH}>
          <Create_Acta />
        </Route>
      </Switch>
    </Router>
  );
  }
};

export default Crud_Actas;
