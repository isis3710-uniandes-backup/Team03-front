import React, { Component } from 'react';

class Service extends Component {
    render() {
        const { service } = this.props;
        return (
            <div className='service'>
                <h3>{service.service_name}</h3>
                <p>{service.description}</p>
                <p>{service.service_url}</p>
                <p>{service.service_price}</p>
            </div>
            //INCLUDE USER AND CONTRACT
        )
    }
}

export default Service