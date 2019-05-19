import React, { Component } from 'react';
import M from "materialize-css";
import { FormattedMessage } from 'react-intl';
class AddPortfolio extends Component {

    constructor(props) {
        super(props);
        if (this.props.portafolio != null) {
            this.state = {
                UserId: this.props.idLogged,
                portfolio_name: this.props.portafolio.portfolio_name,
                portfolio_banner: this.props.portafolio.portfolio_banner,
                portfolio_url: this.props.portafolio.portfolio_url,
                portfolio_type: this.props.portafolio.portfolio_type,
                portfolio_description: this.props.portafolio.portfolio_description,
                procesando: false,
                messages: this.props.messages
            }
        }
        else {
            this.state = {
                UserId: this.props.idLogged,
                portfolio_name: '',
                portfolio_banner: '',
                portfolio_url: '',
                portfolio_type: '',
                portfolio_description: '',
                procesando: false,
                messages: this.props.messages
            }
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadBanner = this.uploadBanner.bind(this);
        this.cancelar = this.cancelar.bind(this);
    }

    handleInput(e) {
        const { value, id } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleSubmit() {
        this.setState({
            procesando: true
        }, () => {
            const banner = this.uploadInput.files[0];
            if (this.props.portafolio != null) {
                if (this.state.portfolio_name === '' || this.state.portfolio_url === '' || this.state.portfolio_description === '') {
                    M.toast({ html: 'Ingresa valores válidos para el portafolio', classes: 'rounded' });
                }
                else {
                    var nuevoConcurso = {};
                    if (banner != null) {
                        nuevoConcurso = { portfolio_name: this.state.portfolio_name, portfolio_banner: banner.name, portfolio_url: this.state.portfolio_url.replace(/ /g, ""), portfolio_type: this.state.portfolio_type, portfolio_description: this.state.portfolio_description };
                    }
                    else {
                        nuevoConcurso = { portfolio_name: this.state.portfolio_name, portfolio_banner: this.state.portfolio_banner, portfolio_url: this.state.portfolio_url.replace(/ /g, ""), portfolio_type: this.state.portfolio_type, portfolio_description: this.state.portfolio_description };
                    }
                    console.log(nuevoConcurso);

                    fetch('/api/portfolio/' + this.props.portafolio.id, {
                        method: 'PUT',
                        body: JSON.stringify(nuevoConcurso),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'token': this.props.token
                        }
                    }).then(res => {
                        if (res.ok) {
                            if (banner != null) {
                                this.uploadBanner();
                            }
                            return res.json();
                        }
                        else {
                            console.log(res);
                            this.setState({
                                procesando: false
                            }, () => {console.log(this.state); });

                        }
                    }).then(data => {
                        this.setState({
                            procesando: false
                        }, () => { M.toast({ html: 'Se ha editado el portafolio correctamente', classes: 'rounded' }); });

                        this.props.put();

                    }).catch(error => M.toast({ html: error.message, classes: 'rounded' }));
                }
            }
            else {
                if (banner === null || this.state.portfolio_name === '' || this.state.portfolio_url === '' || this.state.portfolio_type === '' || this.state.portfolio_description === '') {
                    M.toast({ html: 'Ingresa valores válidos para el portafolio y una imagen para su perfil', classes: 'rounded' });
                }
                else {
                    const nuevoConcurso = { portfolio_name: this.state.portfolio_name, portfolio_banner: banner.name, portfolio_url: this.state.portfolio_url.replace(/ /g, ""), portfolio_type: this.state.portfolio_type, portfolio_description: this.state.portfolio_description, UserId: this.state.UserId};
                    console.log(nuevoConcurso); 
                    fetch('/api/portfolio', {
                        method: 'POST',
                        body: JSON.stringify(nuevoConcurso),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'token': this.props.token
                        }
                    }).then(res => {
                        if (res.ok) {
                            this.uploadBanner();
                            return res.json();
                        }
                        else {
                            console.log(res);
                            this.setState({
                                procesando: false
                            }, () => {  console.log(this.state); });

                        }
                    }).then(data => {
                        this.setState({
                            procesando: false
                        }, () => { M.toast({ html: 'Se ha creado el portafolio correctamente', classes: 'rounded' }); });

                        this.props.post();

                    }).catch(error => M.toast({ html: error.message, classes: 'rounded' }));
                }
            }
        }); //fin del this.setState       
    }

    cancelar() {
        if (this.props.portafolio != null) {
            this.props.put();
        }
        else {
            this.props.post();
        }
    }

    uploadBanner() {
        const banner = this.uploadInput.files[0];
        const data = new FormData();
        data.append('file', banner);
        data.append('filename', banner.name);

        fetch('/banner', {
            method: 'POST',
            body: data
        }).then((res) => console.log(res)).catch(error => console.log(error.message));

    }

    componentDidMount() {
        document.dispatchEvent(new Event('component'));
    }

