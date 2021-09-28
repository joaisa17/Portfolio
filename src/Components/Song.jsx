import React from 'react'

import { Howl } from 'howler';
import { Row, Col } from 'react-bootstrap';

import '@css/Components/Song.css';

import { PlayButton, PauseButton, RepeatButton, AudioUnmuted, AudioMuted } from 'src/Media/svg/ui';

export default class Song extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            timePosition: 0,

            minVolume: 0.001,
            volume: 0.5,
            mute: false,

            loop: false
        }

        this.sound = new Howl({
            src: props.src,
            volume: this.state.volume,

            onend: () => {
                if (!this.state.loop) {
                    this.setState({
                        playing: false
                    });
                }
            }
        });

        this.setTimePosition = this.setTimePosition.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.setMute = this.setMute.bind(this);

        this.togglePause = this.togglePause.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
    }

    setTimePosition(t) {
        this.sound.seek(t);
        this.setState({timePosition: t});
    }

    setVolume(v) {
        this.sound.mute(v < this.state.minVolume);

        this.sound.volume(v);
        this.setState({
            volume: v,
            mute: v < this.state.minVolume
        });
    }

    setMute(v) {
        if (this.sound.volume() < this.state.minVolume) return;
        this.sound.mute(v);
        this.setState({mute: v});
    }

    togglePause(force) {
        const newState = force !== true && force !== false ? !this.sound.playing() : force;

        this.setState({
            playing: newState
        });

        return newState ? this.sound.play() : this.sound.pause();
    }

    toggleLoop(force) {
        const newState = force !== true && force !== false ? !this.sound.loop() : force;

        this.setState({
            loop: newState
        });

        this.sound.loop(newState);
    }

    componentDidMount() {
        setInterval(() => {
            if (this.sound.playing()) this.setState({
                playing: true
            });

            if (this.state.playing) this.setState({
                timePosition: this.sound.seek()
            });
        }, 1);
    }

    componentWillUnmount() {
        this.sound.stop();
    }

    render() {
        return <Row className="song">

            <Row className="media-controls">
                <Col className={`toggle-pause-button ${this.state.playing ? 'playing' : 'paused'}`}>
                    <img height="32" src={this.state.playing ? PauseButton : PlayButton} onClick={this.togglePause} alt="Play/Pause" />
                </Col>

                <Col>
                    <input
                        className="time-slider"
                        type="range"
                        min="0"
                        max={this.sound.duration()}
                        value={this.state.timePosition}
                        step={this.sound.duration() / 1000}
                        onChange={e => {
                            this.setTimePosition(e.target.value)
                        }}
                        
                        onMouseDown={() => {this.sound.pause()}}
                        onMouseUp={() => {if (this.state.playing) this.sound.play()}}
                    />
                </Col>

                <Col className="toggle-repeat-button">
                    <RepeatButton height="32" loop={this.state.loop} onClick={this.toggleLoop} />
                </Col>
            </Row>


            <Row className="bottom-row">
                <Col>
                    <Row className="title"><h5>{this.props.title}</h5></Row>
                    <Row className="date"><h6>{this.props.date}</h6></Row>
                </Col>

                <Col>
                    <Row className="volume-controls">
                        <Col className="toggle-mute-button">
                            <img
                                alt="Mute/Unmute"
                                height="100%"
                                src={this.state.mute ? AudioMuted : AudioUnmuted}
                                onClick={() => {this.setMute(!this.state.mute)}}
                            />
                        </Col>

                        <Col>
                            <input 
                                className="volume-slider"
                                type="range"
                                min="0"
                                max="1"
                                value={this.state.volume}
                                step={1 / 1000}
                                onChange={e => {
                                    this.setVolume(e.target.value);
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    }
}