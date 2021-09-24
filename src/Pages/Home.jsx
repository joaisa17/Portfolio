import React from 'react';

import { Page, VerticallyCenteredDiv, Background } from '../Components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Home() {
    return <Page title="Home">
        <div className="background-image" />
        <Background variant="lines" color="rgba(40, 20, 255, .65)" className="test" />
        
        <div className="title-container">
            <VerticallyCenteredDiv className="text-center" style={{marginTop: '-50px'}}>
                <h1 style={{fontSize: 'calc(2vh + 30px', marginTop: '50px', marginBottom: '-20px'}}>Joakim Isaksen</h1>
                <br />
                <Link to="/about">
                    <Button style={{fontSize: 'calc(1vh + 30px)'}} variant="outline-light" className="mx-auto mt-4">About Me</Button>
                </Link>
            </VerticallyCenteredDiv>
        </div>

    </Page>
}
