import React, { Component } from 'react';
import Service from '../Content/Service'

class Services extends Component {
    render() {
        const  { services } = this.props
        if(services.length === 0) {
            return (
                <div className='services'>
                    <p>You have no services yet.</p>
                </div>
            );
        }
        else {
            return (
                <div className='services'>
                    {services.map(service => {
                        return (
                            <Service service={service}/>
                        );
                    })}
                </div>
            );
        }
    }
}

export default Services