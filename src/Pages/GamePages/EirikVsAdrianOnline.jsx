import React from 'react';

import Game from '@js/Games/EirikVsAdrianOnline';
import { Page, GameWithCanvas } from '@Components';

export default function EirikVsAdrianOnline() {
    return <Page title="Eirik Vs Adrian ONLINE">

        <GameWithCanvas game={Game}
        
        />
    </Page>
}
