import Player from './player';
import InputHandler from './input';

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

        this.player = new Player(this);

        this.inputHandler = new InputHandler(this);
    }

    update(dt) {
        this.player.update(dt);
    }

    draw(ctx) {
        this.player.draw(ctx);
    }

    restart() {

    }

    togglePause() {

    }

    gameOver() {

    }

    onResize(w, h) {

    }

    onUnmount() {
        this.terminated = true;
    }
}