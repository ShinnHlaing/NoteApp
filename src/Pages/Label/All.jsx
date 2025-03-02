import React, { useEffect, useState, useContext } from 'react'
import Master from '../Layout/Master'
import { Link } from 'react-router-dom'
import Spinner from '../../Components/Spinner'
import ax from '../../ax'
import MessageContext from '../../Contex/MessageContext'

const All = () => {
    const [nextPage, setNextPage] = useState('')
    const [loadMore, setLoadMore] = useState(false)
    const [pageLoader, setPageLoader] = useState(true)
    const [label, setLabel] = useState([])
    const { setMessage } = useContext(MessageContext);

    useEffect(() => {
        setPageLoader(true)
        const token = localStorage.getItem("token");
        ax.get('/category', { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            //console.log(data);
            setPageLoader(false);
            setLabel(data.data);
            //setNextPage(data.next_page_url);
        })
    }, [])
    //currently not working for next page render
    const renderNextPage = () => {
        setLoadMore(true)
        const token = localStorage.getItem("token");
        ax.get(nextPage, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            // console.log(data.data);
            setLoadMore(false)
            setLabel([...label, ...data.data]);
            //setNextPage(data.next_page_url);
        })
    }

    const deleteLabel = (slug) => {
        setPageLoader(true)
        const formData = new FormData();
        formData.append("_method", "DELETE");
        const token = localStorage.getItem("token");
        ax.post(`/category/${slug}`, formData, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {

            if (data.success) {
                setPageLoader(false)
                setLabel(label.filter((data) => data.slug !== slug))
                setMessage({ type: "success", message: "Label deleted successfully." })
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
                                <Link to='/label/create' className='btn btn-sm btn-danger'>Create</Link>
                            </div>
                            {pageLoader ? (
                                <Spinner />
                            ) : (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td>Option</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {label.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.name}</td>
                                                <td className='d-flex gap-2'>
                                                    <Link to={{
                                                        pathname: `/label/edit/${data.slug}`,
                                                        state: { label: data },
                                                    }} className='btn btn-sm btn-primary'>Edit</Link>
                                                    <button onClick={() => deleteLabel(data.slug)} className='btn btn-sm btn-danger'>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
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
        </Master>
    )
}

export default All