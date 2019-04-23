import React, { Component } from 'react';
import M from "materialize-css";
import { FormattedMessage } from 'react-intl';

class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      user_names: '',
      user_lastnames: '',
      user_password_confirm: '',
      user_email: '',
      user_password: '',
      user_login: '',
      user_birthdate: '',
      user_switch: true,
      contractor_name: '',
      contractor_email: '',
      contractor_login: '',
      contractor_password: '',
      contractor_password_confirm: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    const { value, id } = e.target;
    this.setState({
      [id]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var identified = false;
    var user = false;

    if (this.state.user_switch) {
      if (this.state.user_password !== this.state.user_password_confirm) {
        M.toast({ html: 'Las contraseñas no coinciden', classes: 'rounded' });
      }
      else if (this.state.user_password.length < 8) {
        M.toast({ html: 'La contraseña debe tener 8 caracteres mínimo', classes: 'rounded' });
      }
      else if (this.state.user_password === '' || this.state.user_names === '' || this.state.user_lastnames === '' || this.state.user_email === '') {
        M.toast({ html: 'Ingresa valores válidos para registrarse', classes: 'rounded' });
      }
      else {
        this.setState({
          user_birthdate: new Date(this.birthdate.value),
          procesando: true
        }, () => {
          const nuevoUsuario = { user_names: this.state.user_names, user_lastnames: this.state.user_lastnames, user_email: this.state.user_email, user_login: this.state.user_login, user_password: this.state.user_password, user_birthdate: new Date(this.state.user_birthdate) };
          console.log(nuevoUsuario);
          fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(nuevoUsuario),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(res => {
            if (res.ok) {
              return res.json();
            }
            else {
              console.log(res);
              throw new Error("Ya existe una cuenta de usuario con este correo electrónico");
            }
          }).then(data => {
            M.toast({ html: 'Se ha creado la cuenta correctamente', classes: 'rounded' });
            const idIdentified = data.id;
            user = true;
            this.props.enableSignUp({ idIdentified, user });
          }).catch(error => M.toast({ html: error.message, classes: 'rounded' }));
        });
      }
    } else {
      if (this.state.contractor_password !== this.state.contractor_password_confirm) {
        M.toast({ html: 'Las contraseñas no coinciden', classes: 'rounded' });
      }
      else if (this.state.contractor_password.length < 8) {
        M.toast({ html: 'La contraseña debe tener 8 caracteres mínimo', classes: 'rounded' });
      }
      else if (this.state.contractor_password === '' || this.state.contractor_email === '' || this.state.contractor_login === '' || this.state.contractor_name === '') {
        M.toast({ html: 'Ingresa valores válidos para registrarse', classes: 'rounded' });
      } else {
        const nuevoContratista = { contractor_name: this.state.contractor_name, contractor_email: this.state.contractor_email, contractor_login: this.state.contractor_login, contractor_password: this.state.contractor_password };

        fetch('/api/contractor', {
          method: 'POST',
          body: JSON.stringify(nuevoContratista),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.ok) {
            return res.json();
          }
          else {
            throw new Error("Ya existe una cuenta de empresa con este correo electrónico");
          }
        }).then(data => {
          M.toast({ html: 'Se ha creado la cuenta correctamente', classes: 'rounded' });
          const idIdentified = data.id;
          this.props.enableSignUp({ idIdentified, user });
        }).catch(error => M.toast({ html: error.message, classes: 'rounded' }));
      }
    }
  }

  componentDidMount() {
    document.dispatchEvent(new Event('component'));
  }

  handleDate(date) {
    this.setState({
      user_birthdate: date
    });
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12">
            <div className="container">
              <center>
                <h5> <FormattedMessage
                  id="SignUp.FormTitle"
                  defaultMessage="Sign Up Form"
                />
                </h5>
                <h6>
                  <FormattedMessage
                    id="SignUp.FormSubTitle"
                    defaultMessage="Register as a user, remember that the entered data is necessary to log in once you sign up."
                  />
                </h6>
              </center>
              <br></br>
              <div className="col s12" >
                <ul className="tabs ">
                  <li className="tab col s6 blac">
                    <a className="active black-text text-darken-4" href="#userForm" onClick={() => this.setState({ user_switch: true })}>
                      <FormattedMessage
                        id="SignUp.UserTitle"
                        defaultMessage="User"
                      />
                    </a>
                  </li>
                  <li className="tab col s6">
                    <a className="black-text text-darken-4" href="#conForm" onClick={() => this.setState({ user_switch: false })}>
                      <FormattedMessage
                        id="SignUp.ContractorTitle"
                        defaultMessage="Contractor"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col s12" id="userForm" >
                <div className="row" >
                  <div className="input-field col s6">
                    <input id="user_names" type="text" className="validate" onChange={this.handleInput} />
                    <label htmlFor="user_names">
                      <FormattedMessage
                        id="SignUp.NameLabel"
                        defaultMessage="Name"
                      />
                    </label>
                  </div>
                  <div className="input-field col s6">
                    <input id="user_lastnames" type="text" className="validate" onChange={this.handleInput} />
                    <label htmlFor="user_lastnames">
                      <FormattedMessage
                        id="SignUp.LastNameLabel"
                        defaultMessage="Last Names"
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input id="user_login" type="text" className="validate" onChange={this.handleInput} />
                    <label htmlFor="user_login">
                      <FormattedMessage
                        id="SignUp.LoginLabel"
                        defaultMessage="Login"
                      />
                    </label>
                  </div>
                  <div className="input-field col s6">
                    <input type="text" className="datepicker" id="user_birthdate" onChange={this.handleInput} ref={(ref) => { this.birthdate = ref; }} />
                    <label htmlFor="user_birthdate">
                      <FormattedMessage
                        id="SignUp.BirthdateLabel"
                        defaultMessage="Day of Birth"
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="user_email" type="email" className="validate" onChange={this.handleInput} />
                    <label htmlFor="user_email">
                      <FormattedMessage
                        id="SignUp.EmailLabel"
                        defaultMessage="Email"
                      />
                    </label>
                    <span className="helper-text" data-error="No es válido" data-success="Es válido">
                      <FormattedMessage
                        id="SignUp.EmailHint"
                        defaultMessage="Enter your email..."
                      />
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="user_password" type="password" className="validate" onChange={this.handleInput} />
                    <label htmlFor="user_password">
                      <FormattedMessage
                        id="SignUp.PasswordLabel"
                        defaultMessage="Password"
                      />
                    </label>
                    <span className="helper-text">
                      <FormattedMessage
                        id="SignUp.PasswordHint"
                        defaultMessage="The password must be at least 8 characters"
                      />
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="user_password_confirm" type="password" className="validate" onChange={this.handleInput} />
                    <label htmlFor="user_password_confirm">
                      <FormattedMessage
                        id="SignUp.ConfirmPasswordLabel"
                        defaultMessage="Confirm the Password"
                      />
                    </label>
                    <span className="helper-text">
                      <FormattedMessage
                        id="SignUp.ConfirmPasswordHint"
                        defaultMessage="Please retype your password"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col s12" id="conForm">
                <div className="row">
                  <div className="input-field col s12">
                    <input id="contractor_name" type="text" className="validate" onChange={this.handleInput} />
                    <label htmlFor="contractor_login">
                      <FormattedMessage
                        id="SignUp.NameLabel"
                        defaultMessage="Name"
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="contractor_login" type="text" className="validate" onChange={this.handleInput} />
                    <label htmlFor="contractor_login">
                      <FormattedMessage
                        id="SignUp.LoginLabel"
                        defaultMessage="Login"
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="contractor_email" type="email" className="validate" onChange={this.handleInput} />
                    <label htmlFor="contractor_email">
                      <FormattedMessage
                        id="SignUp.EmailLabel"
                        defaultMessage="Email"
                      />
                    </label>
                    <span className="helper-text" data-error="No es válido" data-success="Es válido">
                      <FormattedMessage
                        id="SignUp.EmailHint"
                        defaultMessage="Enter your email..."
                      />
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="contractor_password" type="password" className="validate" onChange={this.handleInput} />
                    <label htmlFor="user_password">
                      <FormattedMessage
                        id="SignUp.PasswordLabel"
                        defaultMessage="Password"
                      />
                    </label>
                    <span className="helper-text">
                      <FormattedMessage
                        id="SignUp.PasswordHint"
                        defaultMessage="The password must be at least 8 characters"
                      />
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="contractor_password_confirm" type="password" className="validate" onChange={this.handleInput} />
                    <label htmlFor="user_password_confirm">
                      <FormattedMessage
                        id="SignUp.ConfirmPasswordLabel"
                        defaultMessage="Confirm the Password"
                      />
                    </label>
                    <span className="helper-text">
                      <FormattedMessage
                        id="SignUp.ConfirmPasswordHint"
                        defaultMessage="Please retype your password"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <br></br>
          <center><span onClick={this.handleSubmit} className="waves-effect waves-light btn red darken-3">Registrarse</span></center>
        </div>
      </div>
    )
  }
}

export default SignUp;
