import React from 'react';

import { Link } from 'react-router-dom';
import { SocialLink, DiscordEmbed } from '@Components';
import { Container, Row, Col } from 'react-bootstrap';

import '@css/Components/Footer.css';

import { YouTubeLogo, DiscordLogo } from '@Media/svg/logos';

export default class Footer extends React.Component {
    render() {
        return <div className="footer">
            <Container className="footer-grid">
                <Row className="top">
                    <Col className="title">Joakim Isaksen</Col>
                    <Col className="social-links">
                        <SocialLink href="youtube.com/ignwombat"><img src={YouTubeLogo} alt="YouTube" /></SocialLink>
                        <SocialLink href="discord.gg/YdJ345mXmK"><img src={DiscordLogo} alt="Discord" /></SocialLink>
                    </Col>
                </Row>

                <Row className="bottom">
                    <Row>
                        <Col>
                            <Row className="link-title">Pages</Row>
                            <Row><Link to="/">Home</Link></Row>
                            <Row><Link to="/about">About Me</Link></Row>
                            <Row><Link to="/projects">My projects</Link></Row>
                            <Row><Link to="/games">My games</Link></Row>
                            <Row><Link to="/secret">DON'T CLICK THIS LINK</Link></Row>
                        </Col>

                        <Col id="contact">
                            <Row className="link-title">Contact Me</Row>
                            <Row><a href="mailto::pvpdaimer@gmail.com">E-mail</a></Row>
                            <Row><p>Discord: Wombat#7485</p></Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row className="link-title">Games</Row>
                            <Row><Link to="/games/eirik-vs-adrian">Eirik Vs Adrian</Link></Row>
                        </Col>

                        <Col>
                            <Row className="link-title">Social Links</Row>
                            <Row><SocialLink href="youtube.com/ignwombat">YouTube</SocialLink></Row>
                            <Row><SocialLink href="soundcloud.com/ignwombat">SoundCloud</SocialLink></Row>
                            <Row><SocialLink href="ignwombat.newground.com">NewGrounds</SocialLink></Row>
                            <Row><SocialLink href="discord.gg/YdJ345mXmK">Discord Server</SocialLink></Row>
                        </Col>
                    </Row>
                </Row>
            </Container>

            <div className="discord-embed">
                <h3>My Discord Server:</h3>
                <DiscordEmbed width="300" height="400" />
            </div>

        </div>
    }
}