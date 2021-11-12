import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Buttons.css';
import Create_Plan from "./planes/create.js";
import Read_Plan from "./planes/read.js";
import Update_Plan from "./planes/update.js";
const BASE_PATH = '/crud_planes';
const CREATE_PATH = `${BASE_PATH}/create`;
const READ_PATH = `${BASE_PATH}/read`;
const UPDATE_PATH = `${BASE_PATH}/update`;
const SAVE_PATH = `${BASE_PATH}/save`;

class Crud_Planes extends React.Component {

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
          New
        </Link>
        <Link to={READ_PATH} className="favorite styled">
          List
        </Link>
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
      </Switch>
    </Router>
  );
  }
};

export default Crud_Planes;
