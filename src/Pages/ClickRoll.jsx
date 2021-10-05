import React, { useEffect } from 'react';

import { Howl } from 'howler';
import { Page, Title } from '@Components';
import { SadRickRoll } from '@Media/mp3/Songs';
import { RickRoll } from 'src/Media/gif';


const ClickRoll = () => {
    useEffect(() => {
        var sound = new Howl({
            src: SadRickRoll,
            volume: 0.5,
            loop: true
        });

        sound.play();

        return () => {
            sound.stop();
            sound = undefined;
        }
    });

    return <Page noheader title="You Clicked!" style={{
        backgroundImage: `url(${RickRoll})`,
        backgroundSize: 'cover',
        filter: 'grayscale(100%)'
    }}>

        <Title className="pt-4" style={{opacity: '100%'}}>You clicked!</Title>

    </Page>
}

export default ClickRoll;
