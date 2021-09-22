import React from 'react'

import '../css/Components/GameWithCanvas.css';

import { Row, Col } from 'react-bootstrap';
import { FullscreenButton } from '../media/svg/ui';

const preventScrollingKeys = [
    'Space',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    
    // For compatibility with older browsers
    32,
    37,
    38,
    39,
    40
]

export default class GameWithCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.gameWidth = 800;
        this.gameHeight = 800;

        this.game = undefined;

        this.mounted = false;
        this.ctx = undefined;
        this.lt = 0;

        this.gameLoop = this.gameLoop.bind(this);
        this.preventScroll = this.preventScroll.bind(this);
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
    }

    toggleFullScreen() {
        let container = document.getElementById('game-container');
        if (!container) return;

        if (document.fullscreenElement !== null) document.exitFullscreen();
        else container.requestFullscreen();
    }

    preventScroll(e) {
        if (preventScrollingKeys.indexOf(e.code) > -1 || preventScrollingKeys.indexOf(e.keyCode) > -1) e.preventDefault();
    }

    gameLoop(ts) {
        if (!this.mounted) return;
        let dt = ts - this.lt;
        this.lt = ts;

        if (dt && this.ctx) {
            this.game.update(dt);

            this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
            this.game.draw(this.ctx);
        }

        requestAnimationFrame(this.gameLoop);
    }

    componentDidMount() {

        this.mounted = true;

        let canvas = document.getElementById('game-canvas');
        if (!canvas) return;

        this.game = new this.props.game({
            gameWidth: this.gameWidth,
            gameHeight: this.gameHeight,
            canvas: canvas,
            ...this.props
        });

        this.ctx = canvas.getContext('2d');

        // Event listeners, for ergonomics and cheat prevention

        window.addEventListener('keydown', e => {
            if (e.code === 'KeyF') this.toggleFullScreen();
            else this.preventScroll(e);
        }, false);

        window.addEventListener('blur', () => {
            if (this.game && this.game.state !== 'paused') this.game.togglePause();
        });

        requestAnimationFrame(this.gameLoop);
    }

    componentWillUnmount() {
        this.game.onUnmount();
        this.mounted = false;
        window.removeEventListener('keydown', this.preventScroll)
    }

    render() {
        return <div id="game-container" className="game-container mx-auto" style={{width: this.gameWidth, height: this.gameHeight}}>

            <div className="inner-container">
                <canvas id="game-canvas" className="game-canvas mx-auto" width={this.gameWidth} height={this.gameHeight} />

                <div className="bottom-ui">
                    <Row className="float-end">
                        <Col><img src={FullscreenButton} className="toggle-fullscreen-button" alt="Toggle Fullscreen" onClick={this.toggleFullScreen} /></Col>
                    </Row>
                </div>
            </div>
        </div>
    }
}