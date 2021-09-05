import React, { useContext } from 'react';
import { UserContext } from '../../../App';

export default function Header() {

    const [userInfo, setUserInfo] = useContext(UserContext);

    // handle logout
    const handleLogout = () => {
        setUserInfo({})
    }

    return (
        <div className="border-bottom pb-2">
            <div className="d-flex justify-content-between align-items-center">
            <h4>{userInfo.status.toUpperCase()}</h4>
            <p>{userInfo.username}</p>
            <button onClick={handleLogout} className="btn btn-sm btn-danger">Logout</button>
            </div>
        </div>
    )
}
