import React, { Component, useRef } from 'react';
import Select from 'react-select';

import '../Buttons.css';

const URL_BACKEND = process.env.REACT_APP_URL_BACKEND;

class Create_Acta extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        id: this.getQueryVariable('id'),
        mode: "new",
        notesDefault: '[{"IdStudent":40100201,"Note":10},{"IdStudent":40100212,"Note":9}]',
        msgHeader: 'Cargar nueva Acta'
    }
    
  }  

  ocultarMensaje() {
    document.getElementById("divMensaje").style.display='none';
  }

  componentDidMount() {
    this.getMajors();
    this.getProffesors();
    let id=this.state.id;
    if(id) {
      this.setState({mode:'update'});
      this.setState({msgHeader:'Editar Acta'});
      this.getRecord(id);
    }
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
    fetch(URL_BACKEND+`api/actas/${id}`, {
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
          document.getElementById("Id").value=res.data._id;
          document.getElementById("Day").value=res.data.Day;
          document.getElementById("Month").value=res.data.Month;
          document.getElementById("Year").value=res.data.Year;
          document.getElementById("Shift").value=res.data.Shift;
          document.getElementById("IdTenuredProfessor").value=res.data.IdTenuredProfessor;
          document.getElementById("IdVocalProfessor1").value=res.data.IdVocalProfessor1;
          document.getElementById("IdVocalProfessor2").value=res.data.IdVocalProfessor2;
          document.getElementById("SyllabusId").value=res.data.IdSyllabus;
          document.getElementById("IdSubject").value=res.data.IdSubject;
          document.getElementById("Notes").value=JSON.stringify(res.data.Notes);
              
          /*
          document.getElementById("Code").value=res.data.Code;
          document.getElementById("YearOfValidity").value=res.data.YearOfValidity;
          document.getElementById("MajorId").value=res.data.MajorId;
          document.getElementById("Subjects").value=res.data.Subjects;
          document.getElementById("Description").value=res.data.Description;
          */
        } else {
          alert("Ha ocurrido un error");
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
        .then(this.getSyllabus)
        .catch((error) => {
          console.log(error);
        })
        ;
  }

  getSyllabus() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: null
    };
    
    let MajorId=document.getElementById('MajorId').value;
    let selSyllabusId=document.getElementById("SyllabusId");              
    selSyllabusId.innerHTML='';

    fetch(URL_BACKEND+'api/planes/', requestOptions)
        .then(response => response.json())
        .then((response) => {
          if(response.response == 'success') {
            response.data.forEach(function(element){
              if(element.MajorId == MajorId) {
                let option=document.createElement("option");
                option.value=element._id;
                option.label="(" + element.Code + ")" + element.Description;
                selSyllabusId.append(option);
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Ups!");
        })
        ;
  }

  getSubjects() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: null
    };
    
    let SyllabusId=document.getElementById('SyllabusId').value;
    fetch(URL_BACKEND+'api/planes/'+SyllabusId, requestOptions)
        .then(response => response.json())
        .then((response) => {
          if(response.response == 'success') {
            let selIdSubject=document.getElementById("IdSubject");              
            response.data.Subjects.forEach(function(element){
              JSON.stringify(element);
              let option=document.createElement("option");
              option.value=element.IdSubject;
              option.label="(" + element.Code + ")" + element.Name;
              selIdSubject.append(option);
            });
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Ups");
        })
        ;
  }


  getProffesors() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: null
    };
    
    let options=[];

    fetch(URL_BACKEND+'api/usuarios', requestOptions)
        .then(response => response.json())
        .then((response) => {
          if(response.response == 'success') {
            let selIdTenuredProfessor=document.getElementById("IdTenuredProfessor");              
            let selIdVocalProfessor1=document.getElementById("IdVocalProfessor1");              
            let selIdVocalProfessor2=document.getElementById("IdVocalProfessor2");              

            let blankOption=document.createElement("option");
            blankOption.value='';
            blankOption.label='';
            selIdVocalProfessor1.append(blankOption);

            blankOption=document.createElement("option");
            blankOption.value='';
            blankOption.label='';
            selIdVocalProfessor2.append(blankOption);


            response.data.forEach(function(element){
              //selIdTenuredProfessor
              let option=document.createElement("option");
              option.value=element._id;
              option.label=element.Name+" "+element.LastName;
              selIdTenuredProfessor.append(option);

              option=document.createElement("option");
              option.value=element._id;
              option.label=element.Name+" "+element.LastName;
              selIdVocalProfessor1.append(option);

              option=document.createElement("option");
              option.value=element._id;
              option.label=element.Name+" "+element.LastName;
              selIdVocalProfessor2.append(option);
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
      "Day": Number(document.getElementById("Day").value),
      "Month": Number(document.getElementById("Month").value),
      "Year": Number(document.getElementById("Year").value),
      "Shift": document.getElementById("Shift").value,
      "IdTenuredProfessor": document.getElementById("IdTenuredProfessor").value,
      "IdVocalProfessor1": document.getElementById("IdVocalProfessor1").value,
      "IdVocalProfessor2": document.getElementById("IdVocalProfessor2").value,
      "IdSyllabus": document.getElementById("SyllabusId").value,
      "IdSubject": document.getElementById("IdSubject").value,
      "Notes": JSON.parse(document.getElementById("Notes").value),
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objRequestParameters)
    };

    console.log(requestOptions);

    let url=URL_BACKEND+'api/actas/add';

    if(document.getElementById("Id").value != "") {
      url=URL_BACKEND+'api/actas/'+document.getElementById("Id").value;
    }
    console.log(url);
    fetch(url, requestOptions)
        .then(response => response.json())
        .then((res) => {
          console.log(res);
          document.getElementById("divMensaje").style.display='block';
          if(document.getElementById("Id").value == "") {
            document.getElementById("miForm").reset();           
          }
        })
        .catch((error) => {
          console.log(error);
        })
        ;
  }

  render() {
    return (
    
    <div align='center'>
      <h2>{this.state.msgHeader}</h2>
      <p/>

      <div style={{display:'none'}} id="divMensaje">
        <p>El registro ha sido almacenado
        <input className="favorite styled" type="button" value="X" onClick={this.ocultarMensaje}/>
        </p>
        
      </div>

      <form id="miForm" onSubmit={this.handleSubmit}>
        <table>
          <tr style={{display:'none'}}>
            <td>
              <label>
                Id:
              </label>
            </td>
            <td>
              <input type="text" id="Id" name="Id"/>
            </td>
          </tr>
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
              IdTenuredProfessor
              </label>
            </td>
            <td>
              <select id="IdTenuredProfessor" name="IdTenuredProfessor"></select>
            </td>
          </tr>

          <tr>
            <td>
              <label>
              IdVocalProfessor1
              </label>
            </td>
            <td>
              <select id="IdVocalProfessor1" name="IdVocalProfessor1"></select>
            </td>
          </tr>          

          <tr>
            <td>
              <label>
              IdVocalProfessor2
              </label>
            </td>
            <td>
              <select id="IdVocalProfessor2" name="IdVocalProfessor2"></select>
            </td>
          </tr>  

          <tr>
            <td>
              <label>
                MajorId:
              </label>
            </td>
            <td>
            <select id="MajorId" name="MajorId" onChange={this.getSyllabus}></select>
            </td>
          </tr>

          <tr>
            <td>
              <label>
                SyllabusId:
              </label>
            </td>
            <td>
            <select id="SyllabusId" name="SyllabusId" onChange={this.getSubjects}></select>
            </td>
          </tr>


          <tr>
            <td>
              <label>
                IdSubject:
              </label>
            </td>
            <td>
            <select id="IdSubject" name="IdSubject"></select>
            </td>
          </tr>

          <tr style={{display:'none'}}>
            <td>
              <label>
                Notes
              </label>
            </td>
            <td>
            <textarea value={this.state.notesDefault} name="Notes" id="Notes"/>
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
    }

}

export default Create_Acta;
