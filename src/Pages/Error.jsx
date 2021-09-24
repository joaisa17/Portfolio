import React from 'react';

import { Page } from '@Components';

import { ErrorCodes } from '@js/ErrorCodes';

export default function Error(props) {

    const errorCode = props.location.pathname.match(/\d+/)[0];

    const i = ErrorCodes[errorCode];
    const errorDesc = i ? i : 'An unexpected error has occurred';

    return <Page title={`ERROR ${errorCode}`}>
        Error : {errorDesc}
    </Page>
}
