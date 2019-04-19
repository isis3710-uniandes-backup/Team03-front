import React, { Component } from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl'
import { Parallax } from 'react-materialize';
class OfferProfile extends Component {

  constructor(props) {
    super(props);
    if (this.props.oferta != null) {
      this.state = {
        offer_name: this.props.oferta.offer_name,
        offer_banner: this.props.oferta.offer_banner,
        offer_terms: this.props.oferta.offer_terms,
        offer_begindate: this.props.oferta.offer_enddate,
        offer_enddate: this.props.oferta.offer_enddate,
        procesando: false
      }
    }
    else {
      this.state = {
        offer_name: '',
        offer_banner: '',
        offer_terms: '',
        offer_begindate: '',
        offer_enddate: '',
        procesando: false
      }
    }
  }

  render() {
    return (
      <div className="container">
        <center>
          <div>
            <a onClick={this.props.salir} className="waves-effect waves-light btn grey darken-3">Volver</a>
            <br></br>
            <br></br>
          </div>
        <Parallax imageSrc={"./files/images/banner/" + this.state.offer_banner} />
        <br></br>
        <h5><b>{this.state.offer_name}</b></h5>
        <br></br>
        <table>
          <tbody>
            <tr>
              <td><b>Descripcion</b></td>
              <td>{this.state.offer_description}</td>
            </tr>
            <tr>
              <td><b>Terminos</b></td>
              <td>{this.state.offer_terms}</td>
            </tr>
            <tr>
              <td><b>Fecha Inicio</b></td>
              <td><FormattedDate value={new Date(this.state.offer_begindate)} /></td>
            </tr>
            <tr>
              <td><b>Fecha Fin</b></td>
              <td><FormattedDate value={new Date(this.state.offer_enddate)} /></td>
            </tr>
          </tbody>
        </table>
        </center >
      </div >
    );
  }
}

export default OfferProfile;