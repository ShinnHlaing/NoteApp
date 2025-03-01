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
    const [deleteLoad, setDeleteLoad] = useState('');
    const token = localStorage.getItem("token")
    const [contributeLoad, setContributeLoad] = useState(true);
    const [contributeNote, setContributeNote] = useState([]);
    const [receiveLoad, setreceiveLoad] = useState(true);
    const [receiveNote, setReceiveNote] = useState([]);

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
        // get contribute note
        ax.get("contribute-note/get", { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            setContributeLoad(false)
            if (data.success) {
                setContributeNote(data.data.data)
            }
        })
        //get receive note
        ax.get("receive-note/get", { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            setreceiveLoad(false)
            if (data.success) {
                setReceiveNote(data.data.data)
            }
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

    const deleteNote = (slug) => {
        setDeleteLoad(slug)
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("_method", "DELETE");
        ax.post(`/note/${slug}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                if (data.success) {

                    setNote(note.filter((data) => data.slug !== slug))
                    messageContext.setMessage({
                        type: "success",
                        message: "Note deleted successfully"
                    })
                }
            })
    }
    return (
        <Master>
            <div className="container mt-5">
                <div className="row">
                    {/* for category & info */}
                    <div className='col-md-4'>
                        <Label />
                        {/* contribute note */}
                        <div className="card bg-gray-100 mt-3">
                            <div className="card-body">
                                <li className="list-group-item bg-danger text-white d-flex justify-content-between aling-items-center p-1 rounded-1">
                                    <h5 className=''>Contribute Notes</h5>
                                    <a className="badge badge-dark text-white" style={{ textDecoration: "none" }} >
                                        All
                                    </a>
                                </li>
                                {
                                    contributeLoad ? (<Spinner />) : (
                                        <ul className='list-group label'>
                                            {contributeNote && contributeNote.map((data) => (
                                                <li
                                                    key={data.id}
                                                    className="list-group-item bg-dark text-white">
                                                    <i className="far fa-newspaper" />
                                                    &nbsp; &nbsp; You got <Link to={`/note/${data.note.slug}`}>{data.note.title}</Link> &nbsp;
                                                    <small>from</small>
                                                    &nbsp;
                                                    <b className="text-primary">{data.receive_user.name}</b>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </div>
                        </div>
                        {/* receive note */}
                        <div className="card bg-gray-100 mt-3">
                            <div className="card-body">
                                <li className="list-group-item bg-danger text-white d-flex justify-content-between aling-items-center p-1 rounded-1">
                                    <h5>Received Notes</h5>
                                    <a className="badge badge-dark text-white" style={{ textDecoration: "none" }} >
                                        All
                                    </a>
                                </li>
                                {
                                    receiveLoad ? (<Spinner />) : (
                                        <ul className='list-group label'>
                                            {receiveNote && receiveNote.map((data) => (
                                                <li
                                                    key={data.id}
                                                    className="list-group-item bg-dark text-white">
                                                    <i className="far fa-newspaper" />
                                                    &nbsp; &nbsp; You share <Link to={`/note/${data.note.slug}`}>{data.note.title}</Link> &nbsp;
                                                    <small>to</small>
                                                    &nbsp;
                                                    <b className="text-primary">{data.contribute_user.name}</b>
                                                </li>)
                                            )}
                                        </ul>
                                    )}
                            </div>
                        </div>
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
                                                                <Link to={`/contribute/${data.slug}`} className='badge badge-primary'>
                                                                    <i className="fa-solid fa-share text-black fs-6" ></i>
                                                                </Link>
                                                            </div>
                                                            <div className="col-md-4 text-center">
                                                                <span onClick={() => deleteNote(data.slug)} className='badge badge-primary'>
                                                                    {deleteLoad == data.slug ? (<Spinner />) : (<i className="fa-solid fa-trash text-black fs-6" ></i>)}
                                                                </span>
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
