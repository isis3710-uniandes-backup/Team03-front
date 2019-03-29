import React, { Component } from 'react';
import ApplyDialoge from'../Design/ApplyDialoge'
import Application from './Application';

class Offer extends Component {
    state = {show: false}
    showModal = () => {
        this.setState({show: true});
    }
    hideModal = () => {
        this.setState({show: false});
    }

    application = {
        application_comments: 'cosas',
        application_price: 1234,
    }

    render() {
        const { offer } = this.props;
        return (
            <div>
                <div className='offer'>
                    <h3>{offer.offer_name}</h3>
                    <p>{offer.offer_terms}</p>
                    <p>{offer.offer_banner}</p>
                    <p>{offer.offer_begindate}</p>
                    <p>{offer.offer_enddate}</p>
                    <button className='apply-button' onClick={this.showModal}>Apply</button>
                </div>
                <ApplyDialoge show={this.state.show} handleClose={this.hideModal}>
                    <Application application={this.application}/>
                </ApplyDialoge>
            </div>
            //INCLUDE CONTRACTOR
        )
    }
}

export default Offer