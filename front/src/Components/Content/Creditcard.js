import React, { Component } from 'react';

class Creditcard extends Component {
    render() {
        const { creditcard } = this.props;
        return (
            <div className='creditcard'>
                <h3>{creditcard.creditcard_name}</h3>
                <p>{creditcard.creditcard_number}</p>
                <p>{creditcard.creditcard_expirationdate}</p>
            </div>
            //INCLUDE CONTRACTOR
        )
    }
}

export default Creditcard