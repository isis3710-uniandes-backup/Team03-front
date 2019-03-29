import React, { Component } from 'react';
import Contract from '../Content/Contract'

class Services extends Component {
    render() {
        const  { contracts } = this.props
        if(contracts.length === 0) {
            return (
                <div className='services'>
                    <p>You have no contracts yet.</p>
                </div>
            );
        }
        else {
            return (
                <div className='services'>
                    {contracts.map(contract => {
                        return (
                            <Contract contract={contract}/>
                        );
                    })}
                </div>
            );
        }
    }
}

export default Services