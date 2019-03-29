import React, { Component } from 'react';

class Application extends Component {
    render() {
        const { application } = this.props;
        return (
            <div className='application'>
                <h3>{application.application_comments}</h3>
                <p>{application.application_price}</p>
            </div>
            //INCLUDE USERS
        )
    }
}

export default Application