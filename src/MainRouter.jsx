import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from "./Pages/Auth/Register"
import Login from "./Pages/Auth/Login"
import Home from "./Pages/Home"
import Create from './Pages/Note/Create'
import Edit from './Pages/Note/Edit'
import All from './Pages/Label/All'
import CreateLable from './Pages/Label/CreateLable'
import EditLabel from './Pages/Label/EditLabel'

export default function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* note */}
            <Route path="/:category_slug/note" element={<Home />} />
            <Route path="/note/:slug" element={<Edit />} />
            <Route path="/note/create" element={<Create />} />
            {/* label */}
            <Route path="/label" element={<All />} />
            <Route path="/label/create" element={<CreateLable />} />
            <Route path="/label/edit/:slug" element={<EditLabel />} />
        </Routes>
    )
}
