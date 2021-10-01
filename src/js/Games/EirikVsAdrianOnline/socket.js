import socketIOClient from 'socket.io-client';

function dataIsJSON(data) {
    try {
        JSON.parse(data);
    }

    catch {
        return false;
    }

    return true;
}

export default class WebSocketHandler {
    constructor(game) {
        this.game = game;

        this.url = 'ws://localhost:3000';

        this.socket = socketIOClient(this.url);

        var updateFunction = data => {
            if (this.game.terminated) {
                this.socket.off('update', updateFunction);
                this.socket.close();
            }

            this.onUpdate(dataIsJSON(data) ? JSON.parse(data) : data);
        }

        this.socket.on('update', updateFunction);
    }

    onUpdate(data) {
        console.log(data);
    }

    sendUpdate(data) {
        this.socket.emit('update', dataIsJSON(data) ? JSON.parse(data) : data);
    }
}