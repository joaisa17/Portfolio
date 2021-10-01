import WebSocketHandler from './socket.js';
import InputHandler from './input.js';

export default class Game {
    constructor(props) {
        this.terminated = false;
        this.props = props;

        this.webSocketHandler = new WebSocketHandler(this);
        this.inputHandler = new InputHandler(this);
    }

    onUnmount() {
        this.terminated = true;
    }

    togglePause() {
        
    }

    update(dt) {
        
    }

    draw(ctx) {

    }
}