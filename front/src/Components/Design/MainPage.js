import React, { Component } from 'react';
import Tabs from './Tabs';
import Browse from './Browse'
import Profile from './Profile'
import Services from './Services'
import Contracts from './Contracts'
import LoginDialoge from './LoginDialoge';


class MainPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            offers: [],
            loginShow: false,
            registerShow: false,
            banner: 'Freelancer App',
        };
    }

    register = async () => {
        if(document.getElementById('devType').checked) {
            let newUser = {
            user_names: document.getElementById('name').value,
            user_email: document.getElementById('email').value,
            user_login: document.getElementById('regUsername').value,
            user_password: document.getElementById('regPassword').value,
            }
            let queryUrl = 'http://localhost:8082/api/user/'
            await fetch(queryUrl, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then( response => console.log('done'))
            .catch(error => console.error('error'));
            this.setState({
                registerShow: false,
                services: [],
                type: 'developer',
            })
        }
        if(document.getElementById('conType').checked) {
            let newContractor = {
                contractor_name: document.getElementById('name').value,
                contractor_email: document.getElementById('email').value,
                contractor_login: document.getElementById('regUsername').value,
                contractor_password: document.getElementById('regPassword').value,
                }
                let queryUrl = 'http://localhost:8082/api/contractor/'
                await fetch(queryUrl, {
                    method: 'POST',
                    body: JSON.stringify(newContractor),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then( response => console.log('done'))
                .catch(error => console.error('error'));
                this.setState({
                    registerShow: false,
                    contracts: [],
                    type: 'contractor',
                })
        }
    }
    
    login = async () => {
        let queryUrl = 'http://localhost:8082/api/user/'
        queryUrl += document.getElementById('username').value
        queryUrl += '/'
        queryUrl += document.getElementById('password').value
        await fetch(queryUrl)
        .then( async response => {
            let body = await response.json();
            if(response.status === 200 && body.length !== 0) {
                this.setState({
                    profile: body[0],
                    type: 'developer',
                });
                queryUrl = 'http://localhost:8082/api/service/'
                queryUrl += this.state.profile.id;
                queryUrl += '/user';
                await fetch(queryUrl)
                .then( async response => {
                    body = await response.json();
                    this.setState({
                        services: body,
                    });
                });
                queryUrl = 'http://localhost:8082/api/portfolio/'
                queryUrl += this.state.profile.id;
                queryUrl += '/user';
                await fetch(queryUrl)
                .then( async response => {
                    body = await response.json()
                    this.setState({
                        portfolios: body,
                    })
                });
                queryUrl = 'http://localhost:8082/api/application/'
                queryUrl += this.state.profile.id;
                queryUrl += '/user';
                await fetch(queryUrl)
                .then( async response => {
                    body = await response.json()
                    this.setState({
                        applications: body,
                    })
                });

            }
            else {
                queryUrl = 'http://localhost:8082/api/contractor/'
                queryUrl += document.getElementById('username').value
                queryUrl += '/'
                queryUrl += document.getElementById('password').value
                await fetch(queryUrl)
                .then( async response => {
                    let body = await response.json();
                    if(response.status === 200 && body.length !== 0) {
                        this.setState({
                            profile: body[0],
                            type: 'contractor'
                        })
                    }
                });
                queryUrl = 'http://localhost:8082/api/contract/'
                queryUrl += this.state.profile.id;
                queryUrl += '/contractor'
                await fetch(queryUrl)
                .then( async response => {
                    if(response.status === 200) {
                        let body = await response.json();
                        this.setState({
                            contracts: body,
                        })
                    }
                });
            }
        });
        this.setState({
            loginShow: false,
        });
        
    }

    logout = () => {
        this.setState({
            profile: null,
        })
    }
    componentDidMount() {
        // Call our fetch function below once the component mounts
      this.callBackendAPI()
        .then(res => this.setState({ offers: res }))
        .catch(err => console.log(err));
  }

    callBackendAPI = async () => {
        const response = await fetch('http://localhost:8082/api/offer');
        const body = await response.json();
    
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
      };

    showModal = () => {
        this.setState({loginShow: true});
    }

    showRegModal = () => {
        this.setState({registerShow: true});
    }

    closeDialoges = () => {
        this.setState({
            registerShow: false,
            loginShow: false,
        });
    }

    render () {
        if(!this.state.profile) {
            return (
                <div>
                    <div className='welcome-page'>
                      <h1>{this.state.banner}</h1>
                      <button onClick={this.showModal} className='login-button'>Login</button>
                      <button onClick={this.showRegModal} className='login-button'>Register</button>
                    </div>
                    <Tabs>
                        <div label="Browse">
                        <Browse offers= {this.state.offers}/>
                        </div>
                        <div label="Profile">
                            <p>Log in to see some info.</p>
                        </div>
                    </Tabs>
                    <LoginDialoge show={this.state.loginShow} hideDialoge={this.login} closeDialoge={this.closeDialoges}>
                        <selection>
                            <input placeholder='Username' id='username'></input>
                            <br></br>
                            <input placeholder='Password' id='password'></input>
                            <br></br>
                        </selection>
                    </LoginDialoge>
                    <LoginDialoge show={this.state.registerShow} hideDialoge={this.register} closeDialoge={this.closeDialoges}>
                        <selection>
                            <input placeholder='Name' id='name'></input>
                            <br></br>
                            <input placeholder='Email' id='email'></input>
                            <br></br>
                            <input placeholder='Username' id='regUsername'></input>
                            <br></br>
                            <input placeholder='Password' id='regPassword'></input>
                            <br></br>
                            <input type='radio' name='type' id='devType' value='developer'></input> Developer
                            <br></br>
                            <input type='radio' name='type' id='conType' value='contractor'></input> Contractor
                            <br></br>
                        </selection>
                    </LoginDialoge>
                </div>
            );
        }
        else {
            if(this.state.type === 'developer') {
                return (
                    <div>
                        <div className='welcome-page'>
                          <h1>{this.state.banner}</h1>
                          <button onClick={this.logout} className='login-button'>Logout</button>
                        </div>
                        <Tabs>
                            <div label="Browse">
                            <Browse offers= {this.state.offers}/>
                            </div>
                            <div label="Profile">
                                <Profile
                                profile = {this.state.profile}
                                portfolios = {this.state.portfolios}
                                applications = {this.state.applications}/>
                            </div>
                            <div label="Current Services">
                                <Services services = {this.state.services}/>
                            </div>
                        </Tabs>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <div className='welcome-page'>
                          <h1>{this.state.banner}</h1>
                          <button onClick={this.logout} className='login-button'>Logout</button>
                        </div>
                        <Tabs>
                            <div label="Browse">
                            <Browse offers= {this.state.offers}/>
                            </div>
                            <div label="Profile">
                                <Profile
                                profile = {this.state.profile}
                                contracts = {this.state.contracts}/>
                            </div>
                            <div label="Contracts">
                                <Contracts contracts = {this.state.contracts}/>
                            </div>
                        </Tabs>
                    </div>
                );
            }
        }
    }
}

export default MainPage