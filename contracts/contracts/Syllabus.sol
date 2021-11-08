// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

  struct Subject {
      string id;
      string name;
  }

contract Syllabus {

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
  Institution public institution;
  string _version = "0.0";


  function submitData( string memory inst , string[][] memory syls, Subject[][] memory sbjs ) public {

      Institution storage i = institution;
      i.vers = _version;
      i.addr = msg.sender; // podria ser clave de busqueda en un mapping ( address => institution )
      i.name = inst;

      // Una vez que seteamos los datos de la institucion, pusheamos una nueva instancia (s) para
      //   cada uno de los nuevos planes de estudio y cargamos sus datos
      for (uint16 idx1 = 0; idx1 < syls.length; idx1++) {
        SyllabusData storage s = i.syllabuses.push();
        s.name = syls[idx1][0];
        s.carreer = syls[idx1][1];

        // A continuación obtenemos el primer array de array de materias (thisSyllabusSubjects) y lo
        //    recorremos pusheando cada una de las materias al plan correspondiente referenciado por s
        Subject[] memory thisSyllabusSubjects = sbjs[idx1];
        for (uint16 idx2 = 0; idx2 < thisSyllabusSubjects.length; idx2++) {
          s.subjects.push( thisSyllabusSubjects[idx2] );
        }
      }
  }
  
  function getSyllabusName( uint8 index ) public view 
    returns (string memory searchSyllabus) {
      return institution.syllabuses[index].name;
  }

  function getSyllabus( uint16 index ) public view
    returns (SyllabusData memory) {
      return institution.syllabuses[index];
  }

  function getSubjectName( uint16 syllabusIndex, uint16 subjectIndex ) public view
    returns (string memory) {
      return institution.syllabuses[syllabusIndex].subjects[subjectIndex].name;
  }



  /**
   function newSubjet( string str ) private {

   }

   function endRegister( string str ) private {

   }
   */
}