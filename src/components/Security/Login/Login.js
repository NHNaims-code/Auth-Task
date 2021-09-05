import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { UserContext } from '../../../App';
import './Login.css';

export default function Login() {

    // Access context api
    const [userInfo, setUserInfo] = useContext(UserContext);

    // useState Hooks
    const [formType, setFormType] = useState('login');
    const [formInfo, setFormInfo] = useState({});

    const [status, setStatus] = useState('User')

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    // Function handle
    const handleStatus = (event) => {
        setStatus(event.target.value)
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            if(formType === 'signup'){
                await fetch('http://localhost:5000/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify({...formInfo, status: status})
                }).then(res => res.json())
                .then(result => {
                    if(result.err){
                        toast.error(result.err);
                    }else{
                        toast.success(result.msg);
                        setFormType('login')
                    }
                })
            }else {
                // handle login
                console.log('login')
                await fetch('http://localhost:5000/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify(formInfo)
                }).then(res => res.json())
                .then(result => {
                    if(result.err){
                        toast.error(result.err)
                    }else{
                        toast.success(result.msg);
                        setUserInfo(result.data)
                        // store token on cookies
                        const cookies = new Cookies();
                        cookies.set('token', result.access_token)
                        setFormInfo({})
                        console.log(result.data)
                        history.replace(from);

                    }
                })
            }
        } catch {
            toast.warning('Something went wrong!')
        }

    }

    const handleBlur = (event) => {
        const newFormInfo = formInfo;
        newFormInfo[event.target.name] = event.target.value;
        setFormInfo(newFormInfo);
    }

    return (
        <div className="login d-flex flex-column justify-content-center align-items-center">
            <form className="login-form p-4" onSubmit={handleSubmit}>
                {
                    formType === 'login' ? <h4 className="text-center pb-4">Welcome to Login</h4>:
                    <h4 className="text-center pb-4">Create an Account</h4>
                }
                {
                    formType === 'signup' &&
                    <div class="mb-3">
                    <label for="signUpUsername" class="form-label">Username</label>
                    <input type="text" onBlur={handleBlur} name="username" class="form-control" id="signUpUsername" placeholder="Username" required/>
                    </div>
                }
                <div class="mb-3">
                <label for="loginEmail" class="form-label">Email</label>
                <input type="email" onBlur={handleBlur} name="email" class="form-control" id="loginEmail" placeholder="name@example.com" required/>
                </div>
                <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input type="password" onBlur={handleBlur} name="password" class="form-control" id="loginPassword" placeholder="123456" required/>
                </div>
                {
                    formType === "signup" &&
                    <div>
                    <label for="status" className="form-label">Status</label>
                    <select onChange={handleStatus} id="status" className="form-control mb-3">
                        <option value="User">User</option>
                        <option value="Driver">Driver</option>
                        <option value="Admin">Admin</option>
                    </select>
                    </div>
                }
                {
                    formType === 'login' ? 
                    <button type="submit" className="btn btn-primary w-100">Login</button> 
                    :
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                }
            </form>
            {
                formType === 'login' ? <p className="text-center mt-4">Create an account? <span onClick={()=> {setFormType('signup'); setFormInfo({})}}><u className="cursor-pointer">Sign up</u></span></p> :
                <p className="text-center mt-4">Allready have account? <span onClick={()=> {setFormType('login'); setFormInfo({})}}><u className="cursor-pointer">Login</u></span></p>
            }
        </div>
    )
}
