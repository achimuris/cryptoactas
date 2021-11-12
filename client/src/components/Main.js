import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import Home from '../pages';
import About from '../pages/about';
import Crud_Planes from '../pages/crud_planes';
import Crud_Actas from '../pages/crud_actas';
//import Teams from '../pages/team';
//import Blogs from '../pages/blogs';
//import SignUp from '../pages/signup';
  
function Main(props) {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/about' component={About} />
	<Route path='/crud_planes' component={Crud_Planes} />
	<Route path='/crud_actas' component={Crud_Actas} />
      </Switch>
    </Router>
  );
}
  
export default Main;
