import React from 'react'
import Master from '../Layout/Master'
import { Link } from 'react-router-dom'

const EditLabel = () => {
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
                                <input type="text" name="" className='form-control' />
                            </div>
                            <div>
                                <button className='btn btn-sm btn-danger'>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}

export default EditLabel