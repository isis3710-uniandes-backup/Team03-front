import React, { Component } from 'react';
import Portfolio from '../Content/Portfolio';
import Application from '../Content/Application';
class Profile extends Component {
    
    applications = [
        {
            application_comments: 'application_comments',
            application_price: 'application_price'
        },
        {
            application_comments: 'application_comments',
            application_price: 'application_price'
        },
        {
            application_comments: 'application_comments',
            application_price: 'application_price'
        },
        {
            application_comments: 'application_comments',
            application_price: 'application_price'
        },
        
    ]

    render() {
        const { profile, portfolios, applications, contracts } = this.props;
        if(!contracts) {
            return(
                <div className='profile'>
                <h1>For profile picture later on.</h1>
                    <div className='user-info'>
                        <p>{profile.user_names}</p>
                        <p>{profile.user_lastname}</p>
                        <p>{profile.user_email}</p>
                        <p>{profile.user_login}</p>
                        <p>{profile.user_birthdate}</p>
                    </div>
                    <div className='user-work'>
                        <div className = 'user-portfolio'>
                        <h2>Portfolio</h2>
                        {portfolios.map( portfolio => {
                            return (
                                <Portfolio portfolio={portfolio}/>
                            );
                        })}
                        </div>
                        <div className = 'user-applications'>
                        <h2>Applications</h2>
                            {applications.map((application)=> {
                                return (<Application 
                                application={application}
                                />)
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className='profile'>
                <h1>For profile picture later on.</h1>
                    <div className='user-info'>
                        <p>{profile.contractor_name}</p>
                        <p>{profile.contractor_lastname}</p>
                        <p>{profile.contractor_email}</p>
                        <p>{profile.contractor_login}</p>
                    </div>
                    <div className='user-work'>
                        No work here.
                    </div>
                </div>
            );
        }
    }
}

export default Profile