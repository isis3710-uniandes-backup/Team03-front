import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'
import EntryList from './EntryList';
import { Parallax } from 'react-materialize';
class PortfolioProfile extends Component {

  constructor(props) {
    super(props);
    if (this.props.portfolio != null) {
      this.state = {
        id: this.props.portfolio.id,
        portfolio_name: this.props.portfolio.portfolio_name,
        portfolio_banner: this.props.portfolio.portfolio_banner,
        portfolio_url: this.props.portfolio.portfolio_url,
        portfolio_type: this.props.portfolio.portfolio_type,
        portfolio_description: this.props.portfolio.portfolio_description,
        entries: this.props.portfolio.Entries,
        procesando: false,
        externo: this.props.externo
      }
    }
    else {
      this.state = {
        id: '',
        portfolio_name: '',
        portfolio_banner: '',
        portfolio_url: '',
        portfolio_type: '',
        portfolio_description: '',
        entries: [],
        procesando: false,
        externo: this.props.externo
      }
    }
  }

  render() {
    return (
      <div className="container">
        <center>
          <div>
            <span onClick={this.props.salir} className="waves-effect waves-light btn grey darken-3"><FormattedMessage id="Portfolios.Back" defaultMessage="Back"/></span>
            <br></br>
            <br></br>
          </div>
          <Parallax imageSrc={"./files/images/banner/" + this.state.portfolio_banner} />
          <br></br>
          <h5><b>{this.state.portfolio_name}</b></h5>
          <br></br>
          <table>
            <tbody>
              <tr>
                <td>
                  <b><FormattedMessage id="Portfolio.Type" defaultMessage="Type"/></b>
                </td>
                <td>{this.state.portfolio_type}</td>
              </tr>
              <tr></tr>
              <tr>
                <td>
                  <b>
                    <FormattedMessage
                      id="Portfolio.Description"
                      defaultMessage="Description"
                    />
                  </b>
                </td>
                <td> {this.state.portfolio_description}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <FormattedMessage
                      id="Portfolio.Entries"
                      defaultMessage="# of Entries"
                    />
                  </b>
                </td>
                <td> {this.state.entries.length}</td>
              </tr>
            </tbody>
          </table>
          <EntryList messages={this.state.messages} PortfolioId={this.state.id} externo={this.state.externo} />
        </center >
      </div >
    );
  }
}

export default PortfolioProfile;