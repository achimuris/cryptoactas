import React, { Component } from 'react';
import ReadActas from './ReadActas';


class BCSyllabus extends Component {
  state = { loading: true, drizzleState: null };

  constructor() {
    super();
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
 
  componentWillUnmount() {
    this.unsubscribe();
  }
 

  setValue = () => { 

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


    const contract = this.props.drizzle.contracts.Syllabus;
    const stackId = contract.methods["submitData"].cacheSend( institution, planes, materias, { from: this.state.drizzleState.accounts[1], gas: 3000000 } );


    /* BUSCAR LO QUE SE GRABO */
    // save the `stackId` for later reference

    console.log(stackId);

    
    this.setState({ stackId });
  };

  getValores = () => {
    const contract = this.props.drizzle.contracts.Syllabus;
    const nombrePlan =  contract.methods["getSyllabusName"].cacheCall(0);
    console.log("Nombre plan 1 " + nombrePlan);

    //const {Syllabus} = this.state.drizzleState.contracts;
    //const displayData = Syllabus.getSyllabusName(0)[nombrePlan];
    //console.log(displayData);

    // console.log(contract.methods.getSyllabusName(0));

    // console.log(contract);


    //1. make the call to the `storedData` method of our SimpleStorage contract. dataKey is returned.
    const dataKey = this.props.drizzle.contracts.Syllabus.methods.getSyllabusName.cacheCall(0);
    //2. return the resulting state value using dataKey.
    console.log("Valor de dataKey: " + dataKey);
    console.log("Resultado" +  this.props.drizzle.contracts.Syllabus.methods.getSyllabusName[dataKey]);


    //const nombrePlan = contract.methods["_unEjemplo"].cache();
    //const nombrePlan = contract.getSyllabusName(0);

    //const llamada = contract.methods["_unEjemplo"].cacheCall()[nombrePlan];
    //const llamada = contract._unEjemplo[nombrePlan];
    //console.log("nombre Plan 2 " + nombrePlan);
    //console.log(JSON.stringify(llamada));

     //JSON.stringify(nombrePlan));
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
        <div className="App-header">
            <ReadActas
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
              />

            <input type="submit" value="Grabar en la BC" onClick={this.setValue} /> 
            <input type="text" name="nombre"></input>
            <input type="submit" value="Leer de la BC" onClick={this.getValores} />
        </div>
    );
  }
}

export default BCSyllabus;