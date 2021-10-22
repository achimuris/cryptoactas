pragma solidity ^0.5.0;

contract Acta {
  string public miActa = "Acta ABC Profes Ing. D";

  function set(string memory x) public {
    miActa = x;
  }
}