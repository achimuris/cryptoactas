const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/crypto');
const connection = mongoose.connection;

connection.on("error", (err) => {
  console.log("Error en la conexión a la base de datos", err);
});

const modelUniversidad = mongoose.model('universities', { "Name": String, "Address": String});

exports.index = function(req, res) {
    modelUniversidad.find()
      .then(data => {
        res.json({response: "success", "data": data});
      })
      .catch(err => {
        res.json({response: "error"})
      });
};


exports.create = function(req, res) {
    const universidad=new modelUniversidad(req.body);
    universidad.save().catch(err => {
      res.json({response: "error"})
    });
    res.json({response: "success"})
}

exports.read = function(req, res) {
    const id = req.params.id;
    modelUniversidad.findById({_id: id})
      .then(reg => {
        res.json({response: "success", data: reg})
      })
      .catch(err => {
        res.json({response: "error"})
      })
}

exports.update = function(req, res) {
    const id = req.params.id;

    modelUniversidad.findByIdAndUpdate({_id: id},{$set: req.body})
      .then(reg => {
        res.json({response: "success"})
      })
      .catch(err => {
        res.json({response: "error"})
      })    
}


exports.delete = function(req, res) {
    const id = req.params.id;

    modelUniversidad.findByIdAndDelete({_id: id})
      .then(reg => {
        res.json({response: "success"})
      })
      .catch(err => {
        res.json({response: "error"})
      })
}
