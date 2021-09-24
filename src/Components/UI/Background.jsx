import React from 'react'

import * as Variants from '../../js/Backgrounds';

var deltaTime = 0;
var lastTime = 0;

export default class Background extends React.Component {
    constructor({variant, ...rest}) {
        super();

        this.variant = `${variant.charAt(0).toUpperCase()}${variant.slice(1)}`;
        this.variantClass = Variants[this.variant]

        this.rest = {...rest}

        this.background = undefined;
        this.ctx = undefined;

        if (!this.rest.width) this.rest.width = window.screen.width;
        if (!this.rest.height) this.rest.height = window.screen.height;

        this.mounted = false;
        this.paused = false;

        this.loop = this.loop.bind(this);
        this.pauseBackground = this.pauseBackground.bind(this);
    }

    pauseBackground() {
        this.paused = true;
        if (this.background.onPause) this.background.onPause();
    }

    unpauseBackground() {
        this.paused = false;
        if (this.background.onUnpause) this.background.onUnpause();
    }
    

    loop(timeStamp) {
        if (!this.paused) {
            deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;

            this.ctx.clearRect(0, 0, this.rest.width, this.rest.height);

            this.background.update(deltaTime);
            this.background.draw(this.ctx);
        }
        
        if (!this.mounted) return;
        requestAnimationFrame(this.loop);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        if (!Variants[this.variant]) return;

        this.mounted = true;
        
        let canvas = document.getElementById('background-canvas');
        this.ctx = canvas.getContext('2d');

        this.background = new this.variantClass({ctx: this.ctx, ...this.rest});

        document.addEventListener('blur', this.pauseBackground);

        document.addEventListener('focus', this.unpauseBackground);

        requestAnimationFrame(this.loop);
    }

    render() {
        return <canvas id="background-canvas" className="background-canvas" {...this.rest} />
    }
}