import React from 'react';

import { Container, Row } from 'react-bootstrap';
import { Page, Project, Title, Introduction } from '@Components';

export default function Projects() {
    return <Page title="My Projects">
        <div className="py-4">
            <Title>My Projects</Title>

            <Introduction>
                This is a list of all the projects I made
                available on my website:
            </Introduction>
        </div>

        <Container className="project-grid mt-4">
            <Row className="justify-content-center">
                <Project title="My Music" href="/projects/music">
                    This is a page where you can listen to all
                    the music I've uploaded
                </Project>
            </Row>
        </Container>
    </Page>
}
