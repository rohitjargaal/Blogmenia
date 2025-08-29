import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { Backendapi } from "./Api";
import Loader from "./compnents/Loader.jsx";

function Signup() {
  let navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [image, setimage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formdata = new FormData();
  formdata.append("username", username)
  formdata.append("email", email)
  formdata.append("password", password)
  formdata.append("image", image)


  function Signuphandle(e) {
    e.preventDefault();
    setIsLoading(true)
    axios.post(`${Backendapi}/users/register`, formdata, { withCredentials: true }, { headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          toast.success("User Create Successfully");
          navigate("/login")
        } else {
          toast.error("user exists")
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }


  return (
    <>
      {isLoading ? <Loader /> :
        (
          <div className="signuppage">
            <img src="/media/images/login.png" alt="" />
            <form onSubmit={Signuphandle}>
              <h1 style={{ textAlign: "center" }}>Create a Account On Blogmenia</h1>
              <div className="input-container">
                <label>Username</label>
                <input type="text" onChange={(e) => { setUsername(e.target.value) }} />
              </div>
              <div className="input-container">
                <label> Email address</label>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className="input-container">
                <label> Password </label>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              <div className="input-container">
                <label> User Image </label>
                <input type="file" onChange={(e) => { setimage(e.target.files[0]) }} />
              </div>
              <a href="/login" className="btn-link" style={{ textDecoration: "none" }}>Already a user</a>
              <div className="buttonclass">
                <button className="btnclass">Signup</button>
              </div>
            </form>
          </div>
        )
      }
    </>

  );
}

export default Signup;