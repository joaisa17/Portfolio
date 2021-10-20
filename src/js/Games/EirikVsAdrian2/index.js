export default class Game {
    constructor(props) {
        this.terminated = false;
        this.props = props;
    }

    update(dt) {

    }

    draw(ctx) {

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