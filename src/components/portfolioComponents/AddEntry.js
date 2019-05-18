import React, { Component } from 'react';
import M from "materialize-css";
import { FormattedMessage } from 'react-intl';

class AddEntry extends Component {
    constructor(props) {
        super(props);
        if (this.props.entry != null) {
            this.state = {
                PortfolioId: this.props.idPortfolio,
                entry_name: this.props.entry.entry_name,
                entry_url: this.props.entry.entry_url,
                entry_hashtags: this.props.entry.entry_hashtags,
                entry_description: this.props.entry.entry_description,
                procesando: false,
                messages: this.props.messages
            }
        }
        else {
            this.state = {
                PortfolioId: this.props.idPortfolio,
                entry_name: '',
                entry_url: '',
                entry_hashtags: '',
                entry_description: '',
                procesando: false,
                messages: this.props.messages
            }
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.cancelar = this.cancelar.bind(this);
    }

    handleInput(e) {
        console.log(e.target);
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
            if (this.props.entry != null) {
                if (this.state.entry_name === '' || this.state.entry_url === '' || this.state.entry_description === '') {
                    M.toast({ html: 'Ingresa valores válidos para la entrada', classes: 'rounded' });
                }
                else {
                    var nuevaEntrada = {};
                    if (banner != null) {
                        nuevaEntrada = { entry_name: this.state.entry_name, entry_url: banner.name, entry_hashtags: this.state.entry_hashtags, entry_description: this.state.entry_description };
                    }
                    else {
                        nuevaEntrada = { entry_name: this.state.entry_name, entry_url: this.state.entry_url, entry_hashtags: this.state.entry_hashtags, entry_description: this.state.entry_description };
                    }
                    console.log(nuevaEntrada);

                    fetch('http://localhost:8082/api/entry/' + this.props.entry.id, {
                        method: 'PUT',
                        body: JSON.stringify(nuevaEntrada),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        if (res.ok) {
                            if (banner != null) {
                                this.uploadImage();
                            }
                            return res.json();
                        }
                        else {
                            console.log(res);
                            this.setState({
                                procesando: false
                            }, () => { console.log(this.state); });

                        }
                    }).then(data => {
                        this.setState({
                            procesando: false
                        }, () => { M.toast({ html: 'Se ha editado la entrada correctamente', classes: 'rounded' }); });

                        this.props.put();

                    }).catch(error => M.toast({ html: error.message, classes: 'rounded' }));
                }
            }
            else {
                if (!banner || this.state.entry_name === '' || this.state.entry_description === '') {
                    M.toast({ html: 'Ingresa valores válidos para la entrada', classes: 'rounded' });
                }
                else {
                    const nuevaEntrada = { entry_name: this.state.entry_name, entry_url: banner.name, entry_hashtags: this.state.entry_hashtags, entry_description: this.state.entry_description, PortfolioId: this.state.PortfolioId };
                    fetch('/api/entry', {
                        method: 'POST',
                        body: JSON.stringify(nuevaEntrada),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        if (res.ok) {
                            this.uploadImage();
                            return res.json();
                        }
                        else {
                            console.log(res);
                            this.setState({
                                procesando: false
                            }, () => { console.log(this.state); });

                        }
                    }).then(data => {
                        this.setState({
                            procesando: false
                        }, () => { M.toast({ html: 'Se ha creado la entrada correctamente', classes: 'rounded' }); });

                        this.props.post();

                    }).catch(error => M.toast({ html: error.message, classes: 'rounded' }));
                }
            }
        }); //fin del this.setState       
    }

    cancelar() {
        if (this.props.entry != null) {
            this.props.put();
        }
        else {
            this.props.post();
        }
    }

    uploadImage() {
        const banner = this.uploadInput.files[0];
        const data = new FormData();
        data.append('file', banner);
        data.append('filename', banner.name);

        fetch('/upload', {
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
                    <center><h6>Datos de la entrada</h6></center>
                    <br></br>
                    {
                        this.props.entry != null ?
                            <div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input disabled={true} id="entry_name" type="text" className="validate" onChange={this.handleInput} value={this.state.entry_name} />
                                        <label className="active" htmlFor="entry_name">
                                            <FormattedMessage
                                                id="Entry.Title"
                                                defaultMessage="Entry Name"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="entry_description" type="text" className="validate" onChange={this.handleInput} value={this.state.entry_description} />
                                        <label className="active" htmlFor="entry_description">
                                            <FormattedMessage
                                                id="Entry.Description"
                                                defaultMessage="Description"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="entry_hashtags" type="text" className="validate" onChange={this.handleInput} value={this.state.entry_hashtags} />
                                        <label className="active" htmlFor="entry_hashtags">
                                            <FormattedMessage
                                                id="Entry.Hashtags"
                                                defaultMessage="Hashtags"
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
                                        <input id="entry_name" type="text" className="validate" onChange={this.handleInput} />
                                        <label htmlFor="entry_name">
                                            <FormattedMessage
                                                id="Entry.Title"
                                                defaultMessage="Entry Name"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="entry_description" type="text" className="validate" onChange={this.handleInput} />
                                        <label htmlFor="entry_description">
                                            <FormattedMessage
                                                id="Entry.Description"
                                                defaultMessage="Description"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                        <input id="entry_hashtags" type="text" className="validate" onChange={this.handleInput}/>
                                        <label className="active" htmlFor="entry_hashtags">
                                            <FormattedMessage
                                                id="Entry.Hashtags"
                                                defaultMessage="Hashtags"
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
                <center><span onClick={this.cancelar} className="waves-effect waves-light btn red darken-2"><FormattedMessage id="Portfolios.Cancel" defaultMessage="Cancel"/></span>   <span onClick={this.handleSubmit} className="waves-effect waves-light btn red darken-3"><FormattedMessage id="Portfolios.Confirm" defaultMessage="Confirm"/></span></center>

            </div>
        )
    }
}

export default AddEntry;