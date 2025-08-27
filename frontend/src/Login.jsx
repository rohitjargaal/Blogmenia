import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Backendapi } from "./Api";
import { useNavigate } from "react-router";


function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [issumbit, setisSubmit] = useState(false)

  const navigate = useNavigate()

  function Loginhandle(e) {
    e.preventDefault();
    setisSubmit(true)
    axios.post(`${Backendapi}/users/login`, { email, password })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("tokenkey",res.data.token)
          navigate("/home");
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  }
  return (
    <div className="loginpage">
      <img src="/media/images/login.png" alt="" />
      <form onSubmit={Loginhandle}>
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Login In Blogmenia</h1>
        <div className="input-container">
          <label >Email</label>
          <input type="text" onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <a href="/signup" style={{ margin: "0px" }}>Don't have account ? Create a Account</a>
        <div className="buttonclass">
          <button className="btnclass">
            {
              issumbit ?
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  &nbsp; logging in
                </>
                : "Log in"
            }
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
