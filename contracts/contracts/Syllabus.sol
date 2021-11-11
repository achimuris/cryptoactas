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

/** Estructuras globales para el pasaje de argumentos al contrato principal */
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
  event SyllabusRepeated( string indexed SyllabusName,
                          uint16 indexed currenteIndex );
  modifier validIndex( uint16 index ) {
    require( index < institutions[msg.sender].syllabuses.length,
             "Index out of range" );
    _;
  }

  mapping ( address => Institution ) institutions;
  string constant   _version = "0.0";
  address immutable _owner = msg.sender;

  function isNewSyllabus( SyllabusHeader memory syllabus ) private returns (bool) {
      SyllabusData[] storage ss = institutions[msg.sender].syllabuses;
      for (uint16 idx = 0; idx < ss.length; idx++) {
        if ( keccak256(abi.encodePacked(syllabus.name)) == keccak256(abi.encodePacked(ss[idx].name)) ) {
          emit SyllabusRepeated( syllabus.name, idx );
          return false;
        }
      }
      return true;
  }

  function submitData( string memory inst , SyllabusHeader[] memory syls, Subject[][] memory sbjs ) public payable {

      Institution storage i = institutions[msg.sender];
      // bool newInstitution = false;
      if( i.addr != address(0) ) {
        require( keccak256(abi.encodePacked(i.name)) == keccak256(abi.encodePacked(inst)),
                "Wrong name for this institution" );
        require( keccak256(abi.encodePacked(i.vers)) == keccak256(abi.encodePacked(_version)),
                "This transaccion version message is different from the structure data" );
      } else {
        i.vers = _version;
        i.addr = msg.sender;
        i.name = inst;
      }
      // Una vez que seteamos los datos de la institucion, pusheamos una nueva instancia (s) para
      //   cada uno de los nuevos planes de estudio y cargamos sus datos
      for (uint16 idx1 = 0; idx1 < syls.length; idx1++) {

        if ( !isNewSyllabus(syls[idx1]) ) continue;

        SyllabusData storage s = i.syllabuses.push();
        s.name = syls[idx1].name;
        s.carreer = syls[idx1].carreer;
        // A continuacion obtenemos el primer array de array de materias (thisSyllabusSubjects) y lo
        //    recorremos pusheando cada una de las materias al plan correspondiente referenciado por s
        Subject[] memory thisSyllabusSubjects = sbjs[idx1];
        for (uint16 idx2 = 0; idx2 < thisSyllabusSubjects.length; idx2++) {
          s.subjects.push( thisSyllabusSubjects[idx2] );
        }
      }
  }

  function getSyllabusNames() public view
    returns (string[10] memory mySyllNames) {
      Institution storage i = institutions[msg.sender];
      for (uint16 idx1 = 0; idx1 < i.syllabuses.length; idx1++){
        mySyllNames[idx1] = i.syllabuses[idx1].name;
      }
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

  // Estos metodos se pueden quitar para el deploy final
  function getSyllabusName( uint8 index ) public view validIndex( index )
    returns (string memory searchSyllabus) {
      Institution storage i = institutions[msg.sender];
      return i.syllabuses[index].name;
  }

  function getSubjectName( uint16 syllabusIdx, uint16 subjectIdx ) public view validIndex( syllabusIdx )
    returns (string memory) {
      return institutions[msg.sender].syllabuses[syllabusIdx].subjects[subjectIdx].name;
  }
}
