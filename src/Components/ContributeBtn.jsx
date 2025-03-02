import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const ContributeBtn = () => {
    const { pathname } = useLocation()

    return (
        <div className='d-flex gap-2'>
            <Link className={`${pathname === '/show/contribute' ? 'btn-danger' : 'btn-outline-danger'} btn`} to="/show/contribute">Contribute</Link>
            <Link className={`btn ${pathname === '/show/receive' ? 'btn-danger' : 'btn-outline-danger'}`} to="/show/receive">Receive</Link>
        </div>
    )
}

export default ContributeBtn