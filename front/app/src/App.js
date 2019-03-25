import React, { Component } from 'react';
import Home from './components/Home'

class App extends Component {

  constructor() {
    super();
    this.state = {
      iniciado: false,
      login: false,
      signup: false,
      idIniciado: 0,
      nombreIniciado: '',
      viendoConcursos: false
    }
    this.toLogin = this.toLogin.bind(this);
    this.toSignUp = this.toSignUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
    this.toHome = this.toHome.bind(this);
    this.toProfile = this.toProfile.bind(this);
    this.toContests = this.toContests.bind(this);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
