import React from 'react';

import { Page, Song, Title, Introduction } from '@Components';
import { Container } from 'react-bootstrap';

import { EirikVsAdrian, CarGameLoop } from 'src/Media/wav';
import { Songs } from '@Media/mp3';

const style = {
    width: '600px',
    height: '800px',

    maxWidth: '90%',
    maxHeight: 'calc(60vh + 100px)',

    overflowY: 'scroll',
    overflowX: 'hidden',

    marginBottom: '50px'
}

const songs = [
    {src: Songs.GalacticGuitar, title: 'Galactic Guitar', date: '24.09.2021'},
    {src: Songs.Thing, title: 'Thing', date: '06.10.2021', volume: 0.3},
    {src: EirikVsAdrian.MainTheme, title: 'Eirik Vs. Adrian (Loop)', date: '26.11.2020', loop: true, volume: 0.4},
    {src: CarGameLoop, title: 'Grøft Ække Tøft (Loop)', date: 'idfk', loop: true},
    {src: Songs.SadRickRoll, title: 'Sad Rick Roll', date: 'idfk', volume: 0.4}
]

export default function Music() {
    return <Page title="My Music">
        <div className="py-4">
            <Title>My Music</Title>

            <Introduction>
                These are all the songs I've made and published to this website
            </Introduction>
        </div>

        <Container className="mx-auto" style={style}>
            {songs.map(song => {
                return <Song {...song} key={song.title} />
            })}
        </Container>
    </Page>
}
