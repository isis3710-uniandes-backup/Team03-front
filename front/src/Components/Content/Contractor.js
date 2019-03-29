import React, { Component } from 'react';

class Contractor extends Component {
    render() {
        const { contractor } = this.props;
        return (
            <div className='contractor'>
                <h3>{contractor.contractor_name}</h3>
                <p>{contractor.contractor_email}</p>
                <p>{contractor.contractor_login}</p>
                <p>{contractor.contractor_password}</p>
            </div>
            //INCLUDE CREDITCARDS, OFFER AND CONTRACTS
        )
    }
}

export default Contractor