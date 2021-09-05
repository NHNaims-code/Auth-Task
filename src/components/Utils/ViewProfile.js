import React, { useContext } from 'react';
import { UserContext } from '../../App';
import './ViewProfile.css';

export default function ViewProfile() {
    
    const [userInfo, setUserInfo, singleClient] = useContext(UserContext);
    return (
        <div className="profile-view">
            <div className="profile-view-inner">
                <p>Name: <b>{singleClient.name}</b></p>
                <p>Phone: <b>{singleClient.phone}</b></p>
                <p>Email: <b>{singleClient.email}</b></p>
                <p>Status: <b>{singleClient.status}</b></p>
                {
                    userInfo.status.toLowerCase() === 'driver' &&
                    <p>Driving Licence: <b>{singleClient.driving_licence}</b></p>
                }
                <p>Location: <b>{singleClient.location}</b></p>
            </div>
        </div>
    )
}
