import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

import { LoginButton, LogoutButton } from '.';

import { Navbar } from 'react-bootstrap';

import '../css/Components/Header.css';

export default function Header() {

    const { user, isAuthenticated } = useAuth0();

    return <Navbar  variant="dark" className="header p-0" expand="lg">
        <Link to="/" className="home-btn">Joakim</Link>

        <Navbar.Toggle aria-controls="navbar" style={{marginRight: '4px'}} />

        <Navbar.Collapse className="nav-links">
            <Link to="/secret">Secret</Link>
            <a href="#contact">Contact</a>
            <Link to="/games">My games</Link>
        </Navbar.Collapse>

        <Navbar.Collapse id="navbar" className="user justify-content-end" style={{margin: '8px'}}>
            {isAuthenticated
            ? <div className="logged-in">Logged in as {user.name}<LogoutButton variant="outline-light">Log Out</LogoutButton></div>
            : <div className="not-logged-in"><LoginButton variant="outline-light">Log In</LoginButton></div>
            }
        </Navbar.Collapse>
    </Navbar>
}
