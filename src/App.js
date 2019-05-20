import React, { Component } from 'react';
import Home from './components/Home'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Tokenizer from './components/Tokenizer'
import UserProfile from './components/userComponents/UserProfile'
import ContractorProfile from './components/contractorComponents/contractorProfile'
import UserPortfolios from './components/userComponents/UserPortfolios'
import ContractorOffers from './components/contractorComponents/ContractorOffers'
import M from "materialize-css";
import { FormattedMessage } from 'react-intl';
import PortfolioList from './components/portfolioComponents/PortfoliosList';
import OfferList from './components/offerComponents/OfferList';
import logo from './logo.png';
import './style.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      iniciadoUser: false,
      iniciadoContractor: false,
      login: false,
      signup: false,
      idIniciado: 0,
      token: '',
      nombreIniciado: '',
      viendoPortafolios: false,
      viendoOfertas: false,
      viendoTodasOfertas: false,
      viendoTodosPortafolios: false,
      viendoTokenizer: false,
      messages: this.props.messages
    }
    this.toLogin = this.toLogin.bind(this);
    this.toSignUp = this.toSignUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
    this.toHome = this.toHome.bind(this);
    this.toProfile = this.toProfile.bind(this);
    this.toPortfolios = this.toPortfolios.bind(this);
    this.toOffers = this.toOffers.bind(this);
    this.toAllOffers = this.toAllOffers.bind(this);
    this.toAllPortfolios = this.toAllPortfolios.bind(this);
    this.toTokenizer = this.toTokenizer.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  toLogin() {
    this.setState({
      login: true,
      signup: false,
      iniciadoUser: false,
      iniciadoContractor: false
    });
  }

  toSignUp() {
    this.setState({
      login: false,
      signup: true,
      iniciadoUser: false,
      iniciadoContractor: false
    });
  }

  logIn(conectado) {
    const idLogeado = conectado.idIdentified;
    var nombreLogeado = '';
    const user = conectado.user;
    const token = conectado.token;
    if (user) {
      fetch('http://172.24.41.25:8082/api/user/' + idLogeado, {
        method: 'GET',
        headers: { 'token': token }
      }).then(res => res.json()).then(data => {
        nombreLogeado = data.user_login;
        this.setState({
          login: false,
          signup: false,
          iniciadoUser: true,
          iniciadoContractor: false,
          idIniciado: idLogeado,
          token: token,
          nombreIniciado: nombreLogeado
        });
      });
    } else {
      fetch('http://172.24.41.25:8082/api/contractor/' + idLogeado, {
        method: 'GET',
        headers: { 'token': token }
      }).then(res => res.json()).then(data => {
        nombreLogeado = data.contractor_login;
        this.setState({
          login: false,
          signup: false,
          iniciadoUser: false,
          iniciadoContractor: true,
          idIniciado: idLogeado,
          token: token,
          nombreIniciado: nombreLogeado
        });
      });
    }
  }

  toProfile() {
    this.setState({
      viendoPortafolios: false,
      viendoTodosPortafolios: false,
      viendoOfertas: false,
      viendoTodasOfertas: false
    });
  }

  logOut() {
    this.setState({
      login: false,
      signup: false,
      iniciadoUser: false,
      iniciadoContractor: false,
      idIniciado: 0,
      nombreIniciado: 0,
      viendoPortafolios: false,
      viendoTodosPortafolios: false,
      viendoOfertas: false,
      viendoTodasOfertas: false,
      viendoTokenizer: false
    });
    M.toast({ html: 'Sesión cerrada', classes: 'rounded' });
  }

  toPortfolios() {
    this.setState({
      viendoPortafolios: true,
      viendoOfertas: false,
      viendoTodosPortafolios: false,
      viendoTodasOfertas: false,
      viendoTokenizer: false
    });
  }

  toOffers() {
    this.setState({
      viendoPortafolios: false,
      viendoOfertas: true,
      viendoTodosPortafolios: false,
      viendoTodasOfertas: false,
      viendoTokenizer: false
    });
  }

  toAllPortfolios() {
    this.setState({
      login: false,
      signup: false,
      viendoPortafolios: false,
      viendoTodosPortafolios: true,
      viendoTodasOfertas: false,
      viendoOfertas: false,
      viendoTokenizer: false
    });
  }

  toAllOffers() {
    this.setState({
      login: false,
      signup: false,
      viendoPortafolios: false,
      viendoTodosPortafolios: false,
      viendoTodasOfertas: true,
      viendoOfertas: false,
      viendoTokenizer: false
    });
  }

  toHome() {
    if (this.state.iniciadoUser === false && this.state.iniciadoContractor === false) {
      this.setState({
        login: false,
        signup: false,
        viendoPortafolios: false,
        viendoTodosPortafolios: false,
        viendoTodasOfertas: false,
        viendoOfertas: false,
        viendoTokenizer: false
      });
    }
  }

  toTokenizer() {
    this.setState({
      login: false,
      signup: false,
      viendoPortafolios: false,
      viendoTodosPortafolios: false,
      viendoTodasOfertas: false,
      viendoOfertas: false,
      viendoTokenizer: true
    });
  }

  render() {
    return (
      <div className="App-main">
        <header>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper grey darken-4">
                <div className="row">
                  <div className="col s12">
                    <a href="#" onClick={this.toHome} className="brand-logo"><img className="responsive-img" src={logo} alt="Logo" width="40px" height="40px" /> Minerva's Gallery</a>
                    <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>

                    {
                      this.state.iniciadoUser ?
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                          <li>
                            <a onClick={this.toProfile}>
                              <FormattedMessage
                                id="App.Profile"
                                defaultMessage="Profile"
                              />
                            </a>
                          </li>
                          <li>
                            <a onClick={this.toPortfolios}>
                              <FormattedMessage
                                id="App.UserPortfolios"
                                defaultMessage="My Portfolios"
                              />
                            </a>
                          </li>
                          <li>
                            <a className="modal-trigger" href="#confirmModal">
                              <FormattedMessage
                                id="App.SignOut"
                                defaultMessage="Sign Out"
                              />
                            </a>
                          </li>
                        </ul>
                        : this.state.iniciadoContractor ?
                          <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>
                              <a onClick={this.toProfile}>
                                <FormattedMessage
                                  id="App.Profile"
                                  defaultMessage="Profile"
                                />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.toOffers}>
                                <FormattedMessage
                                  id="App.ContractorOffers"
                                  defaultMessage="My Offers"
                                />
                              </a>
                            </li>
                            <li>
                              <a className="modal-trigger" href="#confirmModal">
                                <FormattedMessage
                                  id="App.SignOut"
                                  defaultMessage="Sign Out"
                                />
                              </a>
                            </li>
                          </ul>
                          :
                          <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>
                              <a onClick={this.toSignUp}>
                                <FormattedMessage
                                  id="App.SignUp"
                                  defaultMessage="Sign Up"
                                />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.toLogin}>
                                <FormattedMessage
                                  id="App.Login"
                                  defaultMessage="Sign In"
                                />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.toAllPortfolios}>
                                <FormattedMessage
                                  id="App.Portfolios"
                                  defaultMessage="Portfolios"
                                />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.toAllOffers}>
                                <FormattedMessage
                                  id="App.Offers"
                                  defaultMessage="Offers"
                                />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.toTokenizer}>
                                <FormattedMessage
                                  id="App.Token"
                                  defaultMessage="Tokenizer"
                                />
                              </a>
                            </li>
                          </ul>
                    }

                  </div>
                </div>
              </div>
            </nav>
          </div>

          <br></br>

          {/* Modals */}

          <div id="confirmModal" className="modal">
            <div className="modal-content">
              <h4>
                <FormattedMessage
                  id="App.SignOutMessageTitle"
                  defaultMessage="Log Out?"
                />
              </h4>
              <p>
                <FormattedMessage
                  id="App.SignOutMessage"
                  defaultMessage="Are you sure you want to log out?"
                />
              </p>
            </div>
            <div className="modal-footer">
              <a href="#" className="modal-close waves-effect waves-green btn-flat">
                <FormattedMessage
                  id="App.No"
                  defaultMessage="No"
                />
              </a>
              <a onClick={this.logOut} className="modal-close waves-effect waves-green btn-flat">
                <FormattedMessage
                  id="App.Yes"
                  defaultMessage="Yes"
                />
              </a>
            </div>
          </div>

          {/* Barra lateral para dispositivos móviles */}

          {
            this.state.iniciadoUser ?
              <ul className="sidenav" id="mobile-demo">
                <li>
                  <a onClick={this.toProfile}>
                    <FormattedMessage
                      id="App.Profile"
                      defaultMessage="Profile"
                    />
                  </a>
                </li>
                <li>
                  <a onClick={this.toPortfolios}>
                    <FormattedMessage
                      id="App.UserPortfolios"
                      defaultMessage="My Portfolios"
                    />
                  </a>
                </li>
                <li>
                  <a className="modal-trigger" href="#confirmModal">
                    <FormattedMessage
                      id="App.SignOut"
                      defaultMessage="Sign Out"
                    />
                  </a>
                </li>
              </ul>
              : this.state.iniciadoContractor ?
                <ul className="sidenav" id="mobile-demo">
                  <li>
                    <a onClick={this.toProfile}>
                      <FormattedMessage
                        id="App.Profile"
                        defaultMessage="Profile"
                      />
                    </a>
                  </li>
                  <li>
                    <a onClick={this.toOffers}>
                      <FormattedMessage
                        id="App.ContractorOffers"
                        defaultMessage="My Offers"
                      />
                    </a>
                  </li>
                  <li>
                    <a className="modal-trigger" href="#confirmModal">
                      <FormattedMessage
                        id="App.SignOut"
                        defaultMessage="Sign Out"
                      />
                    </a>
                  </li>
                </ul>
                :
                <ul className="sidenav" id="mobile-demo">
                  <li>
                    <a onClick={this.toSignUp}>
                      <FormattedMessage
                        id="App.SignUp"
                        defaultMessage="Sign Up"
                      />
                    </a>
                  </li>
                  <li>
                    <a onClick={this.toLogin}>
                      <FormattedMessage
                        id="App.Login"
                        defaultMessage="Sign In"
                      />
                    </a>
                  </li>
                  <li>
                    <a onClick={this.toAllPortfolios}>
                      <FormattedMessage
                        id="App.Portfolios"
                        defaultMessage="Portfolios"
                      />
                    </a>
                  </li>
                  <li>
                    <a onClick={this.toAllOffers}>
                      <FormattedMessage
                        id="App.Offers"
                        defaultMessage="Offers"
                      />
                    </a>
                  </li>
                  <li>
                    <a onClick={this.toTokenizer}>
                      <FormattedMessage
                        id="App.Token"
                        defaultMessage="Tokenizer"
                      />
                    </a>
                  </li>
                </ul>
          }
        </header>
        {/* Componentes principales */}
        < main >
          {
            this.state.login ?
              <div>
                <LogIn toSignUp={this.toSignUp} enableLogIn={this.logIn} messages={this.state.messages} />
              </div>
              : this.state.signup ?
                <div>
                  <SignUp enableSignUp={this.logIn} messages={this.state.messages} />
                </div>
                : this.state.iniciadoUser ?
                  this.state.viendoPortafolios ?
                    <div>
                      <UserPortfolios idLogged={this.state.idIniciado} token={this.state.token} messages={this.state.messages} />
                    </div>
                    :
                    <div>
                      <UserProfile idLogged={this.state.idIniciado} token={this.state.token} messages={this.state.messages} />
                    </div>
                  : this.state.iniciadoContractor ?
                    this.state.viendoOfertas ?
                      <div>
                        <ContractorOffers idLogged={this.state.idIniciado} token={this.state.token} messages={this.state.messages} />
                      </div>
                      :
                      <div>
                        <ContractorProfile idLogged={this.state.idIniciado} token={this.state.token} messages={this.state.messages} />
                      </div>
                    :
                    this.state.viendoTodosPortafolios ?
                      <div>
                        <PortfolioList messages={this.state.messages} />
                      </div>
                      :
                      this.state.viendoTodasOfertas ?
                        <div>
                          <OfferList />
                        </div>
                        :
                        this.state.viendoTokenizer ?
                          <div>
                            <Tokenizer />
                          </div>
                          :
                          <div>
                            <Home />
                          </div>
          }
        </main >
        <footer className="page-footer grey darken-4">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h3 className="white-text">
                  <FormattedMessage
                    id="Home.greetings"
                    defaultMessage="Thank you for your visit!"
                  />
                </h3>
                <p className="grey-text text-lighten-4">
                  <FormattedMessage
                    id="Home.safety"
                    defaultMessage="This page ensures the security of your shared media files. Keep calm."
                  />
                </p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h3 className="white-text">
                  <FormattedMessage
                    id="Home.creators"
                    defaultMessage="Creators"
                  />
                </h3>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="mailto:cm.amaya10@uniandes.edu.co">Cristian Amaya</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://nfortiz.github.io">Nixon Ortiz</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              © 2019 Copyright Text
        <a className="grey-text text-lighten-4 right" href="#0" onClick={this.toHome}>
                <FormattedMessage
                  id="Home"
                  defaultMessage="Home"
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default App;
