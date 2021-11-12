import React, { Component, useRef } from 'react';
import Select from 'react-select';

import '../Buttons.css';

const URL_BACKEND = process.env.REACT_APP_URL_BACKEND;

class Update_Plan extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        id: this.getQueryVariable('id'),
        records: [],
        DataisLoaded: false
    }

    
  }  

  componentDidMount() {
    this.getMajors();
    this.getRecord(this.getQueryVariable('id'));
  }


  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return false;  
  }

  ocultarMensaje() {
    document.getElementById("divMensaje").style.display='none';
  }

  validarForm() {
    //TODO: Validar de verdad =)
    return true;
  }

  getRecord(id) {
    fetch(URL_BACKEND+`api/planes/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .catch(err => console.error(err))
      .then(res => res.json())
      .then(res => {
        if(res.response == 'success') {
          document.getElementById("Code").value=res.data.Code;
          document.getElementById("YearOfValidity").value=res.data.YearOfValidity;
          document.getElementById("MajorId").value=res.data.MajorId;
          document.getElementById("Subjects").value=JSON.stringify(res.data.Subjects);
          document.getElementById("Description").value=res.data.Description;
        } else {
          //alert("Ha ocurrido un error");
        }
      });    
  }

  getMajors() {
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
            let selMajorId=document.getElementById("MajorId");              
            response.data.forEach(function(element){
              let option=document.createElement("option");
              option.value=element._id;
              option.label=element.Name;
              selMajorId.append(option);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        ;
  }


  handleSubmit(event) {
    event.preventDefault();
    /*
    if(! this.validarForm()) {
      return;
    }
    */
    const objRequestParameters = {
      "Code": document.getElementById("Code").value,
      "Description": document.getElementById("Description").value,
      "YearOfValidity": document.getElementById("YearOfValidity").value,
      "MajorId": document.getElementById("MajorId").value,
      "Subjects": JSON.parse(document.getElementById("Subjects").value),
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objRequestParameters)
    };

    let url=URL_BACKEND+'api/planes/'+document.getElementById("Id").value;

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(() => {
          document.getElementById("divMensaje").style.display='block';
        })
        .catch((error) => {
          console.log(error);
        })
        ;
  }

  render() {
    return ( 
    <div align='center'>
      <h2>Editar Plan</h2>
      <p/>

      <div style={{display:'none'}} id="divMensaje">
        <p>El registro ha sido actualizado
        <input className="favorite styled" type="button" value="X" onClick={this.ocultarMensaje}/>
        </p>
        
      </div>

      <form id="miForm" onSubmit={this.handleSubmit}>
        <table>
          <tr style={{display:'none'}} >
            <td>
              <label>
                Id:
              </label>
            </td>
            <td>
              <input type="text" id="Id" name="Id" size="10" defaultValue={this.state.id} required/>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Code:
              </label>
            </td>
            <td>
              <input type="text" id="Code" name="Code" size="10" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                YearOfValidity:
              </label>
            </td>
            <td>
              <input type="number" min="1950" max="2021" id="YearOfValidity" name="YearOfValidity" size="10" required/>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                Major:
              </label>
            </td>
            <td>
              <select id="MajorId" name="MajorId"></select>
            </td>
          </tr>

          <tr style={{display:'none'}} >
            <td>
              <label>
                Subjects
              </label>
            </td>
            <td >
              <textarea id="Subjects" name="Subjects"/>
            </td>
          </tr>

          <tr>
            <td>
              <label>
                Description
              </label>
            </td>
            <td>
              <textarea id="Description" name="Description" required/>
            </td>
          </tr>

          <tr>
            <td>
            </td>
            <td>
              <input type="submit" value="Update"/>
            </td>
          </tr>
        </table>
      </form>
    </div>
    );
  }

};

export default Update_Plan;
