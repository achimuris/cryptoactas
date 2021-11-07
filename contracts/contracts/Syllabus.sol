// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

  struct Subject {
      string id;
      string name;
  }

  struct SyllabusData {
    string  name;
    string  carreer;
    Subject subjects;
  }

  struct Institution {
    string  vers;
    address addr;
    string  name;
    SyllabusData[] syllabuses;
  }

contract Syllabus {
  string _version = "0.0";
  string _separator = "|";

  Institution public institution;
  string public mySyllabus1 = "Plan de estudio ABC";
  string public mySyllabus2 = "Plan de estudio XYZ";

  function setSwap(string[] memory inputJsonString) public {
    mySyllabus1 = inputJsonString[1];
    mySyllabus2 = inputJsonString[0];
  }

  function submitData( string memory inst , string[][] memory syls, Subject[] memory sbjs ) public {

      Institution storage i = institution;
      i.vers = _version;
      i.addr = msg.sender; // podría ser clave de busqueda en un mapping ( address => institution )
      i.name = inst;
      for (uint16 idx1 = 0; idx1 < syls.length; idx1++) {
        i.syllabuses.push( SyllabusData({name: syls[idx1][0],
                                          carreer: syls[idx1][1],
                                          subjects: sbjs[idx1]}) );
        
        //for (uint16 idx2 = i.syllabuses.length-1; idx2 < syllabuses.length; idx2++) {
        //  i.syllabuses[idx2].push( Subjects({ id: subjects[idx1][idx2])
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

  function getFirstSubjectName( uint16 index ) public view
    returns (string memory) {
      return institution.syllabuses[index].subjects.name;
  }


  /**
   function newSubjet( string str ) private {

   }

   function endRegister( string str ) private {

   }
   */
}