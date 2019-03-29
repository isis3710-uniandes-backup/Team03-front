import React, { Component } from 'react';

class Contract extends Component {
    render() {
        const { contract } = this.props;
        return (
            <div className='service'>
                <h3>{contract.contract_terms}</h3>
                <p>{contract.contract_comments}</p>
                <p>{contract.contract_begindate}</p>
                <p>{contract.contract_enddate}</p>
            </div>
            //INCLUDE CONTRACTORS AND SERVICES
        )
    }
}

export default Contract