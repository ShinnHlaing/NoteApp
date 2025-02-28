import React from 'react'
import Master from '../Layout/Master'
import { Link, useLocation } from 'react-router-dom'
import Spinner from '../../Components/Spinner'
import { useState, useContext, useEffect } from 'react'
import MessageContext from '../../Contex/MessageContext'
import ax from '../../ax'


const EditLabel = () => {
    const [updateLoader, setUpdateLoader] = useState(false);
    const { setMessage } = useContext(MessageContext);
    const location = useLocation();
    console.log(location);
    const [label, setLabel] = useState(location.state.label.name);

    const updateLabel = () => {
        setUpdateLoader(true);
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("name", label);
        formData.append("_method", "PUT");
        ax.post(`/category/${location.state.label.slug}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({ data }) => {
            setUpdateLoader(false);
            if (data.success) {
                setMessage({ type: "success", message: "label updated successfully." })
            } else {
                setMessage({ type: "error", message: "Failed to update label." });
            }
        })
    }
    return (
        <Master>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card p-2">
                            <div>
                                <Link to='/label' className='btn btn-sm btn-danger mb-3'>View All Label</Link>
                            </div>
                            <div className='form-control mb-3'>
                                <label htmlFor="" className='mb-3'>Enter Label</label>
                                <input onChange={(e) => setLabel(e.target.value)} value={label} type="text" name="" className='form-control' />
                            </div>
                            <div>
                                <button onClick={updateLabel} className='btn btn-sm btn-danger'>
                                    {updateLoader ? <Spinner /> : "Update"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}

export default EditLabel