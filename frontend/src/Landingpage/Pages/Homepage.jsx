import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Backendapi } from '../../Api'
import { toast } from 'react-toastify'

function Homepage() {
  const navigate = useNavigate()
  const [vlogs, setVlogs] = useState([])
  const token = localStorage.getItem("tokenkey")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      toast.error("Please login")
    }
  }, [])

  useEffect(() => {
    axios.get(`${Backendapi}/vlogs/all`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setVlogs(res.data.allVlog);
    }).catch((err) => {
      console.log("err", err)
    })
  }, [])



  return (
    <div className='homepage'>
      <div className="hero-section">
        <h1>Express Your thought with others</h1>
        <p>Nobody can you judge your thoughts and feeling please write something for express your thought and calm your mind with all stuffs </p>
      </div>
      <div className="blog-card-section">
        <h1>This is enhance your skills to elaborate you memories to someone</h1>
        <div className="card-group" >
          {vlogs.map((vlog) => (
            <a href={`/vlogs/${vlog._id}`} key={vlog._id} className='card-links'>
              <div className="card">
                <img src={vlog.image.url} className="card-image" />
                <div className="card-content">
                  <p>{vlog.title}</p>
                  <p>Location : {vlog.location}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Homepage
