const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/crypto');
const connection = mongoose.connection;

connection.on("error", (err) => {
  console.log("Error en la conexión a la base de datos", err);
});

const modelActa = mongoose.model('examsreport', { "Day": Number, "Month": Number, "Year": Number, "Shift": String, "IdTenuredProfessor": Number, "IdVocalProfessor1": Number, "IdVocalProfessor2": Number, "IdSubject": Number, "IdSyllabu": String, "Notes": Array}, 'examsreport');

exports.index = function(req, res) {
    modelActa.find()
      .then(data => {
        res.json({response: "success", "data": data});
      })
      .catch(err => {
        res.json({response: "error"})
      });
};


exports.create = function(req, res) {
    const acta=new modelActa(req.body);
    acta.save().catch(err => {
      res.json({response: "error"})
    });
    res.json({response: "success"})
}

exports.read = function(req, res) {
    const id = req.params.id;
    modelActa.findById({_id: id})
      .then(reg => {
        res.json({response: "success", data: reg})
      })
      .catch(err => {
        res.json({response: "error"})
      })
}

exports.update = function(req, res) {
    const id = req.params.id;

    modelActa.findByIdAndUpdate({_id: id},{$set: req.body})
      .then(reg => {
        res.json({response: "success"})
      })
      .catch(err => {
        res.json({response: "error"})
      })    
}


exports.delete = function(req, res) {
    const id = req.params.id;

    modelActa.findByIdAndDelete({_id: id})
      .then(reg => {
        res.json({response: "success"})
      })
      .catch(err => {
        res.json({response: "error"})
      })
}
