import React from 'react';

import Game from '@js/Games/EirikVsAdrian2';
import { Page, GameWithCanvas } from '@Components';

import * as ImageAssets from '@Media/png/EirikVsAdrian2';
import * as SoundAssets from '@Media/mp3/EirikVsAdrian2';
import { EirikVsAdrian2Loop, EirikVsAdrian2GameOver } from '@Media/wav';

export default function EirikVsAdrian2() {
    return <Page noheader title="Eirik Vs. Adrian 2">
        <GameWithCanvas devmode game={Game} width={1200} height={1000} assets={{
            img: {
                adrian: ImageAssets.Adrian,
                eirik: ImageAssets.Eirik,
                wing: ImageAssets.Wing,

                ground: ImageAssets.Ground,

                bg: ImageAssets.Background,
                bgMountain: ImageAssets.BackgroundMountain,
                bgMountains: ImageAssets.BackgroundMountains,
                bgForest: ImageAssets.BackgroundForest,
                bgTrees: ImageAssets.BackgroundTrees
            },

            audio: {
                music: EirikVsAdrian2Loop,
                gameOver: EirikVsAdrian2GameOver,

                eirikAu: SoundAssets.EirikAu,
                eirikSwoosh: SoundAssets.EirikSwoosh,
                adrian: SoundAssets.Adrian
            }
        }} />
    </Page>
}