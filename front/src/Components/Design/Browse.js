import React, { Component } from 'react';
import Offer from '../Content/Offer'

class Browse extends Component {

    render() {
        const  { offers } = this.props
        return (
            <div className='browse'>
                {offers.map(offer => {
                    return (
                        <Offer offer={offer}/>
                    );
                })}
            </div>
        );
    }
}

export default Browse