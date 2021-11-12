module.exports = () => {
  const express = require("express");
  const router = express.Router();

  var usuario_controller = require('./controllers/usuarioController');
  var acta_controller = require('./controllers/actaController');
  var carrera_controller = require('./controllers/carreraController');
  var plan_controller = require('./controllers/planController');
  var universidad_controller = require('./controllers/universidadController');



  /**** Routes ****/

  //Usuarios
  router.get('/usuarios', usuario_controller.index);
  router.post('/usuarios/add', usuario_controller.create);
  router.get('/usuarios/:id', usuario_controller.read);
  router.post('/usuarios/:id', usuario_controller.update);
  router.delete('/usuarios/:id', usuario_controller.delete);

  //Actas
  router.get('/actas', acta_controller.index);
  router.post('/actas/add', acta_controller.create);
  router.get('/actas/:id', acta_controller.read);
  router.post('/actas/:id', acta_controller.update);
  router.delete('/actas/:id', acta_controller.delete);

  //Carreras
  router.get('/carreras', carrera_controller.index);
  router.post('/carreras/add', carrera_controller.create);
  router.get('/carreras/:id', carrera_controller.read);
  router.post('/carreras/:id', carrera_controller.update);
  router.delete('/carreras/:id', carrera_controller.delete);

  //Planes
  router.get('/planes', plan_controller.index);
  router.post('/planes/add', plan_controller.create);
  router.get('/planes/:id', plan_controller.read);
  router.post('/planes/:id', plan_controller.update);
  router.delete('/planes/:id', plan_controller.delete);

  //Universidades
  router.get('/universidades', universidad_controller.index);
  router.post('/universidades/add', universidad_controller.create);
  router.get('/universidades/:id', universidad_controller.read);
  router.post('/universidades/:id', universidad_controller.update);
  router.delete('/universidades/:id', universidad_controller.delete);


  return router;
}
