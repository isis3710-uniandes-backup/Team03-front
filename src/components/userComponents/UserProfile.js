import React, { Component } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idLogged: this.props.idLogged,
      user: {},
      portfolios: [],
      services: []
    }
    fetch('/api/user/' + this.state.idLogged).then(res => res.json()).then(data => {
      data.user_birthdate=data.user_birthdate.split('T')[0];
      if (data.Portfolios == null) {
        this.setState({
          user: data
        });
      }
      else {
     
        this.setState({
          user: data,
          portfolios: data.Portfolios
        });
      }
    });
  }

  componentDidMount() {
    document.dispatchEvent(new Event('component'));
  }

  render() {
    return (

      <div className="container">
        <center>
          <h5>
            <FormattedMessage
              id="Profile.Title"
              defaultMessage="My Profile"
            />
          </h5>
        </center>
        <br></br>
        <div className="container">
          <table>
            <tbody>
              <tr>
                <td>
                  <b>
                    <FormattedMessage
                      id="Profile.NameLabels"
                      defaultMessage="Names"
                    />
                  </b>
                </td>
                <td>{this.state.user.user_names}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <FormattedMessage
                      id="Profile.LastNameLabels"
                      defaultMessage="Last Names"
                    />
                  </b>
                </td>
                <td>{this.state.user.user_lastnames}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <FormattedMessage
                      id="Profile.EmailLabel"
                      defaultMessage="Email"
                    />
                  </b>
                </td>
                <td>{this.state.user.user_email}</td>
              </tr>
              <tr>
                <td>
                  <b><FormattedMessage
                    id="Profile.PortfolioNumberLabel"
                    defaultMessage="# of Portfolios"
                  />
                  </b>
                </td>
                <td>{this.state.portfolios.length}</td>
              </tr>
              <tr>
                <td>
                  <b>
                    <FormattedMessage
                      id="Profile.BirthdateLabel"
                      defaultMessage="Birthdate"
                    />
                  </b>
                </td>
                <td><FormattedDate value={new Date(this.state.user.user_birthdate)} year='numeric'	month='long' day='numeric'/> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default UserProfile;