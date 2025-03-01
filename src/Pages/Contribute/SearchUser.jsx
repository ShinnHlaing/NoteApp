import React from 'react'
import Master from '../Layout/Master'
import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../Components/Spinner'
import ax from '../../ax'
import MessageContext from '../../Contex/MessageContext'

const SearchUser = () => {
    const [email, setEmail] = useState('')
    const [loader, setLoader] = useState(false)
    const [foundUser, setFoundUser] = useState(false)
    const { setMessage } = useContext(MessageContext)
    const { slug } = useParams();
    const findUser = () => {
        setLoader(true)
        ax.post("/search/user", { email }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(({ data }) => {
            setLoader(false)
            if (data.success) {
                setFoundUser(data.data)
                setMessage({
                    type: "success",
                    message: "User found!"
                })
            } else {
                setFoundUser(false)
                setMessage({ type: "error", message: "User not found!" })
            }
        })
    }
    const contribute = () => {
        setLoader(true)
        const token = localStorage.getItem("token")
        ax.post("/contribute-note/create", { note_slug: slug, user_email: foundUser.email }, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            console.log(data);

            setLoader(false)
            if (data.data === "your_own_note") {
                setFoundUser(false)
                setMessage({ type: "error", message: "already contribute that note" })
            }
            if (data.success) {
                setFoundUser(false)
                setMessage({ type: "success", message: "Contribution request sent!" })
            } else {
                setMessage({ type: "error", message: "Contribution request failed!" })
            }
        })
    }
    return (
        <Master>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {loader ? (<Spinner />) : (
                            <div className="card">
                                <div className="card-header">
                                    Contribute Form
                                </div>
                                <div className="card-body">
                                    <div className="form-group mt-2 p-3">
                                        <label htmlFor="">Enter Email</label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email" name="" id="" className='form-control' />
                                    </div>
                                    <div className="p-3">
                                        <button
                                            onClick={findUser}
                                            className="btn btn-sm btn-danger">Search</button>
                                    </div>
                                </div>
                                {
                                    foundUser && (
                                        <div className="card bg-danger p-3">
                                            <h5 className='text-white text-center'>{foundUser.name}</h5>
                                            <button
                                                onClick={contribute}
                                                className="btn btn-sm btn-primary">
                                                Contribute
                                            </button>
                                        </div>
                                    )
                                }

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Master>
    )
}

export default SearchUser