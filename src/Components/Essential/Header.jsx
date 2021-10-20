import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';

import '@css/Components/Essential/Header.css';

const Header = () => {

    var element;

    useEffect(() => {
        var last = window.scrollY;

        const listener = () => {
            if (!element) return;

            const scrollingUp = last - window.scrollY > 0;

            if (window.scrollY > 800 && !scrollingUp) element.classList.add('hide-by-scroll');
            else element.classList.remove('hide-by-scroll');

            last = window.scrollY;
        }

        document.addEventListener('scroll', listener);

        return () => document.removeEventListener('scroll', listener)
    });

    return <Navbar ref={ref => element = ref} variant="dark" className="header p-0" expand="lg">
        <Link to="/" className="home-button">Joakim</Link>

        <Navbar.Toggle aria-controls="navbar" style={{marginRight: '4px'}} />

        <Navbar.Collapse className="nav-links">
            <Nav>
                <Link to="/">Home</Link>
                <Link to="/about">About me</Link>
                <Link to="/projects">My projects</Link>
                <Link to="/games">My games</Link>
                <a href="#contact">Contact</a>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}

export default Header
