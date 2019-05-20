import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'
import Gallery from 'react-photo-gallery';
import AddEntry from './AddEntry';

class EntryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idPortafolio: this.props.PortfolioId,
            entradas: [],
            entradaActiva: null,
            images: [],
            agregando: false,
            cambiando: null,
            borrando: null,
            externo: this.props.externo,
            messages: this.props.messages
        }
        this.actualizar = this.actualizar.bind(this);
        this.postEntry = this.postEntry.bind(this);
        this.putEntry = this.putEntry.bind(this);
        this.toAdd = this.toAdd.bind(this)
        this.toEdit = this.toEdit.bind(this);
        this.toDelete = this.toDelete.bind(this);

        this.actualizar();
    }

    actualizar() {
        fetch('http://172.24.41.25:8082/api/portfolio/' + this.state.idPortafolio).then(res => res.json()).then(data => {
            if (data != null) {
                const entries = data.Entries;
                const newImages = [];
                entries.forEach(function (element) {
                    const imgName = './files/images/' + element.entry_url;
                    const entry = {
                        src: imgName,
                        width: 4,
                        height: 3,                        
                        alt: element.entry_name
                    };
                    newImages.push(entry);
                });
                this.setState({
                    entradas: data.Entries,
                    images: newImages
                });
            }
        });
    }

    toAdd() {
        this.setState({
            agregando: true,
            cambiando: null
        })
    }

    toEdit(entry) {
        this.setState({
            agregando: true,
            cambiando: entry
        })
    }

    toDelete(entry) {
        this.setState({
            borrando: entry
        });
    }

    postEntry() {
        this.setState({
            cambiando: null,
            agregando: false
        });
        this.actualizar();
        //this.toArray();
    }

    putEntry() {
        this.setState({
            cambiando: null,
            agregando: false,
        });
        this.actualizar();
        this.toArray();
    }

    render() {
        return (
            <div>
                <div className="container">
                    <center><h5> <FormattedMessage
                        id="PortfoliosEntry.Title"
                        defaultMessage="Entries"
                    /> {!this.state.agregando && !this.state.externo ? <span onClick={this.toAdd} className="btn-floating btn-large waves-effect waves-light red darken-3"><i className="material-icons">add</i></span> : null}</h5></center>
                    <br></br>

                    {
                        this.state.agregando ?
                            <div className="row">
                                <div className="container">
                                    <AddEntry post={this.postEntry} put={this.putEntry} idPortfolio={this.state.idPortafolio} entry={this.state.cambiando} messages={this.state.messages} />
                                </div>
                                <br></br>
                            </div>
                            : null
                    }

                    <div className="row">
                        <Gallery photos={this.state.images} />
                    </div>
                </div>
            </div>

        )
    }
}

export default EntryList;
