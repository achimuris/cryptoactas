import React from 'react';
import ReactDOM from 'react-dom';
import BCSyllabus from './BCSyllabus';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "@drizzle/store";
import ContractSyllabus from "./contracts/Syllabus.json";
 
// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [ContractSyllabus],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};
 
// setup the drizzle store and drizzle
const drizzle = new Drizzle(options);
ReactDOM.render(<BCSyllabus drizzle={drizzle} />, document.getElementById('root'));