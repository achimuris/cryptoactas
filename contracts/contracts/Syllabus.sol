// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

abstract contract Ownable {

  // Un contrato abstracto no puede ser deployado. Este se genera como base
  //   para los contratos que lo implementen y adquieran su funcionalidad.
  address payable private _owner;
  
  constructor() {
    _owner = payable(msg.sender);
    emit OwnershipTransferred( address(0), _owner );
  }

  function getOwner() public view returns(address) { return _owner; }
  
  event OwnershipTransferred( address indexed previousOwner,
                              address indexed newOwner );    
  modifier onlyOwner {
    require( msg.sender == _owner,
              "Only owner can call this function."
           );
    _;
  }
  function transferOwnership( address newOwner) public onlyOwner {
    require(newOwner != address(0));
    emit OwnershipTransferred(_owner, newOwner);
    _owner = payable(newOwner);
  }
}

/**
 *  Estructuras globales para el pasaje de argumentos al contrato principal
 */
  struct Subject {
      string id;
      string name;
  }
  struct SyllabusHeader {
    string  name;
    string  carreer;
  }

/**
 *  -- SYLLABUS -- Definicion del Contrato Principal
 *    Los planes de estudio le pertenecen a las universidades (instituciones)
 *    Son un conjunto de materias con su id y nombre, asociadas a una carrera.
 *    Se pueden agregar pero no modificar ni duplicar
 */
contract Syllabus is Ownable {

  struct SyllabusData {
    string  name;
    string  carreer;
    Subject[] subjects;
  }
  struct Institution {
    string  vers;
    address addr;
    string  name;
    SyllabusData[] syllabuses;
  }
  
  modifier validIndex( uint16 index ) {
    require( index < institutions[msg.sender].syllabuses.length,
             "Index out of range" );
    _;
  }

  mapping ( address => Institution ) institutions;
  string constant   _version = "0.0";
  address immutable _owner = msg.sender;


  function submitData( string memory inst , SyllabusHeader[] memory syls, Subject[][] memory sbjs ) public {

      //Institution storage i = institutions[msg.sender];
      Institution storage i = institutions[msg.sender];
      // bool newInstitution = false;
      // if( i.addr == 0x00 ) newInstitution = true;
      //require( i.addr == address(0), "This institution already have some syllabuses and cannot add another one.");

      i.vers = _version;
      i.addr = msg.sender; // podria ser clave de busqueda en un mapping ( address => institution )
      i.name = inst;

      // Una vez que seteamos los datos de la institucion, pusheamos una nueva instancia (s) para
      //   cada uno de los nuevos planes de estudio y cargamos sus datos
      for (uint16 idx1 = 0; idx1 < syls.length; idx1++) {
        SyllabusData storage s = i.syllabuses.push();
        s.name = syls[idx1].name;
        s.carreer = syls[idx1].carreer;

        // A continuación obtenemos el primer array de array de materias (thisSyllabusSubjects) y lo
        //    recorremos pusheando cada una de las materias al plan correspondiente referenciado por s
        Subject[] memory thisSyllabusSubjects = sbjs[idx1];
        for (uint16 idx2 = 0; idx2 < thisSyllabusSubjects.length; idx2++) {
          s.subjects.push( thisSyllabusSubjects[idx2] );
        }
      }
  }

  function getSyllabusName( uint8 index ) public view validIndex( index )
    returns (string memory searchSyllabus) {
      Institution storage i = institutions[msg.sender];
      return i.syllabuses[index].name;
  }

  function getSyllabus( uint16 index ) public view validIndex( index )
    returns (SyllabusData memory) {
      Institution storage i = institutions[msg.sender];
      return i.syllabuses[index];
  }

  function getInstitutionSyllabus( address instId, uint16 index ) public view onlyOwner()
    returns (SyllabusData memory) {
      Institution storage i = institutions[instId];
      require( index < i.syllabuses.length,
              "Index out of range for specific institution Id" );
      return i.syllabuses[index];
  }

  function getSubjectName( uint16 syllabusIdx, uint16 subjectIdx ) public view validIndex( syllabusIdx )
    returns (string memory) {
      return institutions[msg.sender].syllabuses[syllabusIdx].subjects[subjectIdx].name;
  }
}
