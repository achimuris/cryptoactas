import React, { Component, useRef } from 'react';
import Select from 'react-select';

import '../Buttons.css';

const URL_BACKEND = process.env.REACT_APP_URL_BACKEND;

function Create_Acta () {
  const nameForm = useRef(null);
  const subjectsDefault = '[{"IdSubject": 1,"Code": 1,"Name": "SW y los Nuevos Escenarios","TeachingHours": 6}]';

  //handleChange(event) {
    //this.setState({data});
  //}

  const ocultarMensaje = () => {
    document.getElementById("divMensaje").style.display='none';
  }

  const validarForm = () => {
    //TODO: Validar de verdad =)
    return true;
  }

  const getMajors = () => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: null
    };
    
    let options=[];

    fetch(URL_BACKEND+'api/carreras', requestOptions)
        .then(response => response.json())
        .then((response) => {
          if(response.response == 'success') {
            response.data.forEach(function(element){
              let option={};
              option.value=element._id;
              option.label=element.Name;
              options.push(option);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        ;
    console.log(options);
    return(options);
  }

  const options=getMajors();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!validarForm()) {
      return;
    }

    const form = nameForm.current;
    const objRequestParameters = {
      "Code": form["Code"].value,
      "Description": form["Description"].value,
      "YearOfValidity": form["YearOfValidity"].value,
      "MajorId": form["MajorId"].value,
      "Subjects": form["Subjects"].value,
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objRequestParameters)
    };

    fetch(URL_BACKEND+'api/actas/add', requestOptions)
        .then(response => response.json())
        .then(() => {
          document.getElementById("divMensaje").style.display='block';
          document.getElementById("miForm").reset();
        })
        .catch((error) => {
          console.log(error);
        })
        ;
  }


  return (
    
    <div align='center'>
      <h2>Cargar nueva Acta</h2>
      <p/>

      <div style={{display:'none'}} id="divMensaje">
        <p>El registro ha sido almacenado
        <input className="favorite styled" type="button" value="X" onClick={ocultarMensaje}/>
        </p>
        
      </div>

      <form id="miForm" ref={nameForm} onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>
              <label>
                Day:
              </label>
            </td>
            <td>
              <input type="number" min="1" max="31" id="Day" name="Day" size="10" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Month:
              </label>
            </td>
            <td>
              <input type="number" min="1" max="12" id="Month" name="Month" size="10" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Year:
              </label>
            </td>
            <td>
              <input type="number" min="2020" max="2021" id="Year" name="year" size="10" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Shift:
              </label>
            </td>
            <td>
              <input type="text" id="Shift" name="Shift" size="10" required/>
            </td>
          </tr>



          <tr>
            <td>
              <label>
                YearOfValidity:
              </label>
            </td>
            <td>
              <input type="number" min="1950" max="2021" name="YearOfValidity" size="10" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Major:
              </label>
            </td>
            <td>
              <Select name="MajorId" options={options} />
            </td>
          </tr>

          <tr style={{display:'none'}} >
            <td>
              <label>
                Subjects
              </label>
            </td>
            <td >
              <textarea value={subjectsDefault} name="Subjects"/>
            </td>
          </tr>

          <tr>
            <td>
              <label>
                Description
              </label>
            </td>
            <td>
              <textarea name="Description" required/>
            </td>
          </tr>

          <tr>
            <td>
              <input type="submit" value="Save"/>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );

};

export default Create_Acta;
