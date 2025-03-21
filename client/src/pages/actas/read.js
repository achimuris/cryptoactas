import React, { Component, useRef } from 'react';
import { Redirect } from 'react-router';

import '../Buttons.css';

const URL_BACKEND = process.env.REACT_APP_URL_BACKEND;

class Read_Acta extends React.Component {

  constructor(props) {
      super(props)

      this.state = {
          records: [],
          DataisLoaded: false
      }
  }  

  componentDidMount() {
    this.getList();
  }

  getList() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: null
    };
    
    fetch(URL_BACKEND+'api/actas', requestOptions)
      .catch(err => console.error(err))
      .then(res => res.json())
      .then(records => this.setState({ 'records':records.data, DataisLoaded: true }))
    ;

  }

  editRecord (id) {
    const url='./update/?id='+id;
    window.location.href=url;
    //<Redirect to={url}  />
  } 

  storeInTheBC(id) {
    if(window.confirm('Are you sure you want to store in the blockchain? You cannot edit the record after that!')) {
      fetch(URL_BACKEND+`api/actas/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .catch(err => console.error(err))      
        .then(res => res.json())
        .then(data => {
          //STORE IN THE BLOCKCHAIN MOTHERFUCKER!
        });
    }
  }

  deleteRecord(id) {
    if(window.confirm('Are you sure you want to delete it?')) {
      fetch(URL_BACKEND+`api/actas/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .catch(err => console.error(err))      
        .then(res => res.json())
        .then(data => {
          alert("Deleted!");
          this.getList();
        });
    }
  }

  render() {
    if(this.state.records.length > 0) {
      return (
        <div align='center'>
          <h2>Listado de Actas</h2>
          <p/>
          <table style={{border:'1px solid black'}} >
            <thead>
              <tr>
                <th>id</th>
                <th>Date</th>
                <th>Shift</th>
                <th>Edit</th>
                <th>Remove</th>
                <th>Store In The Blockchain</th>
              </tr>
            </thead>
            <tbody id="tBodyRecords">
            {
              this.state.records.map((record) => (
              <tr>
                <th>{record._id}</th>
                <th>{record.Day}/{record.Month}/{record.Year}</th>
                <th>{record.Shift}</th>
                <th><a href="#" onClick={() => this.editRecord(record._id)}>Edit</a></th>
                <th><a href="#" onClick={() => this.deleteRecord(record._id)}>Remove</a></th>
                <th><a href="#" onClick={() => this.storeInTheBC(record._id)}>Store BC</a></th>
              </tr>
    
              ))
            }            
            </tbody>
    
          </table>
        </div>
      );          
    } else {
      return(
          <h3>Cargando...</h3>
      )
    }      
  }
};

export default Read_Acta;
