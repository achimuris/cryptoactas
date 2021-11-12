const SyllabusContract = artifacts.require("Syllabus");

//const MyActa = artifacts.require("Acta");
module.exports = function(deployer) {
  deployer.deploy(SyllabusContract);

  //deployer.deploy(MyActa);
};
