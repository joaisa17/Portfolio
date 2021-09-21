import React from 'react';

import Page from '../Components/Page';

import Game from '../Components/Game';
import { EirikVsAdrian } from '../media/png';

import { Container, Row } from 'react-bootstrap';

export default function Games() {
    return <Page title="My Games">
        <Container className="game-grid mt-4">

            <div className="pb-4">
                <h1 className="pb-4 text-center">My Games</h1>

                <h4 className="w-50 m-auto">
                    Here is a list of all the web compatible games I
                    developed and published to my website:
                </h4>
            </div>

            <Row className="justify-content-center">
                <Game title="Eirik Vs. Adrian" thumbnail={EirikVsAdrian.Eirik} href="/games/eirik-vs-adrian">
                    This is one of the first web games I ever made. I have further
                    developed it to improve gameplay and compatibility.
                </Game>
            </Row>
        </Container>
    </Page>
}
