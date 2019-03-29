import React, { Component } from 'react'

export default class ContratadorDetail extends Component {
  render() {
    return (
      <div>
        {this.props.detailContratador.contractor_email}
      </div>
    )
  }
}
