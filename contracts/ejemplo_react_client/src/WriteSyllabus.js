import React from "react";

class WriteSyllabus extends React.Component {
  state = { stackId: null };


  setValue = () => {
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

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  render() {
    return (
      <div>
        <input type="submit" onClick={this.setValue} />
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default WriteSyllabus;
