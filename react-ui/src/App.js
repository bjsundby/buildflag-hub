import React, { Component } from 'react';
import { getTargets, updateTarget } from './Service';

import logo from './logo.svg';
import './App.css';

let io = require('socket.io-client');
let socket = io();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      targets: []
    };
  }

  componentDidMount() {
     socket.on('targets', this.updateTargets.bind(this));
    getTargets().then((response) => {
      this.setState({
        targets: response.targets
      });
    });
  }

  updateTargets(targets) {
    this.setState({
      targets: targets
    });
  }

  setTarget(e, target) {
    updateTarget(target.name, target.link);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Visual Status Device Hub</h2>
        </div>
        <div className="Container">
          <div className="Information">Devices </div>
          <table>
            <tbody>
              <tr key="Header">
                <th>Name</th>
              </tr>
              {
                this.state.targets.map(target => (
                  <tr key={target.name}>
                    <td><a href={target.link} target="_blank">{target.name}</a></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <button onClick={e => this.setTarget(e, { name: "target3", link: "link" })}>Update</button>
      </div>
    );
  }
}

export default App;
