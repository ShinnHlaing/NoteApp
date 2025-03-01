import React from 'react'
import Spinner from './Spinner'
import { useContext, useEffect } from 'react'
import LabelContext from '../Contex/LabelContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import ax from '../ax'
export default function Label() {
    const { label, setLabel, load, setLoad, activeLabel, setActiveLabel } = useContext(LabelContext)
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        ax.get("/category", { headers: { Authorization: "Bearer " + token } })
            .then((res) => {
                const { data } = res.data;
                setLabel(data);
                setLoad(false)
                // console.log(data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setLoad(false);
            });
    }, [])

    const render = () => {
        setActiveLabel(null)
        navigate("/")
    }
    return (
        <div className="card bg-white">
            <div className="card-body">

                {load && <Spinner />}
                {!load &&
                    <>
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <li className="list-group-item text-black">
                                Label
                            </li>
                            <Link to='/label' className="btn btn-sm btn-dark">Show All</Link>
                        </div>

                        <ul className="list-group label">

                            <li className={`list-group-item text-white cursor-pointer ${pathname === '/' ? "bg-danger" : "bg-dark"} `} onClick={render} >
                                <span className="fas fa-tags text-white text-small">
                                    &nbsp; &nbsp; All
                                </span>
                            </li>

                            {Array.isArray(label) && label.map(data => {
                                return (
                                    <Link key={data.id} to={`/${data.slug}/note`} className='text-decoration-none' >
                                        <li className={`list-group-item text-white ${data.id == activeLabel ? "bg-danger" : "bg-dark"}`} onClick={() => { setActiveLabel(data.id) }}>
                                            <span className='fas fa-tags text-white text-small' />
                                            &nbsp; &nbsp; {data.name}
                                            <span className="badge   badge-primary float-end">{data.note_count}</span>
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                    </>}
            </div>
        </div>
    )
}

