import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <nav>
                <Link to="/main">Главное</Link> |{" "}
                <Link to="/about">О нас</Link>
                <hr />
            </nav>
            <Outlet />
        </div>
    )
}

export default Nav