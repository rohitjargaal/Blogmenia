import React, { useState } from 'react'
import Cookies from "js-cookie"
import { Link, useNavigate } from 'react-router'

function Navbar() {

    const navigate = useNavigate()

    function logouthandle() {
        const cookie = localStorage.removeItem("tokenkey")
        if (!cookie) {
            navigate("/login")
        }
    }
    function handleNavigation(e) {
        const value = e.target.value;
        if (value) {
            navigate(value);
        }
    }

    return (
        <div className="navbar">
            <a href="/">Blog Menia</a>
            <ul className="nav-list">
                <li>
                    <a href="/home">Home</a>
                </li>
                <li className="nav-dropdown">
                    <div className="nav-dropdown-title">
                        Select an option
                    </div>
                    <ul className="nav-dropdown-menu">
                        <li>
                            <Link to="/create">Create new blog</Link>
                        </li>
                        <li>
                            <Link to="/myvlog">My Blog</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
                <li>
                    <button className='btnclass' style={{ margin: '0px' }} onClick={logouthandle}>logout</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
