import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Master from '../Layout/Master';
import LabelContext from "../../Contex/LabelContext"
import ax from '../../ax';
import Spinner from "../../Components/Spinner"
import MessageContext from '../../Contex/MessageContext';
import { useParams } from 'react-router-dom';


const Edit = () => {
    const [description, setDescription] = useState('');
    const { label } = useContext(LabelContext);
    const { setMessage } = useContext(MessageContext)
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [error, setError] = useState({});
    const [load, setLoader] = useState(false);
    const [pageLoader, setPageLoader] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("token");
        ax.get('/note/' + slug, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            console.log(data);
            setPageLoader(false);
            setDescription(data.data.description);
            setCategory(data.data.category.slug)
            setColor(data.data.color)
            setTitle(data.data.title)
        })
    }, [])

    const updateNote = () => {
        setLoader(true)
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("title", title)
        formData.append("category_slug", category)
        formData.append("description", description)
        formData.append("color", color)
        formData.append("_method", "PUT")
        ax.post("/note/" + slug, formData, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            setLoader(false)
            console.log(data);

            if (data.success === false) {
                setMessage({ type: "error", message: "Pls fillout all fields!" });
                setError(data.data);
                return;
            }
            if (data.success === true) {
                setMessage({ type: "success", message: "Note updated successfully." })
                return;
            }
        })
    }

    return (
        <Master>
            <div className="row mt-5">
                <div className="col-md-6 offset-md-3">
                    {pageLoader ? (<Spinner />) : (
                        <div className="card">
                            <div className="card-header text-white" style={{ backgroundColor: color ? color : "#212529" }} >
                                Edit Note
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="">Enter Title</label>
                                    <input type="text" value={title} className={`form-control ${error.title && "border border-danger"}`} onChange={e => setTitle(e.target.value)} />
                                    {error.title && error.title.map(d => <span className='text-danger text-sm' key={d}>{d}</span>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Choose Label</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className={`form-control ${error.category && "border border-danger"}`}>
                                        <option >Select Label</option>
                                        {label.map((data) =>
                                            <option key={data.id} value={data.slug}>{data.name}</option>
                                        )}
                                    </select>
                                    {error.category && error.category.map(d => <span className='text-danger text-sm' key={d}>{d}</span>)}
                                </div>
                                <div
                                    onChange={(e) => setColor(e.target.value)}
                                    className="form-control">
                                    <label htmlFor="">Choose Color</label>
                                    <select value={color} className={`form-control ${error.color && "border border-danger"}`}>
                                        <option value="">Select Color</option>
                                        <option value="#dc3545">Red</option>
                                        <option value="#198754">Green</option>
                                        <option value="#0d6efd">Blue</option>
                                        <option value="#fd7e14">Orange</option>
                                    </select>
                                    {error.color && error.color.map(d => <span className='text-danger text-sm' key={d}>{d}</span>)}
                                </div>
                                <div className="form-control">
                                    <label htmlFor="">Enter Description</label>
                                    <ReactQuill theme="snow" value={description} onChange={setDescription} className={`form-control ${error.description && "border border-danger"}`} />
                                    {error.description && error.description.map(d => <span className='text-danger text-sm' key={d}>{d}</span>)}
                                </div>
                                <button className="btn btn-danger mt-3" onClick={() => updateNote()} disabled={load}>
                                    {load && <Spinner />}
                                    Update</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </Master>
    )
}

export default Edit