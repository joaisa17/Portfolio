import React from 'react';

import { Page, Title, SocialLink, ExternalLink } from '@Components';
import { Link } from 'react-router-dom';

import { JoakimCubeScene } from '@Media/gltf';
import { ThreeScrollViewer } from '@Components';

import { IceTea } from '@Media/mp4';

import YearsSince from '@js/YearsSince';

import '@css/Pages/About.css';

const description = `This page contains everything
you need to know about
Joakim Isaksen.`;

export default function About() {
    
    return <Page title="About Me" description={description}>
        <ThreeScrollViewer src={JoakimCubeScene} />
        <div className="mt-4 about-title">
            <Title>About Me</Title>

            <h3 className="pt-2 pb-4 mx-auto about-content" style={{
                width: 'calc(10vw + 600px)',
                maxWidth: '84vw',
                fontSize: 'var(--size-normal)',
                fontWeight: '400'
            }}>
                <p>
                    My name is Joakim Isaksen. I'm a {YearsSince('2004-08-17')} year old IT student from Norway,
                    and I studied IT-Development at Hamar Katedralskole between the years 2020-2022.
                </p>

                <p>
                    My main interests all revolve around computers. I'm highly interested
                    in video games, programming and music production through digital software.
                </p>

                <p className="pb-4">
                    When it comes to my competence in development, I'm highly experienced with
                    the framework I used to make this website, React. I'm a fast learner, and
                    have just passed {YearsSince('2020-06-18')} years of experience using HTML, CSS and Javascript, and
                    am still actively learning. I'm fairly experienced with backend development,
                    using Express, and I've also made a few games in Unity with C#.
                </p>

                <p className="pt-5">
                    Additionally, I have a fair bit of experience using a variety of
                    the <ExternalLink href="adobe.com">Adobe</ExternalLink> programs,
                    such as Photoshop, Premiere Pro and After Effects. I also know how to model
                    3D objects in <ExternalLink href="blender.org">Blender</ExternalLink>, as well as make 3D animations. Here is a medium
                    resolution animation render I made for a school assignment:
                </p>

                <video
                    className="d-block mx-auto mw-100 mt-5 "
                    src={IceTea}
                    controls
                    style={{width: 'calc(50% + 100px)'}}
                />

                <p className="pt-5">
                    Yes, I also made the background scene
                    myself, using Blender and <ExternalLink href="threejs.org">Three.js</ExternalLink>.
                </p>

                <p>
                    Other than my programming and video abilities, I'm also a fairly experienced music producer.
                    I make music using the digital audio workstation <ExternalLink href="image-line.com">FL Studio</ExternalLink>.
                    
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

                <p>I do also upload various content other than music on my YouTube Channel.</p>
            </h3>
        </div>
    </Page>
}
