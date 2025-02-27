import React from 'react'
import Master from '../Layout/Master'
import { Link } from 'react-router-dom'
const All = () => {
    return (
        <Master>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card p-2">
                            <div>
                                <Link to='/label/create' className='btn btn-sm btn-danger'>Create</Link>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Option</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Label Name</td>
                                        <td>
                                            <Link className='btn btn-sm btn-primary'>Edit</Link>
                                            <button className='btn btn-sm btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}

export default All