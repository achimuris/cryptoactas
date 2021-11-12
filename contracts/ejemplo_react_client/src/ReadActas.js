import React from "react";

class ReadActas extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Syllabus;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["getSyllabusNames"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { Syllabus } = this.props.drizzleState.contracts;

    console.log("Data Key:" + this.state.dataKey);

    // using the saved `dataKey`, get the variable we're interested in
    const myString = Syllabus.getSyllabusNames[this.state.dataKey];
    console.log(JSON.stringify(myString));
    // if it exists, then we display its value
    return <p>Obtener nombre de planes: {myString && myString.value}</p>;
  }
}

export default ReadActas;
