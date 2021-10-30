import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import Home from '../pages';
import About from '../pages/about';
//import Events from '../pages/events';
//import AnnualReport from '../pages/annual';
//import Teams from '../pages/team';
//import Blogs from '../pages/blogs';
//import SignUp from '../pages/signup';
  
function Main(props) {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/about' component={About} />
      </Switch>
    </Router>
  );
}
  
export default Main;
