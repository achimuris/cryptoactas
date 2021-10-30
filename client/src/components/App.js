import logo from './logo512.png';
import './App.css';
import {useEffect, useState} from "react";
const API_URL = process.env.REACT_APP_API;

function App(props) {
  const [data, setData] = useState("No data :(");

  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/hello`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data.msg);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {props.title}
        </h1>

        <img src={logo} className="App-logo" alt="logo" />
        <form action="login" method="post">
          <table>
            <tr>
              <td>Ingrese su nombre de usuario:</td>
              <td><input type="text" name="username" size="30"/></td>
            </tr>
            <tr>
              <td>Ingrese clave:</td>
              <td><input type="password" name="pass" size="30"/></td>
            </tr>
          </table>
          <input type="submit" value="Ingresar"/>
        </form>
      </header>
    </div>
  );
}

export default App;
