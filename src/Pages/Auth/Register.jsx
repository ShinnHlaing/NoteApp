import React, { useState, useContext, useEffect } from 'react'
import Master from '../Layout/Master'
import ax from '../../ax'
import AuthContext from '../../Contex/AuthContext'
import { useNavigate } from "react-router-dom"
import MessageContext from '../../Contex/MessageContext'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const authUserContext = useContext(AuthContext)
    const messageContext = useContext(MessageContext)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            messageContext.setMessage({
                type: "error",
                message: "You are already logged in"
            })
            navigate("/")
        }
    }, [])

    const register = () => {
        setLoader(true)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        ax.post("/register", formData)
            .then((res) => {
                setLoader(false)
                const { success, data } = res.data;
                if (!success) {
                    setError(data)
                } else {
                    localStorage.setItem("token", data.token)
                    authUserContext.setAuthUser(data.user)
                    messageContext.setMessage({
                        type: 'success',
                        message: `Welcome ${data.user.name}`
                    })
                    navigate("/")
                }
            })
    }
    return (
        <Master>
            <div className='container card mt-5' style={{ width: 25 + "rem", padding: 1 + "rem" }}>
                <div className='card-title text-center '>
                    Register
                </div>
                <div className='card-body'>
                    <div className="form-floating  mb-3">
                        <input type="text" onChange={(e) => setName(e.target.value)} className={`form-control ${error.name && "border border-danger"}`} placeholder="Enter Name" />
                        {error.name && error.name.map((err, index) => <small key={index} className='text text-danger'>{err}</small>)}
                        <label className="form-label">User Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className={`form-control ${error.email && "border border-danger"}`} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                        {error.email && error.email.map((err, index) => <small key={index} className='text text-danger'>{err}</small>)}
                        <label className="form-label">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className={`form-control ${error.password && "border border-danger"}`} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                        {error.password && error.password.map((err, index) => <small key={index} className='text text-danger'>{err}</small>)}
                        <label className="form-label">Password</label>
                    </div>
                    <div className='text-center'>
                        <button className="btn btn-warning" value="register" type='submit' onClick={register} disabled={loader}>
                            {loader && <>
                                <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </>}
                            Register</button>
                    </div>
                </div>
            </div>
        </Master>
    )
}
