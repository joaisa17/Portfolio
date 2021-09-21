import React from 'react';

import Game from '../../js/Games/EirikVsAdrian';
import { Page, GameWithCanvas } from '../../Components';

import { EirikVsAdrian as Assets } from '../../media/png'

export default function EirikVsAdrian() {
    return <Page title="Eirik Vs. Adrian" nofooter>
        <GameWithCanvas game={Game} />

        <div className="game-assets">
            <img src={Assets.Eirik} id="assets/eirik" alt="eirik" />
            <img src={Assets.Adrian} id="assets/adrian" alt="adrian" />
        </div>
    </Page>
}