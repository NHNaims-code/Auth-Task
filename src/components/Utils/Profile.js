import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { UserContext } from '../../App';
import './Profile.css';

export default function Profile() {

    const [userInfo, setUserInfo, singleClient] = useContext(UserContext);

    // useState hooks
    const [status, setStatus] = useState("User");
    const [profileInfo, setProfileInfo] = useState({});
    const [profileImage, setProfileImage] = useState({});
    const [previewImageSource, setPreviewImageSource] = useState("")

    const history = useHistory();

    useEffect(()=> {
        if(singleClient){
            setProfileInfo(singleClient)
        }
    }, [])

    const handleStatus = (event) => {
        setStatus(event.target.value);
    }

    const handleBlur = (event) => {
        const newProfileInfo = profileInfo;
        newProfileInfo[event.target.name] = event.target.value;
        setProfileInfo(newProfileInfo);
    }



    const handleSubmit =(event) => {
        event.preventDefault();
        const cookies = new Cookies();
        const newProfileInfo = {...profileInfo, status: status};
        console.log(newProfileInfo)
    
        if(singleClient){
            fetch("http://localhost:5000/client/update", {
                method: 'PATCH',
                headers: {
                    'authorization': `Bearer ${cookies.get('access_token')}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newProfileInfo)
            }).then(res => res.json())
            .then(result => {
                if(result.err){
                    toast.error(result.err)
                }else{
                    toast.success(result.msg)
                }
            })
        }else{
            fetch("http://localhost:5000/client/insert", {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${cookies.get('access_token')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newProfileInfo)
            }).then(res => res.json())
            .then(result => {
                if(result.err){
                    toast.error(result.err)
                }else{
                    history.push('/')
                    toast.success(result.msg)
                }
            })
        }
    }

    return (
        <div className="profile my-4">
            <form onSubmit={handleSubmit}>
                {
                    singleClient ? <h4>Update Client - {singleClient.name}</h4> : <h4>Create New Client</h4>
                }
                <div class="mb-3">
                <label for="Name" class="form-label">Name</label>
                <input defaultValue={singleClient && singleClient.name} type="text" onBlur={handleBlur} name="name" class="form-control" id="Name" placeholder="Username" required/>
                </div>
                <div class="mb-3">
                <label for="Phone" class="form-label">Phone</label>
                <input type="number" defaultValue={singleClient && singleClient.phone} onBlur={handleBlur} name="phone" class="form-control" id="Phone" placeholder="Phone" required/>
                </div>
                <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" defaultValue={singleClient && singleClient.email} onBlur={handleBlur} name="email" class="form-control" id="email" placeholder="Email" required/>
                </div>
                <div class="mb-3">
                <label for="nid" class="form-label">NID</label>
                <input type="number" defaultValue={singleClient && singleClient.nid} onBlur={handleBlur} name="nid" class="form-control" id="nid" placeholder="NID" required/>
                </div>
                <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select className="form-control" id="status" onChange={handleStatus}>
                    <option selected = {singleClient && singleClient.status.toLowerCase() === 'user' && true} value="User">User</option>
                    <option selected = {singleClient && singleClient.status.toLowerCase() === 'driver' && true} value="Driver">Driver</option>
                    <option selected = {singleClient && singleClient.status.toLowerCase() === 'admin' && true} value="Admin">Admin</option>
                </select>
                </div>
                {
                    status === 'Driver' &&
                    <div class="mb-3">
                    <label for="drivingLicence" class="form-label">Driving Licence</label>
                    <input type="text" defaultValue={singleClient && singleClient.driving_licence} onBlur={handleBlur} name="driving_licence" class="form-control" id="drivingLicence" placeholder="Driving Licence" required/>
                    </div>
                }
                <div class="mb-3">
                <label for="location" class="form-label">Location</label>
                <input type="text" defaultValue={singleClient && singleClient.location} onBlur={handleBlur} name="location" class="form-control" id="location" placeholder="Location" required/>
                </div>
                {
                    singleClient ? <button className="btn btn-primary w-100">Update</button> :
                    <button className="btn btn-primary w-100">Submit</button>
                }
            </form>
        </div>
    )
}
