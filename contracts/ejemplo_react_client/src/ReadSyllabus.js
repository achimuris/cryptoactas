import React, { Component } from 'react';


class ReadSyllabus extends Component {
  state = { loading: true, drizzleState: null, dataKey: null };

  //constructor() {
  //  super();
  //}
  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      this.getSyllByIndex(e.target.value);
    }
  };

  getSyllByIndex = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Syllabus;
    const utnWallet = drizzleState.accounts[1];

    // let drizzle know we want to watch the `getSyllabus` method
    const dataKey = contract.methods["getSyllabus"].cacheCall( value, { from: utnWallet });
    
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
    
    const { Syllabus } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const mySyllabuses = Syllabus.getSyllabusNames[this.state.dataKey];// Acá no hace falta pasarle el index
    console.log("Acá me debería imprimir todo el PlanDeEstudio con este indice: "+ value);
    console.log(mySyllabuses);
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Syllabus;
    const utnWallet = drizzleState.accounts[1];

    // let drizzle know we want to watch the `_unEjemplo` method
    const dataKey = contract.methods["getSyllabusNames"].cacheCall({ from: utnWallet });

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { Syllabus } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const mySyllabusesNames = Syllabus.getSyllabusNames[this.state.dataKey];
    console.log(mySyllabusesNames);
    
    // if it exists, then we display its value
    return (
      <div>
        <p>Indice</p><input type="text" name="Index" onKeyDown={this.handleKeyDown}></input>
        <p>My stored string: {mySyllabusesNames && mySyllabusesNames.value}</p>
      </div>
    );
  }
}
export default ReadSyllabus;

    // <><input type="button" value="Leer" onClick={this.render} />
    // </>

      
    // let i = 1;
    // let mySylls = mySyllabusesNames.value[0];
    // while (mySyllabusesNames.value[i] != "" ) {
    //   mySylls = mySylls.concat(" - ").concat( mySyllabusesNames.value[i++] );
    // }