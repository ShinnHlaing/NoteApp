import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react';
import AuthContext from '../../Contex/AuthContext';
import MessageContext from '../../Contex/MessageContext';
import LabelContext from '../../Contex/LabelContext';
export default function Master(props) {
    const authUserContext = useContext(AuthContext)
    const messageContext = useContext(MessageContext)
    const navigate = useNavigate();
    const { setActiveLabel } = useContext(LabelContext)
    const logout = () => {
        console.log("logout");
        localStorage.removeItem("token");
        authUserContext.setAuthUser({})
        navigate('/login')
    }
    const renderHome = () => {
        setActiveLabel("");
        navigate("/")
    }
    return (
        <div className=''>
            <nav className="navbar navbar-expand-lg bg-black text-white">
                <div className="container-fluid text-white">
                    <a className="navbar-brand" href="#">Note</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white">
                            <li className="nav-item">
                                <span className="nav-link active text-white cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                    aria-current="page" onClick={renderHome}>Home</span>
                            </li>
                            {localStorage.getItem("token") ?
                                <>
                                    <li className="nav-item">
                                        <button className="btn btn-danger" onClick={logout}>Logout</button>
                                    </li>
                                </> :
                                <>
                                    <li className="nav-item ml-2">
                                        <Link className="btn btn-primary" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-outline-primary" to="/register">Register</Link>
                                    </li>
                                </>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
            {props.children}
        </div>
    )
}
