import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../../App';
import Header from '../../Shared/Header/Header';
import './Home.css';

export default function Home() {

    const [userInfo, setUserInfo, singleClient, setSingleClient] = useContext(UserContext);
    const [clients, setClients] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)

    const history = useHistory()

    useEffect(() => {
        fetch('http://localhost:5000/client').then(res => res.json())
        .then(result => {
            setClients(result);
            setLoading(false)
        })

        setSingleClient(false)
    }, [refresh])

    const handleEdit = (client) => {
        setSingleClient(client);
        history.push('/profile')
    }
    const handleView = (client) => {
        setSingleClient(client);
        console.log(client)
        history.push('/view-profile')
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/client/delete/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
        .then(result => {
            if(result.err){
                toast.error(result.err)
            }else{
                setRefresh(!refresh)
                toast.success(result.msg)
            }
        })
    }
    return (
        <div className="home mt-2">
            <div className="home-inner">
                <Header/>
                <div className="d-flex justify-content-between mt-4">
                    <h6>All User list</h6>
                    <Link to="profile">
                        <button className="btn btn-sm btn-primary mb-2">Add new user</button>
                    </Link>
                </div>
                <table className="w-100">
                    <tr className="table-header  border-bottom">
                        <th className="ps-2 py-2">Index</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {
                        clients.map((c, i) => (
                            <tr className="w-100">
                            <td className="ps-1 py-2">{i+1}</td>
                            <td>{c.name}</td>
                            <td>{c.status}</td>
                            <td style={{width: '160px'}}>
                            {
                                userInfo.status.toLowerCase() === 'admin' && 
                                <><span onClick={()=> handleView(c)} className="badge bg-info me-1 cursor-pointer">View</span> <span onClick={() => handleEdit(c)} className="badge bg-warning me-1 cursor-pointer">Edit</span> <span onClick={()=> handleDelete(c._id)} className="badge bg-danger cursor-pointer">Delete</span></>
                            }
                            {
                                userInfo.status.toLowerCase() === 'driver' && 
                                <><span onClick={()=> handleView(c)}  className="badge bg-info me-1 cursor-pointer">View</span> <span onClick={() => handleEdit(c)} className="badge bg-warning me-1 cursor-pointer">Edit</span></>
                            }
                            {
                                userInfo.status.toLowerCase() === 'user' && 
                                <><span onClick={()=> handleView(c)} className="badge bg-info me-1 cursor-pointer">View</span> </>
                            }
                            </td>
                        </tr>
                        ))
                    }
                </table>
                {
                    loading && <p className="text-center p-2">Loading...</p>
                }
            </div>
        </div>
    )
}
