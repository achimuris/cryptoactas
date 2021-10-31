const MyPlanDeEstudio = artifacts.require("PlanDeEstudio");
const MyActa = artifacts.require("Acta");
module.exports = function(deployer) {
  deployer.deploy(MyPlanDeEstudio);
  deployer.deploy(MyActa);
};
