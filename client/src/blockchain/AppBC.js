import React, { Component } from 'react';

class AppBC extends Component {
  state = { loading: true, drizzleState: null, packData: null };
  packData = null;

  constructor(props) {
    super(props)
    console.log(this.state);
  }

  componentDidMount() {
    const { drizzle } = this.props;
    console.log(drizzle.store);

    console.log("aca");
 
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      console.log("nico");
 
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }
   
  setValue () {
    const { drizzle, drizzleState, valueData } = this.props;
    const contract = drizzle.contracts.Syllabus;
    const utnWallet = drizzleState.accounts[1];
    console.log( "Acá necesitamos recibir por dede la App valueData o algo asi");
    console.log( drizzleState );
    console.log( valueData );

   // luego quitarlo de aca, pero no pude recibirlo por parametro:
   // ni por variable state ni por props de jsxs
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
    console.log(this.state.packData);
    console.log(this.props.mySyllabuses);
    // let drizzle know we want to call the `submitData` method with some args
    const stackId = contract.methods["submitData"].cacheSend(
                                                   institution, planes, materias,
                                                   { from: utnWallet, gas: 3000000 }
                                                  );
    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  render() {
    if (this.state.loading) {
      return "Loading Drizzle...";
    }
    return (
      <input type="submit" value="Save in the BC" onClick={this.setValue} />
    );        
  }


}

export default AppBC;
