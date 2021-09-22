import React from 'react';

import Game from '../../js/Games/EirikVsAdrian';
import { Page, GameWithCanvas } from '../../Components';

import { EirikVsAdrian as ImageAssets } from '../../media/png';
import { EirikVsAdrian as AudioAssets } from '../../media/mp3';
import { EirikVsAdrian as MusicAssets } from '../../media/wav';

export default function EirikVsAdrian() {
    return <Page title="Eirik Vs. Adrian">
        <GameWithCanvas devmode game={Game} assets={{
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