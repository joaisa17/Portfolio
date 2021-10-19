import React from 'react';

import Game from '@js/Games/EirikVsAdrian';
import { Page, GameWithCanvas } from '@Components';

import * as ImageAssets from '@Media/png/EirikVsAdrian';
import * as AudioAssets from '@Media/mp3/EirikVsAdrian';
import { EirikVsAdrianLoop } from '@Media/wav';

export default function EirikVsAdrian() {
    return <Page noheader title="Eirik Vs. Adrian">
        <GameWithCanvas game={Game} assets={{
            img: {
                adrian: ImageAssets.Adrian,
                eirik: ImageAssets.Eirik
            },

            audio: {
                adrian: AudioAssets.Adrian,
                eirikSwoosh: AudioAssets.EirikSwoosh,
                eirikAu: AudioAssets.EirikAu,

                music: EirikVsAdrianLoop
            }
        }} />
    </Page>
}