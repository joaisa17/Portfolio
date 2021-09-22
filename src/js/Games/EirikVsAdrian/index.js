import Player from './player';
import Enemies from './enemies';
import InputHandler from './input';
import SoundHandler from './sound';
import Screens from './screens';
import Dev from './dev';

export default class Game {
    constructor(props) {
        this.props = props;

        console.log(props)

        this.score = 0;
        this.scoreFloat = 0;

        this.sessionHighScore = 0;
        this.swooshInterval = 10;

        this.state = 'paused';

        this.soundHandler = new SoundHandler(this);

        this.player = new Player(this);
        this.enemyHandler = new Enemies(this);

        this.inputHandler = new InputHandler(this);

        this.screens = new Screens(this);

        this.dev = props.devmode ? new Dev(this) : undefined;
    }

    gameOver() {
        if (this.state === 'gameover') return;

        this.state = 'gameover';

        this.soundHandler.onGameOver();
    }

    togglePause() {
        if (this.state !== 'running' && this.state !== 'paused') return;

        let toPause = this.state === 'running';

        if (toPause) {
            this.state = 'paused';
            this.soundHandler.onPause();
        }

        else {
            this.state = 'running';
            this.soundHandler.onUnpause();
        }
    }

    restart() {
        this.sessionHighScore = this.score > this.sessionHighScore ? this.score : this.sessionHighScore;
        this.scoreFloat = 0;

        this.player.reset();
        this.enemyHandler.reset();

        this.soundHandler.onRestart();

        this.state = 'running';
    }

    update(dt) {
        if (this.state === 'gameover' || this.state === 'paused') return;
        this.player.update(dt);
        this.enemyHandler.update(dt);

        this.scoreFloat += dt / 1000;

        if (this.score !== Math.floor(this.scoreFloat)) {
            this.score = Math.floor(this.scoreFloat);

            if (this.score % this.swooshInterval === 0 && this.score > 0) this.soundHandler.swoosh.play();
        }
    }

    draw(ctx) {
        this.player.draw(ctx);
        this.enemyHandler.draw(ctx);

        if (this.dev) {
            this.dev.drawHitboxes(ctx);
        }

        if (this.screens[this.state]) this.screens[this.state](ctx);
    }
}