import React, { useState } from 'react'
import Master from './Layout/Master'
import { useEffect, useContext } from 'react'
import MessageContext from '../Contex/MessageContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Label from '../Components/Label'
import ax from '../ax'
import Spinner from '../Components/Spinner'

export default function Home() {
    const messageContext = useContext(MessageContext);
    const navigate = useNavigate();
    const { category_slug } = useParams();
    const [note, setNote] = useState([]);
    const [nextPage, setNextPage] = useState("");
    const [loadMore, setLoadMore] = useState(false);
    const [load, setLoad] = useState(true);
    const token = localStorage.getItem("token")
    //console.log(category_slug);

    // render note by category_slug when user click on category
    useEffect(() => {
        setLoad(true)
        if (!localStorage.getItem("token")) {
            messageContext.setMessage({
                type: "error",
                message: "You need to login first!"
            })
            navigate("/login")
        }
        var url = "/note";
        if (category_slug) {
            url += "?category_slug=" + category_slug;
            //console.log(url);
        }

        ax.get(url, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                // console.log(data.data.data);
                setNote(data.data.data);
                setNextPage(data.data.next_page_url);
                setLoad(false)
            })
    }, [category_slug])

    const renderNextPage = () => {
        setLoadMore(true)
        const token = localStorage.getItem("token");
        ax.get(nextPage, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            setLoadMore(false)
            setNote([...note, ...data.data.data]);
            setNextPage(data.data.next_page_url);
        })
    }
    return (
        <Master>
            <div className="container mt-3">
                <div className="row">
                    {/* for category & info */}
                    <div className='col-md-4'>
                        <Label />
                        {/*  */}
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <Link to="/note/create" className='btn btn-sm btn-danger mb-3'>create note</Link>
                                {load && <Spinner />}
                                {!load && (
                                    <div className="row">
                                        {/* loop note */}
                                        {note.map((data) => (
                                            <div className="col-md-4 mb-3" key={data.id}>
                                                <div className="card">
                                                    {/* <Link to={`/note/${data.slug}`}>s</Link> */}
                                                    <div className="card-header" style={{ backgroundColor: data.color }}>
                                                        <h5 className='text-white text-center'>{data.title}</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-4 text-center">
                                                                <Link to={`/note/${data.slug}`} className='badge badge-primary'>
                                                                    <i className="fas fa-eye text-black fs-6"></i>
                                                                </Link>
                                                            </div>
                                                            <div className="col-md-4 text-center">
                                                                <a href="" className='badge badge-primary'>
                                                                    <i className="fa-solid fa-share text-black fs-6" ></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <button className='btn btn-primary btn-fab btn-icon btn-round' onClick={renderNextPage} disabled={nextPage === null ? true : false}>
                                            {loadMore ? (<Spinner />) : (<i className="fas fa-arrow-down"></i>)}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}
