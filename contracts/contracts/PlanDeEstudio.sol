pragma solidity ^0.5.0;

contract PlanDeEstudio {
  string public miPlan = "Plan de estudio ABC";

  function set(string memory x) public {
    miPlan = x;
  }
}