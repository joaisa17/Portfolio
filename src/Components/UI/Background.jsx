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

        this.ctx = undefined;

        if (!this.rest.width) this.rest.width = window.screen.width;
        if (!this.rest.height) this.rest.height = window.screen.height;

        this.loop = this.loop.bind(this);
        this.mounted = false;
    }

    

    loop(timeStamp) {
        deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        this.ctx.clearRect(0, 0, this.rest.width, this.rest.height);

        this.background.update(deltaTime);
        this.background.draw(this.ctx);
        
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
        
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') this.background = new this.variantClass({ctx: this.ctx, ...this.rest});
        });

        requestAnimationFrame(this.loop);
    }

    render() {
        return <canvas id="background-canvas" {...this.rest} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,

            width: '100%',
            height: '100%',

            filter: 'blur(0.25vh)'
        }} />
    }
}