import React from 'react';

import Page from '../Components/Page';

import Game from '../Components/Game';
import { Placeholder } from '../media/png';

import { Container, Row } from 'react-bootstrap';

export default function Games() {
    return <Page title="My Games">
        <Container className="game-grid mt-4">

            <div className="pb-4">
                <h1 className="pb-4 text-center">My Games</h1>

                <h4 className="w-50 m-auto">
                    Here is a list of all the web compatible games I uploaded
                    to my website:
                </h4>
            </div>

            <Row>
                <Game title="Placeholder Game" thumbnail={Placeholder} href="/games/placeholder-game">
                    This is a placeholder for a game figure
                </Game>

                <Game title="Placeholder Game" thumbnail={Placeholder} href="/games/placeholder-game">
                    This is a placeholder for a game figure
                </Game>

                <Game title="Placeholder Game" thumbnail={Placeholder} href="/games/placeholder-game">
                    This is a placeholder for a game figure
                </Game>

                <Game title="Placeholder Game" thumbnail={Placeholder} href="/games/placeholder-game">
                    This is a placeholder for a game figure
                </Game>

                <Game title="Placeholder Game" thumbnail={Placeholder} href="/games/placeholder-game">
                    This is a placeholder for a game figure
                </Game>

                <Game title="Placeholder Game" thumbnail={Placeholder} href="/games/placeholder-game">
                    This is a placeholder for a game figure
                </Game>
            </Row>
        </Container>
    </Page>
}
