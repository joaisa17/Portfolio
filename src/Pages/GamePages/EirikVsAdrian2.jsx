import React from 'react';

import Game from '@js/Games/EirikVsAdrian2';
import { Page, GameWithCanvas } from '@Components';

export default function EirikVsAdrian2() {
    return <Page noheader title="Eirik Vs. Adrian 2">
        <GameWithCanvas game={Game} assets={{
            
        }} />
    </Page>
}