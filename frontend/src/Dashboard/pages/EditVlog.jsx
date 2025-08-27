import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Backendapi } from '../../Api';
import { toast } from "react-toastify"
import Loader from '../../compnents/Loader';



function EditVlog() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("tokenkey")

    useEffect(() => {
        if (!token) {
            navigate("/login")
            toast.error("Please login")
        }
    }, [])

    // blog data get from backend

    useEffect(() => {
        axios.get(`${Backendapi}/vlogs/${id}`,  {
     headers: { Authorization: `Bearer ${token}`}})
            .then((res) => {
                const vlog = res.data.vlog;
                setTitle(vlog.title);
                setDescription(vlog.description);
                setLocation(vlog.location);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const updatehandle = (e) => {
        e.preventDefault();
        setIsLoading(true)
        axios.put(`${Backendapi}/vlogs/${id}`, { title, description, location },  {
     headers: { Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    navigate(`/vlogs/${id}`)
                    toast.success(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <>
        {isLoading && <Loader /> }
                <div className='editblog-page'>
            <form onSubmit={updatehandle}>
                <h1 style={{ textAlign: "center" }}>Edit vlog</h1>
                <div className="input-container">
                    <label >Title</label>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} required />
                </div>
                <div className="input-container">
                    <label>Descriptions</label>
                    <textarea style={{ fontSize: '1.1rem' }} rows="10" value={description} onChange={(e) => { setDescription(e.target.value) }} required></textarea>
                </div>
                <div className="input-container">
                    <label >Locations</label>
                    <input type="text" value={location} onChange={(e) => { setLocation(e.target.value) }} required />
                </div>

                <div className="input-container">
                    <button type="submit" className="btnclass w-100 p-2">Edit</button>
                </div>
            </form>
        </div>
        </>

    )
}

export default EditVlog
