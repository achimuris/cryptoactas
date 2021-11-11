import React, { Component, useRef } from 'react';
import axios from 'axios';
import '../Buttons.css';
//const BASE_PATH = '/crud_materias'
//const CREATE_PATH = `${BASE_PATH}/create`
//const READ_PATH = `${BASE_PATH}/read`
//const UPDATE_PATH = `${BASE_PATH}/update`
//const DELETE_PATH = `${BASE_PATH}/delete`

function Create_Plan () {
  const nameForm = useRef(null);
  const subjectsDefault = "";

  //handleChange(event) {
    //this.setState({data});
  //}

  const handleSubmit = () => {
    const form = nameForm.current;
    //alert("Contenido " + this.state.data);
    //alert(`${form['Code'].value} ${form['YearOfValidity'].value}`)
    var object = {};
    console.log("holis");
    form.forEach(function(value, key){
       object[key] = value;
    });
    alert(object["Code"]);
  }


  return (
    <div align='center' >
      <h2>Cargar nuevo Plan</h2>
      <p/>

      <form ref={nameForm} onSubmit={handleSubmit}>
	<table>
	  <tr>
	    <td>
		<label>
		  Code:
		  <input type="text" name="Code" size="10"/>
		</label>
	    </td>
	    <td/>
	    <td>
                <label>
                  YearOfValidity:
                  <input type="text" name="YearOfValidity" size="10"/>
                </label>
	    </td>
            <td/>
            <td>
                <label>
                  Carrera:
                  <input type="text" name="Carrera" size="50"/>
                </label>
            </td>
            <td/>
            <td>
                <label>
                  Major:
                  <input type="text" name="Major" size="50"/>
                </label>
            </td>
          </tr>
	</table>
	<label>
	  Subjects
	  <textarea value={subjectsDefault} name="Subjects" />
	</label>
        <label>
          Description
          <textarea name="Description" />
        </label>
	<input type="submit" value="Cargar datos"/>
      </form>
    </div>
  );

};

export default Create_Plan;
