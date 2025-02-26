import React from 'react'
import Master from '../Layout/Master'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ax from '../../ax'
import AuthContext from '../../Contex/AuthContext'
import MessageContext from '../../Contex/MessageContext'


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({});
    const authUserContext = useContext(AuthContext);
    const messageContext = useContext(MessageContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            messageContext.setMessage({
                type: "error",
                message: "You are already logged in"
            })
            navigate("/")
        }
    }, [])

    const login = () => {
        setLoader(true)
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        ax.post("/login", formData).then((res) => {
            setLoader(false)
            const { token, user } = res.data.data;
            if (!res.data.success) {
                setError(res.data.data)
                console.log(res.data.data);
            } else {
                localStorage.setItem("token", token)
                authUserContext.setAuthUser(user)
                messageContext.setMessage({
                    type: 'success',
                    message: `Welcome Back ${user.name}`
                })
                navigate('/')
            }
        })
    }

    return (
        <Master>
            <div className='container card mt-5 p-2' style={{ width: 25 + "rem" }}>
                <div className='card-title text-center '>
                    Login
                </div>
                <div className='card-body'>
                    <div className="form-floating mb-3">
                        <input type="email" onChange={e => setEmail(e.target.value)} className={`form-control ${error.email && "border border-danger"}`} placeholder="name@example.com" />
                        {error.email && error.email.map((err, index) => <small key={index} className='text text-danger'>{err}</small>)}
                        <label className="form-label">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" onChange={e => setPassword(e.target.value)} className={`form-control ${error.password && "border border-danger"}`} placeholder="Enter Password" />
                        {error.password && error.password.map((err, index) => <small key={index} className='text text-danger'>{err}</small>)}
                        <label className="form-label">Password</label>
                    </div>
                    <div className='text-center'>
                        <button value="login" className="btn btn-warning" onClick={login}>
                            {loader && <>
                                <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </>}
                            Login</button>
                    </div>
                </div>
            </div>
        </Master>
    )
}
