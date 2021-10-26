import Player from './player';
import InputHandler from './input';
import Screens from './screens';
import Dev from './dev';
import Scene from './scene';

export default class Game {
    constructor(props) {
        this.terminated = false;
        this.props = props;

        this.camera = {
            pos: {
                x: 0,
                y: 0
            }
        }

        this.state = 'paused';

        this.player = new Player(this);
        this.inputHandler = new InputHandler(this);
        this.screens = new Screens(this);
        this.scene = new Scene(this);
        this.dev = new Dev(this);
    }

    update(dt) {
        if (this.player.dead) this.state = 'gameover';

        if (this.state === 'paused' || this.state === 'gameover') return;
        this.player.update(dt);
    }

    draw(ctx) {
        this.scene.draw(ctx);
        this.player.draw(ctx);
        
        if (this.props.devmode) {
            this.dev.drawHitboxes(ctx);
        }

        if (this.screens[this.state]) this.screens[this.state](ctx);
    }

    restart() {
        this.player.reset();
        this.scene.reset();

        this.camera.pos = {
            x: 0,
            y: 0
        }

        this.state = 'running';

    }

    onPause() {
        
    }

    onUnpause() {
        
    }

    togglePause(force) {
        if (this.state !== 'running' && this.state !== 'paused') return;

        let toPause = this.state === 'running';
        if (force !== undefined) toPause = force;

        if (toPause) {
            this.state = 'paused';
            //this.soundHandler.onPause();
        }

        else {
            this.state = 'running';
            //this.soundHandler.onUnpause();
        }
    }

    gameOver() {
        this.state = 'gameover';
    }

    onUnmount() {
        this.terminated = true;
    }
}