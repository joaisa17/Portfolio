import React from 'react';

import { Page } from '@Components';

import { ErrorCodes } from '@js/ErrorCodes';

export default function Error(props) {

    const errorCode = props.location.pathname.match(/\d+/)[0];

    const i = ErrorCodes[errorCode];
    const errorDesc = i ? i : 'An unexpected error has occurred';

    return <Page title={`ERROR ${errorCode}`}>
        <div className="text-center mt-4">
            <h1>Error {errorCode}</h1>
            <h4 className="mt-4">{errorDesc}</h4>
        </div>
    </Page>
}
