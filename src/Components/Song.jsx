import React from 'react'

import { Howl } from 'howler';
import { Row, Col } from 'react-bootstrap';

import '@css/Components/Song.css';

import { PlayButton, PauseButton, RepeatButton } from 'src/Media/svg/ui';

export default class Song extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            timePosition: 0,
            volume: 0.5,

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

        this.togglePause = this.togglePause.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
    }

    setTimePosition(t) {
        this.sound.seek(t);
        this.setState({timePosition: t});
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
            if (this.state.playing) this.setState({
                timePosition: this.sound.seek()
            })
        }, 1);
    }

    render() {
        return <Row className="song">

            <Row className="media-controls">
                <Col>
                    <img className="toggle-pause-button" src={this.state.playing ? PauseButton : PlayButton} onClick={this.togglePause} alt="Play/Pause" />
                </Col>

                <Col>
                    <input
                        className="slider"
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

                <Col>
                    <RepeatButton className="toggle-repeat-button" loop={this.state.loop} onClick={this.toggleLoop} />
                </Col>
            </Row>


            <Row className="media-info">
                <Row className="title"><h5>{this.props.title}</h5></Row>
                <Row className="date"><h6>{this.props.date}</h6></Row>
            </Row>
        </Row>
    }
}

/*export default function Song(props) {

    const [state, setState] = useState({
        sound: new Howl({src: props.src}),
        playing: false,
        timePosition: defaultData.timePosition
    });

    useEffect(() => {

    });

    let setPlaying = bool => {
        setState(bool);
        return bool ? state.sound.play() : state.sound.pause();
    }

    let setTimePos = t => {
        state.sound.seek(state.sound.duration() * t);
    }

    let setVolume = v => {
        state.sound.volume(v);
    }

    return <Row className="song">
        <img width="50" height="50" onClick={() => {setPlaying(!state.playing)}} src={state.playing ? PauseButton : PlayButton} />
        <input type="range" defaultValue={state.timePosition || defaultData.timePosition} min="0" max="1" step=".005" onChange={e => {setTimePos(e.target.value)}} />
        <input type="range" defaultValue={defaultData.volume} min="0" max="0.5" step=".005" onChange={e => {setVolume(e.target.value)}} />
        {props.title}
    </Row>
}*/
