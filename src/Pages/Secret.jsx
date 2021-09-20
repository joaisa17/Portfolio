import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { Page } from '../Components';

function Secret() {
    return <Page title="Secret">
        This page is secret
    </Page>
}

export default withAuthenticationRequired(Secret)