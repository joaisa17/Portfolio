import React from 'react';

import { Page, Project as Game, Title, Introduction } from '@Components';
import { Eirik } from '@Media/png/EirikVsAdrian';
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
                <Game title="Eirik Vs. Adrian" thumbnail={Eirik} href="/games/eirik-vs-adrian">
                    This is one of my first web games
                </Game>

                <Game title="Eirik Vs. Adrian 2" thumbnail={Eirik} href="/games/eirik-vs-adrian-2">
                    This is a recreation of a game I originally made in Unity
                </Game>

                {/*<Game title="Eirik Vs. Adrian ONLINE" thumbnail={EirikVsAdrian.Eirik} href="/games/eirik-vs-adrian-online">
                    This game is still under development
                </Game>*/}
            </Row>
        </Container>
    </Page>
}
