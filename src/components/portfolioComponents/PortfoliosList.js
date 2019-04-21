import React, { Component } from 'react';
import PortfolioProfile from './PortfolioProfile'
import { FormattedMessage } from 'react-intl'
import copy from 'copy-to-clipboard';
import M from "materialize-css";
class PortfolioList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portafolios: [],
            portfolioActivo: null
        }
        this.actualizar = this.actualizar.bind(this);
        this.toPortfolioList = this.toPortfolioList.bind(this);
        this.toPortfolioProfile = this.toPortfolioProfile.bind(this);
        this.compartirURL = this.compartirURL.bind(this);
        this.actualizar();
    }

    actualizar() {
        fetch('/api/portfolio/').then(res => res.json()).then(data => {
            if (data != null) {
                this.setState({
                    portafolios: data
                });
            }
        });
    }

    toPortfolioList() {
        this.setState({
          cambiando: null,
          agregando: false,
          portfolioActivo: null
        })
      }

    toPortfolioProfile(contest) {
        fetch('/api/portfolio/' + contest.id).then(res => res.json()).then(data => {
            this.setState({
                cambiando: null,
                agregando: false,
                portfolioActivo: data
            });
        });
    }

    compartirURL(url) {
        copy('http://localhost:8082/' + url);
        M.toast({ html: 'URL del portafolio copiada en el portapapeles', displayLength: 10000, classes: 'rounded' });
    }


    render() {

        const portafolios = this.state.portafolios.map((portafolio, i) => {
            return (
                <div className="col s4" key={portafolio.id}>
                    <div className="card medium sticky-action">
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator" src={"./files/images/banner/" + portafolio.portfolio_banner} alt={portafolio.portfolio_name} />
                        </div>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{portafolio.portfolio_name}<i className="material-icons right">more_vert</i></span>
                            <p><i>/{portafolio.portfolio_url}</i></p>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{portafolio.portfolio_name}<i className="material-icons right">close</i></span>
                            <p>
                                <b>
                                    <FormattedMessage
                                        id="Portfolio.Type"
                                        defaultMessage="Type"
                                    />
                                </b>
                                {portafolio.portfolio_type}
                            </p>
                            <p>
                                <b>
                                    <FormattedMessage
                                        id="Portfolio.Description"
                                        defaultMessage="Description"
                                    />
                                </b> {portafolio.portfolio_description}
                            </p>
                        </div>
                        <div className="card-action">
                            <span onClick={() => this.toPortfolioProfile(portafolio)} className="waves-effect waves-teal btn-flat black-text"><b><FormattedMessage id="Portfolios.Open" defaultMessage="Open"/></b></span>
                            <span onClick={() => this.compartirURL(portafolio.portfolio_url)} className="waves-effect waves-teal btn-flat black-text"><b><FormattedMessage id="Portfolios.Share" defaultMessage="Share"/></b> </span>
                        </div>
                    </div>
                </div>
            )
        })

        return (

            <div>
                {
                    this.state.portfolioActivo == null ?
                        <div className="container">
                            <center><h5>
                                <FormattedMessage
                                    id="Portfolios.Title"
                                    defaultMessage="Portfolios"
                                />
                            </h5></center>
                            <br></br>
                            <div className="row">
                                {portafolios}
                            </div>
                        </div>
                        :
                        <PortfolioProfile portfolio={this.state.portfolioActivo} salir={this.toPortfolioList} externo={true} />
                }

            </div>

        )
    }
}

export default PortfolioList;