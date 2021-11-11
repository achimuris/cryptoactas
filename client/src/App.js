import React, { Component } from 'react';
//import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import ReadString from "./ReadString";
import SetString from "./SetString";

class App extends Component {
  state = { loading: true, drizzleState: null };
 
  planes = [{name:"DS-P2016", carreer: "Desarrollo de software 1"},
            {name:"DS-P2019", carreer: "Desarrollo de software 2"}
           ];

  constructor() {
    super();
    this.prueba = this.prueba.bind(this);
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
 
  prueba() {
    console.log( this.planes )
    //this.render()
    //this.writeBC("Chimu")
    
    // const { drizzle } = this.props;
    // const drizzleState = drizzle.store.getState();
    // this.setState({ loading: true, drizzleState })
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
        <div className="App-header">
            <ReadString
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
            <SetString
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
            <input type="submit" onClick={this.prueba}
            />
        </div>
    );
  }


}

export default App;