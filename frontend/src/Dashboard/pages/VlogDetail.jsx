import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Backendapi } from '../../Api';


function VlogDetail() {
  const { id } = useParams();
  const [vlog, setVlog] = useState({});
  const [author, setauthor] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const token = localStorage.getItem("tokenkey")


  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/login")
      toast.error("Please login")
    }
  }, [])


  useEffect(() => {
    axios.get(`${Backendapi}/vlogs/${id}`,  {
     headers: { Authorization: `Bearer ${token}`}})
      .then((res) => {
        console.log(res);
        setVlog(res.data.vlog);
        setauthor(res.data.vlog.author.username)
        setLoggedInUserId(res.data.userid)
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const isAuthor = vlog.author && loggedInUserId === vlog.author._id;


  const handleDelete = () => {
    axios.delete(`${Backendapi}/vlogs/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if(res.data.success){
          navigate(`/vlogs`);
          toast.error(res.data.message)
        }
      })
      .catch((error) => {
        console.log('Delete error', error);
        toast.error(error.response.data.message)
      });
  };
  const handleEdit = () => {
    navigate(`/vlogs/${id}/edit`);
  };

  return (
    <div className="detailBlog-page">
      <div className="content">
        <div className="left">
          <img src={vlog.image?.url} alt="image error" />
        </div>
        <div className="right">
          <h1>{vlog.title}</h1>
          <p><b>Description:</b> {vlog.description}</p>
          <p><b>Location:</b> {vlog.location}</p>
          <p><b>Author:</b> {author} </p>
          {isAuthor ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: '20px' }}>
              <button className='btnclass' onClick={handleEdit}>Edit</button>
              <button className='btnclass' style={{ backgroundColor: "black" }} onClick={handleDelete}>Delete</button>
            </div>
          ) : null}
        </div>
      </div>

    </div>
  );
}

export default VlogDetail;