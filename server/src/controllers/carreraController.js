const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/crypto');
const connection = mongoose.connection;

connection.on("error", (err) => {
  console.log("Error en la conexión a la base de datos", err);
});

const modelCarrera = mongoose.model('majors', { "Name": String, "UniversityId": String,}, 'majors');

exports.index = function(req, res) {
    modelCarrera.find()
      .then(data => {
        res.json({response: "success", "data": data});
      })
      .catch(err => {
        res.json({response: "error"})
      });
};


exports.create = function(req, res) {
    const carrera=new modelCarrera(req.body);
    carrera.save().catch(err => {
      res.json({response: "error"})
    });
    res.json({response: "success", req: req.body})
}

exports.read = function(req, res) {
    const id = req.params.id;
    modelCarrera.findById({_id: id})
      .then(reg => {
        res.json({response: "success", data: reg})
      })
      .catch(err => {
        res.json({response: "error"})
      })
}

exports.update = function(req, res) {
    const id = req.params.id;

    modelCarrera.findByIdAndUpdate({_id: id},{$set: req.body})
      .then(reg => {
        res.json({response: "success", req: req.body})
      })
      .catch(err => {
        res.json({response: "error"})
      })    
}


exports.delete = function(req, res) {
    const id = req.params.id;

    modelCarrera.findByIdAndDelete({_id: id})
      .then(reg => {
        res.json({response: "success"})
      })
      .catch(err => {
        res.json({response: "error"})
      })
}
