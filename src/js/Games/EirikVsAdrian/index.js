import Player from './player';
import Enemies from './enemies';
import InputHandler from './input';
import Screens from './screens';
import Dev from './dev';

export default class Game {
    constructor(props) {
        this.props = props;

        this.score = 0;
        this.scoreFloat = 0;

        this.sessionHighScore = 0;

        this.state = 'paused';

        this.player = new Player(this);
        this.enemyHandler = new Enemies(this);

        this.inputHandler = new InputHandler(this);

        this.screens = new Screens(this);

        this.dev = props.devmode ? new Dev(this) : undefined;
    }

    togglePause() {
        if (this.state !== 'running' && this.state !== 'paused') return;

        this.state = this.state === 'paused' ? 'running' : 'paused';
    }

    restart() {
        this.sessionHighScore = this.score > this.sessionHighScore ? this.score : this.sessionHighScore;
        this.scoreFloat = 0;

        this.player.reset();
        this.enemyHandler.reset();

        this.state = 'running';
    }

    update(dt) {
        if (this.state === 'gameover' || this.state === 'paused') return;
        this.player.update(dt);
        this.enemyHandler.update(dt);

        this.scoreFloat += dt / 1000;
        this.score = Math.floor(this.scoreFloat);
    }

    draw(ctx) {
        this.player.draw(ctx);
        this.enemyHandler.draw(ctx);

        if (this.screens[this.state]) this.screens[this.state](ctx);

        if (this.dev) {
            this.dev.drawHitboxes(ctx);
        }
    }
}