import React, { Component } from 'react'

export default class ContratadorDetail extends Component {
  render() {
    return (
      <div>
        <h3>Información</h3>
        <div className="divider"></div>
        <div className="section">
            <h5>Nombre</h5>
            <p>{this.props.detailContratador.contractor_name}</p>
        </div>
        <div className="divider"></div>
        <div className="section">
            <h5>Email</h5>
            <p>{this.props.detailContratador.contractor_email}</p>
        </div>  
        
      </div>
    )
  }
}
