import React, { useState } from 'react'
import Cookies from "js-cookie"
import { Link, useNavigate } from 'react-router'

function Navbar() {

    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    function logouthandle() {
        const cookie = localStorage.removeItem("tokenkey")
        if (!cookie) {
            navigate("/login")
        }
    }

    function handleNavigation(path) {
        navigate(path);
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        <div className="navbar">
            <a href="/">Blog Menia</a>
            <ul className={`nav-list ${isMenuOpen ? 'show' : ''}`}>
                <li>
                    <a href="/home" onClick={() => handleNavigation('/home')}>Home</a>
                </li>
                <li className="nav-dropdown">
                    <div className="title">select an option</div>
                    <ul className="nav-dropdown-menu">
                        <li>
                            <a href="/create" onClick={() => navigate('/create')}>Create new blog</a>
                        </li>
                        <li>
                            <a href="/myvlog" onClick={() => navigate('/myvlog')}>My Blog</a>
                        </li>
                        <li>
                            <a href="/dashboard" onClick={() => navigate('/dashboard')}>Dashboard</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="/about" onClick={() => handleNavigation('/about')}>About</a>
                </li>
                <li>
                    <a href="/contact" onClick={() => handleNavigation('/contact')}>Contact</a>
                </li>
                <li>
                    <button className='btnclass' style={{ margin: '0px' }} onClick={logouthandle}>logout</button>
                </li>
            </ul>
            {!isMenuOpen ? <i className="fa-solid fa-bars" onClick={toggleMenu}></i>
            :<i class="fa-solid fa-xmark" onClick={()=>setIsMenuOpen(false)}></i>}
        </div>
    )
}

export default Navbar
