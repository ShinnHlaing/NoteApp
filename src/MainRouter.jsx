import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from "./Pages/Auth/Register"
import Login from "./Pages/Auth/Login"
import Home from "./Pages/Home"
import Create from './Pages/Note/Create'
import Edit from './Pages/Note/Edit'

export default function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category_slug/note" element={<Home />} />
            <Route path="/note/:slug" element={<Edit />} />
            <Route path="/note/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}
