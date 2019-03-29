import React, { Component } from 'react';

class Portfolio extends Component {
    render() {
        const { portfolio } = this.props;
        return (
            <div className='portfolio'>
                <h3>{portfolio.portfolio_name}</h3>
                <p>{portfolio.portfolio_type}</p>
                <p>{portfolio.portfolio_description}</p>
                <p>{portfolio.portfolio_url}</p>
                <p>{portfolio.portfolio_banner}</p>
            </div>
            //INCLUDE USER AND ENTRIES
        )
    }
}

export default Portfolio