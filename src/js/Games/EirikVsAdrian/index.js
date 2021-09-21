import Player from './player';
import Enemies from './enemies';
import InputHandler from './input';
import Screens from './screens';

export default class Game {
    constructor(props) {
        console.log('Game constructed')
        this.props = props;

        this.state = 'paused';

        this.player = new Player(this);
        this.enemyHandler = new Enemies(this);

        this.inputHandler = new InputHandler(this);

        this.screens = new Screens(this);
    }

    restart() {
        console.log('restart');

        this.player.reset();
        this.enemyHandler.reset();

        this.state = 'running';
    }

    update(dt) {
        if (this.state === 'gameover' || this.state === 'paused') return;
        this.player.update(dt);
        this.enemyHandler.update(dt);
    }

    draw(ctx) {
        this.player.draw(ctx);
        this.enemyHandler.draw(ctx);

        if (this.screens[this.state]) this.screens[this.state](ctx);
    }
}