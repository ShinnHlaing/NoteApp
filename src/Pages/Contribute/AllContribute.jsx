import React from 'react'
import { useState, useEffect } from 'react'
import Master from '../Layout/Master'
import { Link } from 'react-router-dom'
import ContributeBtn from '../../Components/ContributeBtn'
import ax from "../../ax"
import Spinner from '../../Components/Spinner'

const AllContribute = () => {
    const token = localStorage.getItem("token")
    const [contributeNote, setContributeNote] = useState([])
    const [contributeLoad, setContributeLoad] = useState(true)

    useEffect(() => {
        ax.get("contribute-note/get", { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            // console.log(data.data.data);
            setContributeLoad(false)
            if (data.success) {
                setContributeNote(data.data.data)
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
                            {contributeLoad ? (<Spinner />) : (
                                <ul className="mt-3 list-group">
                                    {contributeNote.map((data) => (
                                        <li key={data.id} className="list-group-item bg-dark text-white">
                                            You contribute <Link to={`/note/${data.slug}`} style={{ textDecoration: 'none' }}>
                                                {data.note.title}
                                            </Link> to {data.receive_user.name}
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

export default AllContribute