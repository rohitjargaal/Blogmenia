import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Backendapi } from "../../Api.jsx"
import { toast } from "react-toastify";
import Loader from "../../compnents/Loader.jsx";

function Addnewvlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setimage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const naviagte = useNavigate()

  const token = localStorage.getItem("tokenkey")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      toast.error("Please login")
    }
  }, [])

  async function addnewvloghandle(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    if (image) {
      formData.append("image", image);
    }

    axios
      .post(
        `${Backendapi}/vlogs`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" , "Authorization": `Bearer ${token}`} })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message)
          naviagte("/home")
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("this is addnewerror ", error);
      });
  }

  return (
     <>
    {isLoading ? (
      <Loader />
    ) : (
      <div className="newblog">
        <form onSubmit={addnewvloghandle}>
          <h1 style={{ textAlign: "center" }}>Create new vlog</h1>
          <div className="input-container" >
            <label >Title</label>
            <input type="text" placeholder="Enter title" value={title} onChange={(e) => { setTitle(e.target.value) }} required />
          </div>
          <div className="input-container" >
            <label >Descriptions</label>
            <textarea rows="10" value={description} onChange={(e) => { setDescription(e.target.value) }} required></textarea>
          </div>
          <div className="input-container" >
            <label >Locations</label>
            <input type="text" placeholder="Enter the location" value={location} onChange={(e) => { setLocation(e.target.value) }} required />
          </div>
          <div className="input-container" >
            <label >Image</label>
            <input type="file" onChange={(e) => { setimage(e.target.files[0]) }} required />
          </div>
          <button type="submit" className="btnclass">
            Create
          </button>
        </form>
      </div>
    )}
  </>

  );
}

export default Addnewvlog;
