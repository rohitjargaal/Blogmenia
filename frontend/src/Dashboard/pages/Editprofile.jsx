import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Backendapi } from '../../Api'
import { useNavigate } from 'react-router';



const Editprofile = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [image, setimage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate()

 const token = localStorage.getItem("tokenkey")
 
  useEffect(() => {
     if (!token) {
       navigate("/login")
       toast.error("Please login")
     }
   }, [])
  useEffect(() => {
    axios.get(`${Backendapi}/users/navbardata`,  {
     headers: { Authorization: `Bearer ${token}`}})
      .then((res) => {
        console.log(res)
        setusername(res.data.userdetail.username)
        setemail(res.data.userdetail.email)
        setImageUrl(res.data.userdetail.userDP?.url || '')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function updateprofile(e) {
    e.preventDefault()
    const formdata = new FormData();
    formdata.append("username", username)
    formdata.append("email", email)
    if (image) {
      formdata.append("image", image);
    }
    axios.put(`${Backendapi}/users/updateuser`, formdata,  {
     headers: { Authorization: `Bearer ${token}`}})
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          navigate("/dashboard")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="editprofile">
      <form onSubmit={updateprofile}>
        <h1 style={{textAlign:"center"}}>Edit Profile</h1>
        <div className="input-container">
          <label >Username</label>
          <input type="text" value={username} onChange={(e) => { setusername(e.target.value) }} required />
        </div>
        <div className="input-container">
          <label >Email</label>
          <input type="text" value={email} onChange={(e) => { setemail(e.target.value) }} required />
        </div>
        <div className="input-container">
          <label >User Image</label><br></br>
          <>{imageUrl && (<img src={imageUrl} style={{width:'100%',height:"50vh",objectFit:"cover",marginBottom:"1rem",borderRadius:"10px",margin:"2rem auto",}}/>)}</>
          <input type="file" onChange={(e) => { setimage(e.target.files[0]) }} />
        </div>
        <button className=' btnclass'>Update</button>
      </form>
    </div>
  )
}

export default Editprofile
