import React from 'react';

import { Page, Song, Title, Introduction } from '@Components';
import { Container } from 'react-bootstrap';

import { EirikVsAdrianLoop, EirikVsAdrian2Loop, CarGameLoop } from 'src/Media/wav';
import * as Songs from '@Media/mp3/Songs';

const style = {
    width: '600px',
    height: '800px',

    maxWidth: '90%',
    maxHeight: 'calc(60vh + 100px)',

    overflowY: 'scroll',
    overflowX: 'hidden',

    marginBottom: '50px'
}

/** @type {{src: string, title: string, date: string, loop?: boolean, volume?: number}[]} */
const songs = [
    {src: Songs.SawMachine, title: 'Saw Machine', date: '14.03.2022'},
    {src: Songs.Bread, title: 'Bread', date: '08.01.2022'},
    {src: Songs.GalacticGuitar, title: 'Galactic Guitar', date: '24.09.2021'},
    {src: Songs.Thing, title: 'Thing', date: '06.10.2021', volume: 0.3},
    {src: EirikVsAdrianLoop, title: 'Eirik Vs. Adrian (Loop)', date: '26.11.2020', loop: true, volume: 0.4},
    {src: EirikVsAdrian2Loop, title: 'Eirik Vs. Adrian 2 (Loop)', date: '25.09.2021', loop: true},
    {src: CarGameLoop, title: 'Grøft Ække Tøft (Loop)', date: '10.05.2021', loop: true},
    {src: Songs.SadRickRoll, title: 'Sad Rick Roll', date: '15.03.2021', volume: 0.4}
    
].sort((a, b) => {
    const aMatch = a.date.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    const bMatch = b.date.match(/(\d{2})\.(\d{2})\.(\d{4})/);

    if (!aMatch) return 1;
    if (!bMatch) return -1;

    return new Date(`${bMatch[3]}-${bMatch[2]}-${bMatch[1]}`) - new Date(`${aMatch[3]}-${aMatch[2]}-${aMatch[1]}`);
});

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
