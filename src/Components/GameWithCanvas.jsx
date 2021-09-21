import React from 'react'

import '../css/Components/GameWithCanvas.css';

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
    }

    gameLoop(ts) {
        if (this.lt === 0) this.lt = ts;
        let dt = ts - this.lt;
        this.lt = ts;

        if (dt && this.ctx) {
            this.game.update(dt);

            this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
            this.game.draw(this.ctx);
        }

        if (this.mounted) requestAnimationFrame(this.gameLoop);
    }

    componentDidMount() {

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

        this.mounted = true;

        this.game = new this.props.game({
            gameWidth: this.gameWidth,
            gameHeight: this.gameHeight,
            ...this.props
        });

        let canvas = document.getElementById('game-canvas');
        if (!canvas) return;

        this.ctx = canvas.getContext('2d');

        // Event listeners, for ergonomics and cheat prevention
        window.addEventListener('keydown', e => {
            if(preventScrollingKeys.indexOf(e.code) > -1 || preventScrollingKeys.indexOf(e.keyCode) > -1) e.preventDefault() || window.event.preventDefault()
        }, false);

        window.addEventListener('blur', () => {
            if (this.game && this.game.state !== 'paused') this.game.togglePause();
        });

        requestAnimationFrame(this.gameLoop);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <canvas id="game-canvas" className="game-canvas mx-auto mt-4" width={this.gameWidth} height={this.gameHeight} />
    }
}