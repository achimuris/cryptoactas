import React, { Component } from 'react';

class AppBC extends Component {
  state = { loading: true, drizzleState: null, packData: null };
  packData = null;

  constructor(props) {
    super(props)
    console.log(this.state);
    this.setValue = this.setValue.bind(this);

  }

  componentDidMount() {
    const { drizzle } = this.props;
    console.log(drizzle.store);

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
   
  setValue() {
    const { drizzle, valueData } = this.props;
    const drizzleState = this.state.drizzleState;
    const contract = drizzle.contracts.Syllabus;
    const utnWallet = drizzleState.accounts[1];
    console.log( "Acá necesitamos recibir por dede la App valueData o algo asi");
    console.log( drizzleState );
    console.log( valueData );

   // luego quitarlo de aca, pero no pude recibirlo por parametro:
   // ni por variable state ni por props de jsxs
    let institution = valueData["university"];

    let planes = valueData["syllabus"];

    let materias =  valueData["subjects"];;

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
      <input type="button" value="Save in the BC" onClick={this.setValue}/>
    );        
  }


}

export default AppBC;
