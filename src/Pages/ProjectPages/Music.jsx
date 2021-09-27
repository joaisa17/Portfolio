import React from 'react';

import { Page, Song, Title, Introduction } from '@Components';
import { Container } from 'react-bootstrap';

import { Songs } from '@Media/mp3';

const style = {
    width: 'calc(50% + 100px)',
    height: '300px',
    overflowY: 'scroll',
    overflowX: 'hidden'
}

export default function Music() {
    return <Page title="My Music">
        <div className="py-4">
            <Title>My Music</Title>

            <Introduction>
                These are all the songs I've made and published to this website:
            </Introduction>
        </div>

        <Container className="mx-auto" style={style}>
            <Song title="Galactic Guitar" date="24.09.2021" src={Songs.GalacticGuitar} />
        </Container>
    </Page>
}
