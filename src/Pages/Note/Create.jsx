import React from 'react'
import { useState, useContext } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Master from '../Layout/Master';
import LabelContext from "../../Contex/LabelContext"
import ax from '../../ax';
import Spinner from "../../Components/Spinner"
import MessageContext from '../../Contex/MessageContext';


export default function Create() {
    const [desc, setDesc] = useState('');
    const { label } = useContext(LabelContext);
    const { setMessage } = useContext(MessageContext)
    const [title, setTitle] = useState("");
    const [category_slug, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [error, setError] = useState({});
    const [load, setLoader] = useState(false);
    const token = localStorage.getItem("token");
    const storeNote = () => {
        setLoader(true)
        const formData = new FormData();
        formData.append("title", title)
        formData.append("category_slug", category_slug)
        formData.append("description", desc)
        formData.append("color", color)
        ax.post("/note", formData, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
            setLoader(false)
            console.log(data);

            if (data.success === false) {
                setMessage({ type: "error", message: "Pls fillout all fields!" });
                setError(data.data);
                return;
            }
            if (data.success === true) {
                setMessage({ type: "success", message: "Note created successfully." })
            }
        })
    }

    return (
        <Master>
            <div className="row mt-5">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header text-white" style={{ backgroundColor: color ? color : "#212529" }} >
                            Create New Note
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="">Enter Title</label>
                                <input type="text" name="" className={`form-control ${error.title && "border border-danger"}`} onChange={e => setTitle(e.target.value)} />
                                {error.title && error.title.map(d => <span className='text-danger text-sm' key={d}>{d}</span>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Choose Label</label>
                                <select
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={`form-control ${error.category_slug && "border border-danger"}`}>
                                    <option value="">Select Label</option>
                                    {label.map((data) =>
                                        <option key={data.id} value={data.slug}>{data.name}</option>
                                    )}
                                </select>
                                {error.category_slug && error.category_slug.map(d => <span className='text-danger text-sm' key={d}>{d}</span>)}
                            </div>
                            <div
                                onChange={(e) => setColor(e.target.value)}
                                className="form-control">
                                <label htmlFor="">Choose Color</label>
                                <select className={`form-control ${error.color && "border border-danger"}`}>
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
                                <ReactQuill theme="snow" value={desc} onChange={setDesc} className={`form-control ${error.description && "border border-danger"}`} />
                                {error.description && error.description.map(d => <span className='text-danger text-sm' key={d}>{d}</span>)}
                            </div>
                            <button className="btn btn-danger mt-3" onClick={() => storeNote()} disabled={load}>
                                {load && <Spinner />}
                                Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}
//<ReactQuill theme="snow" value={value} onChange={setValue} />
