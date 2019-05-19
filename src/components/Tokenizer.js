import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import M from 'materialize-css';
class Tokenizer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
        this.getToken = this.getToken.bind(this);
        this.copyToken = this.copyToken.bind(this);
    }

    componentDidMount(){
        M.AutoInit();
    }

    copyToken(){
        copy(this.state.token);
    }

    getToken() {
        fetch('/api/token/', {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            this.setState({
                token: data.token,
            });
        });
    }

    render() {
        return (
            <div className="container">
                <h3>Generador de Tokens</h3>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s8">
                                <i className="material-icons prefix">vpn_key</i>
                                <input id="icon_prefix" type="text" className="validate" value={this.state.token} disabled />
                            </div>
                            <div className="col s4">
                                <a className="waves-effect waves-light btn" href="#0" onClick={this.getToken}>Generar</a>
                                <a className="waves-effect waves-light btn" href="#0" onClick={this.copyToken}>Copiar</a>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        )
    }

}

export default Tokenizer;