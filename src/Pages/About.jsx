import React from 'react';

import { Page, Title, Introduction } from '@Components';

export default function About() {
    return <Page title="About Me">
        <div className="mt-4">
            <Title>About Me</Title>

            <Introduction>
                This page is the
            </Introduction>
        </div>
    </Page>
}
