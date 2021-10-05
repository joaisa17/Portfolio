import React from 'react';

import Game from '@js/Games/EirikVsAdrian';
import { Page, GameWithCanvas } from '@Components';

import { EirikVsAdrian as ImageAssets } from '@Media/png';
import { EirikVsAdrian as AudioAssets } from '@Media/mp3';
import { EirikVsAdrian as MusicAssets } from '@Media/wav';

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

                music: MusicAssets.MainTheme
            }
        }} />
    </Page>
}