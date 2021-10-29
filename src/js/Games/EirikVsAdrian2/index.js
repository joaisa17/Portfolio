import Player from './player';
import EnemyHandler from './enemies';
import InputHandler from './input';
import SoundHandler from './sound';
import Screens from './screens';
import Dev from './dev';
import Scene from './scene';

export default class Game {
    constructor(props) {
        this.terminated = false;
        this.gameoverDebounce = false;
        this.props = props;

        this.camera = {
            pos: {
                x: 0,
                y: 0
            }
        }

        this.scoreFloat = 0;
        this.score = 0;
        this.highScore = window.localStorage.getItem('EirikVsAdrian2HighScore') || 0;

        this.state = 'paused';

        this.soundHandler = new SoundHandler(this);

        this.scene = new Scene(this);

        this.player = new Player(this);
        this.enemyHandler = new EnemyHandler(this);
        this.inputHandler = new InputHandler(this);

        this.screens = new Screens(this);
        this.dev = new Dev(this);
    }

    update(dt) {
        if (this.player.dead) this.gameOver();

        if (this.state === 'paused' || this.state === 'gameover') return;
        this.player.update(dt);
        this.enemyHandler.update(dt);

        if (this.player.moving && !this.player.dying) {
            this.scoreFloat += dt / 1000;
            this.score = Math.floor(this.scoreFloat);
        }

        if (this.score % 10 === 0 && this.score > 0) this.soundHandler.onPlayerSwoosh();
    }

    draw(ctx) {
        this.scene.draw(ctx);
        this.player.draw(ctx);
        this.enemyHandler.draw(ctx);
        
        if (this.props.devmode) {
            this.dev.drawHitboxes(ctx);
        }

        if (this.screens[this.state]) this.screens[this.state](ctx);
    }

    restart() {
        if (this.score > this.highScore) this.highScore = this.score;

        this.gameoverDebounce = false;
        this.scoreFloat = 0;
        this.score = 0;

        this.player.reset();
        this.scene.reset();
        this.enemyHandler.reset();

        this.camera.pos = {
            x: 0,
            y: 0
        }

        this.state = 'running';
        this.soundHandler.onRestart();
    }

    onPause() {
        this.soundHandler.onPause();
    }

    onUnpause() {
        this.soundHandler.onUnpause();
    }

    togglePause(force) {
        if (
            (this.state !== 'running' && this.state !== 'paused')
            || this.player.dying
        ) return;

        let toPause = this.state === 'running';
        if (force !== undefined) toPause = force;

        if (toPause) {
            this.state = 'paused';
            this.onPause();
        }

        else {
            this.state = 'running';
            this.onUnpause();
        }
    }

    gameOver() {
        if (this.gameoverDebounce) return;

        this.gameoverDebounce = true;
        this.state = 'gameover';
        this.soundHandler.onGameOver();

        if (this.score > this.highScore) {
            window.localStorage.setItem('EirikVsAdrian2HighScore', this.score);
        }
    }

    onUnmount() {
        this.terminated = true;

        this.soundHandler.stopAllSounds();
    }
}