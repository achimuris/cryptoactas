import React, { Component } from 'react';
//import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import ReadSyllabus from "./ReadSyllabus";
import WriteSyllabus from "./WriteSyllabus";

class App extends Component {
  state = { loading: true, drizzleState: null, packData: null };
  packData = null;

  constructor() {
    super();
    this.getBackendSyllabuses = this.getBackendSyllabuses.bind(this);
    console.log(this.state);
  }

  componentDidMount() {
    const { drizzle } = this.props;
 
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
 
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();
 
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }
 
  getBackendSyllabuses() {
    
    let institution = "UTN";

    let planes = [{name:"IE-P1995", carreer: "Ingeniería Electrónica 1"},
                  {name:"IE-P2006", carreer: "Ingeniería Electrónica 2"}
                 ];

    let materias =  [[{id:"a4c0ME95", name:"Medios de enlace"},
                      {id:"a2c0CN95", name:"Cálculo numérico"},
                      {id:"a1c0DE95", name:"Dispositivos electrónicos"}
                     ],
                     [{id:"a5c2EP06", name:"Electrónica de potencia"},
                      {id:"a3c0TE06", name:"Tecnología de las empresas"}
                     ]
                    ];
    // let packData = {institution, planes, materias};
    // this.setState({packData});
    this.state.packData = {institution, planes, materias};
    console.log("Aquí se debe buscar en MongoDB, obtener los planes y pasarlos al WriteSyllabus.js");
    console.log(this.state);
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
        <div className="App-header">
            <ReadSyllabus
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
            <input type="button" value="CargarDatos" onClick={this.getBackendSyllabuses}
            /><br/><br/>
            <WriteSyllabus
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              valueData={this.state.packData}
            />
        </div>
    );        // Estaría bueno poder pasar por estas props del WriteSyllabus los Syllabus
  }


}

export default App;
