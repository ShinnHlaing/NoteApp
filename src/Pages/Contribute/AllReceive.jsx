import React from 'react'
import { useState, useEffect } from 'react'
import Master from '../Layout/Master'
import { Link } from 'react-router-dom'
import ContributeBtn from '../../Components/ContributeBtn'
import ax from "../../ax"
import Spinner from '../../Components/Spinner'
const AllReceive = () => {
    const token = localStorage.getItem("token")
    const [receiveNote, setReceiveNote] = useState([])
    const [receiveLoad, setreceiveLoad] = useState(true)
    useEffect(() => {
        ax.get("receive-note/get", { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            setreceiveLoad(false)
            if (data.success) {
                setReceiveNote(data.data.data)
            }
        })
    }, [])
    return (
        <Master>
            <div className="containe mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card p-2">
                            <ContributeBtn />
                            {receiveLoad ? (<Spinner />) : (
                                <ul className="mt-3 list-group">
                                    {receiveNote.map((data) => (
                                        <li
                                            key={data.id}
                                            className="list-group-item bg-dark text-white" style={{ textDecoration: 'none' }}>
                                            You got <Link to={`/note/${data.slug}`}>
                                                {data.note.title}
                                            </Link> from {
                                                data.contribute_user.name
                                            }
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}

export default AllReceive