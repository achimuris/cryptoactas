/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');

/**** Configuration ****/
const app = express(); 

function createServer() {
  const routes = require("./routes")();

  app.use(express.json()); 
  //app.use(express.urlencoded());
  app.use(morgan('combined')); 
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build'))); 
  
  /**** Add routes ****/
  app.use("/api", routes);

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) => 
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );
  
  return app;
}

module.exports = createServer;