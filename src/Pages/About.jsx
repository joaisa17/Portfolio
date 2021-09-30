import React from 'react';

import { Page, Title, SocialLink } from '@Components';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CvJoakimIsaksen from '@Media/documents/CvJoakimIsaksen.doc';
import { IceTea } from '@Media/mp4';

export default function About() {
    return <Page title="About Me">
        <div className="mt-4">
            <Title>About Me</Title>

            <h3 className="pt-2 pb-4 mx-auto" style={{
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

                <p className="text-center py-5">
                    <p style={{fontWeight: 'bold'}}>
                        If you're hiring, and are looking for my CV, click the button below,
                        or click <a href={CvJoakimIsaksen} download>here</a>
                    </p>
                    <Button style={{fontSize: 'var(--size-big)'}} variant="outline-light" download href={CvJoakimIsaksen}>Download CV</Button>
                </p>

                <p className="pb-4">
                    When it comes to my competence in development, I'm highly experienced with
                    the framework I used to make this website, React. I'm a fast learner, and
                    have just passed 1 year of experience using HTML, CSS and Javascript, and
                    am still actively learning. I'm somewhat experienced with backend development,
                    using Express, and I've also made a few games in Unity with C#.
                </p>

                <p className="pt-5">
                    I also have a fair bit of experience using a variety of the Adobe programs,
                    such as Photoshop, Premiere Pro and After Effects. I also know how to model
                    3D objects in Blender, as well as make 3D animations. Here is a medium
                    resolution animation render I made for a school assignment:
                </p>

                <video
                    className="d-block mx-auto mw-100 "
                    src={IceTea}
                    controls
                    style={{width: 'calc(50% + 100px)'}}
                />

                <p className="pt-5">
                    Other than my programming and video abilities, I'm also a fairly experienced
                    music producer. I make music using the digital audio workstation <a
                        className="link"
                        target="external"
                        href="https://image-line.com">FL Studio</a>.
                    
                    All the songs I have in my <Link
                        className="link"
                        to="/projects/music">My Music</Link> are made using it.
                </p>

                <p>
                    I usually post my music either on
                    my <SocialLink className="link" href="youtube.com/ignwombat">YouTube Channel</SocialLink>,
                    my <SocialLink className="link" href="ignwombat.newgrounds.com">NewGrounds Page</SocialLink> or
                    on <SocialLink className="link" href="soundcloud.com/ignwombat">SoundCloud</SocialLink>.
                </p>
            </h3>
        </div>
    </Page>
}
