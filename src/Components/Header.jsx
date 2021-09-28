import React from 'react'
import { Link } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';

import '../css/Components/Header.css';

export default function Header() {

    return <Navbar  variant="dark" className="header p-0" expand="lg">
        <Link to="/" className="home-button">Joakim</Link>

        <Navbar.Toggle aria-controls="navbar" style={{marginRight: '4px'}} />

        <Navbar.Collapse className="nav-links">
            <Nav>
                <Link to="/home">Home</Link>
                <Link to="/about">About me</Link>
                <Link to="/projects">My projects</Link>
                <Link to="/games">My games</Link>
                <a href="#contact">Contact</a>
                <Link to="/secret">Don't click!</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}
