import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../page/About'
import Main from '../page/Main'
import Nav from './Nav'

const AppRouter = () => {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="*" element={<Navigate to="/main" />} />
                <Route path="/main" element={<Main />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}

export default AppRouter