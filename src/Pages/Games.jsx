import React from 'react';

import { Page, Project as Game, Title, Introduction } from '@Components';
import { EirikVsAdrian } from '@Media/png';
import { Container, Row } from 'react-bootstrap';

export default function Games() {
    return <Page title="My Games">
        <div className="py-4">
            <Title>My Games</Title>

            <Introduction>
                Here is a list of all the web compatible games I
                developed and published to my website:
            </Introduction>
        </div>

        <Container className="game-grid mt-4">
            <Row className="justify-content-center">
                <Game title="Eirik Vs. Adrian" thumbnail={EirikVsAdrian.Eirik} href="/games/eirik-vs-adrian">
                    This is one of my first web games
                </Game>
            </Row>
        </Container>
    </Page>
}
