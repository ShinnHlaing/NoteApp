import React from 'react'
import Master from '../Layout/Master'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import Spinner from '../../Components/Spinner'
import MessageContext from '../../Contex/MessageContext'
import ax from '../../ax'

const CreateLable = () => {
    const [label, setLabel] = useState('');
    const [loader, setLoader] = useState(false);
    const { setMessage } = useContext(MessageContext);

    const storeLabel = () => {
        setLoader(true);
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("name", label);
        ax.post("/category", formData, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            setLoader(false);
            if (data.success) {
                setMessage({ type: "success", message: "label created successfully." })
                setLabel("");
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
                                <label htmlFor="">Enter Label</label>
                                <input value={label} onChange={e => setLabel(e.target.value)} type="text" className='form-control' />
                            </div>
                            <div>
                                <button onClick={storeLabel} className='btn btn-sm btn-danger' disabled={loader}>
                                    {loader ? <Spinner /> : "Create"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}

export default CreateLable