    render() {

        return (

            <div>
                <form className="col s12">
                    <center><h6>Datos de tu portafolio</h6></center>
                    <br></br>
                    {
                        this.props.portafolio != null ?
                            <div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input disabled={true} id="portfolio_name" type="text" className="validate" onChange={this.handleInput} value={this.state.portfolio_name} />
                                        <label className="active" htmlFor="portfolio_name">
                                            <FormattedMessage
                                                id="Portfolio.Title"
                                                defaultMessage="Portfolio Name"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="portfolio_url" type="text" className="validate" onChange={this.handleInput} value={this.state.portfolio_url} />
                                        <label className="active" htmlFor="portfolio_url">
                                            <FormattedMessage
                                                id="Portfolio.URL"
                                                defaultMessage="Desired URL"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <select id="portfolio_type" onChange={this.handleInput} defaultValue={this.state.portfolio_type} >
                                            <option value="Hint" disabled >
                                                {this.state.messages["Portfolio.TypeHint"]}
                                            </option>
                                            <option value="Art">
                                                {this.state.messages["Portfolio.TypeArt"]}
                                            </option>
                                            <option value="Mobile App">
                                                {this.state.messages["Portfolio.TypeApp"]}
                                            </option>
                                            <option value="Web Design">
                                                {this.state.messages["Portfolio.TypeWebDesign"]}
                                            </option>
                                            <option value="Illustration">
                                                {this.state.messages["Portfolio.TypeIllustration"]}
                                            </option>
                                            <option value="Graphic Design">
                                                {this.state.messages["Portfolio.TypeGraphicDesign"]}
                                            </option>
                                            <option value="Other">
                                                {this.state.messages["Portfolio.TypeOther"]}
                                            </option>
                                        </select>
                                        <label className="active" htmlFor="portfolio_type">
                                            <FormattedMessage
                                                id="Portfolio.Type"
                                                defaultMessage="Type"
                                            />
                                        </label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input disabled={true} id="portfolio_description" type="text" className="validate" onChange={this.handleInput} value={this.state.portfolio_description} />
                                        <label className="active" htmlFor="portfolio_description">
                                            <FormattedMessage
                                                id="Portfolio.Description"
                                                defaultMessage="Description"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="file-field input-field">
                                        <div className="container">
                                            <div className="btn red darken-1">
                                                <span><i className="material-icons">file_upload</i></span>
                                                <input type="file" ref={(ref) => { this.uploadInput = ref; }} />
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" type="text" placeholder="Puedes cambiar la imagen del portafolio" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="portfolio_name" type="text" className="validate" onChange={this.handleInput} />
                                        <label htmlFor="portfolio_name">
                                            <FormattedMessage
                                                id="Portfolio.Title"
                                                defaultMessage="Portfolio Name"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="portfolio_url" type="text" className="validate" onChange={this.handleInput} />
                                        <label htmlFor="portfolio_url">
                                            <FormattedMessage
                                                id="Portfolio.URL"
                                                defaultMessage="Desired URL"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <select id="portfolio_type" onChange={this.handleInput} defaultValue="Hint">
                                            <option value="Hint" disabled >
                                                {this.state.messages["Portfolio.TypeHint"]}
                                            </option>
                                            <option value="Art">
                                                {this.state.messages["Portfolio.TypeArt"]}
                                            </option>
                                            <option value="Mobile App">
                                                {this.state.messages["Portfolio.TypeApp"]}
                                            </option>
                                            <option value="Web Design">
                                                {this.state.messages["Portfolio.TypeWebDesign"]}
                                            </option>
                                            <option value="Illustration">
                                                {this.state.messages["Portfolio.TypeIllustration"]}
                                            </option>
                                            <option value="Graphic Design">
                                                {this.state.messages["Portfolio.TypeGraphicDesign"]}
                                            </option>
                                            <option value="Other">
                                                {this.state.messages["Portfolio.TypeOther"]}
                                            </option>
                                        </select>
                                        <label htmlFor="portfolio_type">
                                            <FormattedMessage
                                                id="Portfolio.Type"
                                                defaultMessage="Type"
                                            />
                                        </label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="portfolio_description" type="text" className="validate" onChange={this.handleInput} />
                                        <label htmlFor="portfolio_description">
                                            <FormattedMessage
                                                id="Portfolio.Description"
                                                defaultMessage="Description"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="file-field input-field">
                                        <div className="container">
                                            <div className="btn red darken-1">
                                                <span><i className="material-icons">file_upload</i></span>
                                                <input type="file" ref={(ref) => { this.uploadInput = ref; }} />
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" type="text" placeholder="Sube la imagen de tu portafolio" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }

                </form>
                {
                    this.state.procesando ?
                        <div className="container">
                            <br></br>
                            <div className="progress red lighten-5">
                                <div className="indeterminate red darken-3"></div>
                            </div>
                            <br></br>
                        </div>
                        : null
                }
                <br></br>
                <center><a onClick={this.cancelar} className="waves-effect waves-light btn red darken-2">Cancelar</a>   <a onClick={this.handleSubmit} className="waves-effect waves-light btn red darken-3">Confirmar</a></center>

            </div>
        )
    }
}

export default AddPortfolio;