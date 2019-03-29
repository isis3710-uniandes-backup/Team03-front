import React, { Component } from 'react';

class Entry extends Component {
    render() {
        const { entry } = this.props;
        return (
            <div className='entry'>
                <h3>{entry.entry_name}</h3>
                <p>{entry.entry_description}</p>
                <p>{entry.entry_url}</p>
                <p>{entry.entry_hashtags}</p>
            </div>
            //INCLUDE APPLICATIONS
        )
    }
}

export default Entry