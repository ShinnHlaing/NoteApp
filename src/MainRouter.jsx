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
import SearchUser from './Pages/Contribute/SearchUser'
import AllReceive from './Pages/Contribute/AllReceive'
import AllContribute from './Pages/Contribute/AllContribute'

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
            {/* contribute */}
            <Route path="/contribute/:slug" element={<SearchUser />} />
            <Route path="/show/receive" element={<AllReceive />} />
            <Route path="/show/contribute" element={<AllContribute />} />
        </Routes>
    )
}
