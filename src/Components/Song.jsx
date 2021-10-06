import React, { useState, useEffect } from 'react';

import { Howl } from 'howler';
import { Row, Col } from 'react-bootstrap';

import { PlayButton, PauseButton, RepeatButton, AudioUnmuted, AudioMuted } from 'src/Media/svg/ui';

import '@css/Components/Song.css';

const Song = props => {

    const [sound, setSound] = useState();

    const [playing, setPlaying] = useState(false);
    const [timePosition, setTimePosition] = useState(0);
    const [volume, setVolume] = useState(props.volume || 0.5);
    const [mute, setMute] = useState(props.mute || false);
    const [loop, setLoop] = useState(props.loop || false);

    const [changingTime, setChangingTime] = useState(false);
    const [changingVolume, setChangingVolume] = useState(false);

    useEffect(() => {
        const s = new Howl({
            src: props.src,
            volume: props.volume || 0.5,
            mute: props.mute || false,
            loop: props.loop || false,
            onend: () => {
                setPlaying(s.loop() && s.playing())
            }
        });

        setSound(s);

        const interval = () => {
            if (s.playing()) setTimePosition(s.seek());
        }

        setInterval(interval, s.duration() / 2000);

        return () => {
            s.unload();
            clearInterval(interval);
        }
    }, [props]);
    
    if (!sound) return <React.Fragment />

    if (playing) {
        if (changingTime) {
            sound.pause();
            sound.seek(timePosition);
        }
        else if (!changingVolume && !sound.playing()) sound.play();

        if (changingVolume) {
            sound.volume(volume);
            sound.mute(volume < 0.01);
        }
    }

    else sound.pause();

    const duration = sound.duration();

    return <Row className="song">
        <Row className="media-controls">
            <Col className={`toggle-pause-button ${playing ? 'playing' : 'paused'}`}>
                <img height="32" src={playing ? PauseButton : PlayButton} onClick={() => setPlaying(!playing)} alt="Play/Pause" />
            </Col>

            <Col>
                <input
                    className="time-slider"
                    type="range"
                    min="0"
                    max={duration}
                    value={timePosition}
                    step={duration / 1000}
                    onChange={e => setTimePosition(e.target.value)}
                    
                    onMouseDown={() => setChangingTime(true)}
                    onMouseUp={() => setChangingTime(false)}
                />
            </Col>

            <Col className="toggle-repeat-button">
                <RepeatButton height="32" loop={loop} onClick={() => {sound.loop(!loop); setLoop(!loop);}} />
            </Col>
        </Row>

        <Row className="bottom-row">
            <Col>
                <Row className="title"><h5>{props.title}</h5></Row>
                <Row className="date"><h6>{props.date}</h6></Row>
            </Col>

            <Col>
                <Row className="volume-controls">
                    <Col className="toggle-mute-button">
                        <img
                            alt="Mute/Unmute"
                            height="100%"
                            src={mute ? AudioMuted : AudioUnmuted}
                            onClick={() => {
                                if (sound.volume() < 0.01) return;
                                sound.mute(!mute);
                                setMute(!mute);
                            }}
                        />
                    </Col>

                    <Col>
                        <input 
                            className="volume-slider"
                            type="range"
                            min="0"
                            max="1"
                            value={volume}
                            step={1 / 1000}
                            onChange={e => {
                                const v = e.target.value;

                                setVolume(v);
                                setMute(v < 0.01);
                            }}

                            onMouseDown={() => setChangingVolume(true)}
                            onMouseUp={() => setChangingVolume(false)}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    </Row>
}

export default Song;