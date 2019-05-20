import React, { Component } from 'react';
import OfferProfile from './OfferProfile'
import {FormattedMessage,FormattedDate} from 'react-intl'
class OfferList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ofertas: [],
            ofertaActivo: null
        }
        this.actualizar = this.actualizar.bind(this);
        this.toOfferList = this.toOfferList.bind(this);
        this.toOfferProfile = this.toOfferProfile.bind(this);
        this.actualizar();
    }

    actualizar() {
        fetch('http://172.24.41.25:8082/api/offer').then(res => res.json()).then(data => {
            if (data != null) {
                this.setState({
                    ofertas: data
                });
            }
        });
    }

    toOfferList() {
        this.setState({
          cambiando: null,
          agregando: false,
          ofertaActivo: null
        })
      }


    toOfferProfile(offer) {
        fetch('http://172.24.41.25:8082/api/offer/' + offer.id).then(res => res.json()).then(data => {
            this.setState({
                cambiando: null,
                agregando: false,
                ofertaActivo: data
            });
        });
    }

    render() {
        const ofertas = this.state.ofertas.map((oferta, i) => {
            return (
                <div className="col s4" key={oferta.id}>
                    <div className="card medium sticky-action">
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator" src={"./files/images/banner/" + oferta.offer_banner} alt={oferta.offer_name}/>
                        </div>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{oferta.offer_name}<i className="material-icons right">more_vert</i></span>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{oferta.offer_name}<i className="material-icons right">close</i></span>
                            <p><b> Terms:</b> {oferta.offer_terms}</p>
                            <p><b>Fecha Inicio:</b>   <FormattedDate value={new Date(oferta.offer_begindate)}></FormattedDate></p>
                            <p><b>Fecha Fin:</b>   <FormattedDate value={new Date(oferta.offer_enddate)}/></p>
                        </div>
                        <div className="card-action">
                            <span onClick={() => this.toOfferProfile(oferta)} className="waves-effect waves-teal btn-flat black-text"><b><FormattedMessage id="Portfolios.Open" defaultMessage="Open"/></b></span>
                        </div>
                    </div>
                </div>
            )
        })

        return (

            <div>
                {
                    this.state.ofertaActivo == null ?
                        <div className="container">
                            <center><h5>
                                <FormattedMessage
                                    id="Offers.Title"
                                    defaultMessage="Offers"
                                />
                            </h5></center>
                            <br></br>
                            <div className="row">
                                {ofertas}
                            </div>
                        </div>
                        :
                        <OfferProfile oferta={this.state.ofertaActivo} salir={this.toOfferList} externo={false} />
                }

            </div>

        )
    }
}

export default OfferList;