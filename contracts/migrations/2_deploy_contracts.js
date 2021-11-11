const SyllabusContract = artifacts.require("Syllabus");
const StrStoreContract = artifacts.require("MyStringStore");
//const MyActa = artifacts.require("Acta");
module.exports = function(deployer) {
  deployer.deploy(SyllabusContract);
  deployer.deploy(StrStoreContract);
  //deployer.deploy(MyActa);
};
