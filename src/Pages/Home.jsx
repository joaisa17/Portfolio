import React from 'react';

import { Page, VerticallyCenteredDiv, Background, AnimatedText } from '@Components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import '@css/Pages/Home.css';

const subtitles = [
    'Javascript Developer',
    '3D Modeller',
    'Music Producer',
    'Gamer',
    'Norwegian'
];

const Home = () => {
    return <Page title="Home">
        <div className="background-image" />
        <Background variant="lines" color="rgba(40, 200, 255, .5)" />
        
        <div className="title-container">
            <VerticallyCenteredDiv className="text-center">
                <div className="home-title mx-auto">
                    <h1 className="title">Joakim Isaksen</h1>
                    <AnimatedText className="subtitle mx-auto" titles={subtitles} />
                </div>
                <br />
                <Link to="/about">
                    <Button style={{fontSize: 'calc(1vh + 30px)'}} variant="outline-light" className="mx-auto about-button">
                        About Me
                    </Button>
                </Link>
            </VerticallyCenteredDiv>
        </div>

    </Page>
}

export default Home;