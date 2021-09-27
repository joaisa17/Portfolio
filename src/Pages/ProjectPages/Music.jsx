import React from 'react';

import { Page, Song, Title, Introduction } from '@Components';
import { Container } from 'react-bootstrap';

import { EirikVsAdrian } from 'src/Media/wav';
import { Songs } from '@Media/mp3';

const style = {
    width: '600px',
    height: '800px',

    maxWidth: '90%',
    maxHeight: 'calc(60vh + 100px)',

    overflowY: 'scroll',
    overflowX: 'hidden',

    filter: 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.25))'
}

const songs = [
    {src: EirikVsAdrian.MainTheme, title: 'Eirik Vs. Adrian Theme', date: '13.10.2020'},
    {src: Songs.GalacticGuitar, title: 'Galactic Guitar', date: '24.09.2021'}
]

export default function Music() {
    return <Page title="My Music">
        <div className="py-4">
            <Title>My Music</Title>

            <Introduction>
                These are all the songs I've made and published to this website
            </Introduction>
        </div>

        <Container className="mx-auto mb-4" style={style}>
            {songs.map(song => {
                return <Song {...song} />
            })}
        </Container>
    </Page>
}
