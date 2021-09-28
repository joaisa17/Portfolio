import React from 'react';

import { Page, Title } from '@Components';
import { Button } from 'react-bootstrap';

import CvJoakimIsaksen from '@Media/documents/CvJoakimIsaksen.doc';

export default function About() {
    return <Page title="About Me">
        <div className="mt-4">
            <Title>About Me</Title>

            <h5 className="mt-2 pb-4 mx-auto" style={{
                width: 'calc(10vw + 600px)',
                maxWidth: '84vw',
                fontSize: 'var(--size-normal)',
                fontWeight: '400'
            }}>
                <p>
                    My name is Joakim Isaksen. I'm an IT student from Norway,
                    and I study IT-Development at Hamar Katedralskole.
                </p>

                <p>
                    My main interests all revolve around computers. I'm highly interested
                    in video games, development, and music production through digital software.
                </p>

                <p className="text-center mt-5">
                    <p style={{fontWeight: 'bold'}}>If you're hiring, and are looking for my CV, click the button below, or click <a href={CvJoakimIsaksen} download>here</a></p>
                    <Button style={{fontSize: 'var(--size-big)'}} variant="outline-light" download href={CvJoakimIsaksen}>Download CV</Button>
                </p>
            </h5>
        </div>
    </Page>
}
