export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.plr = game.player;

        this.keyBinds = {
            moveUp: ['KeyW', 'ArrowUp'],
            moveDown: ['KeyS', 'ArrowDown'],
            moveLeft: ['KeyA', 'ArrowLeft'],
            moveRight: ['KeyD', 'ArrowRight'],

            sprint: ['ShiftLeft', 'ShiftRight'],

            restart: 'KeyR',
            pause: 'Space',

            test: 'KeyT'
        }

        this.keyStates = {};

        document.addEventListener('keydown', event => {
            const state = this.keyStates[event.code];
            if (state !== true) this.onKeyDown(event.code);

            this.keyStates[event.code] = true;
        });

        document.addEventListener('keyup', event => {
            const state = this.keyStates[event.code];
            if (state) this.onKeyUp(event.code);

            this.keyStates[event.code] = false;
        });
    }

    keyIsKeyBind(key, keybind) {
        if (typeof(keybind) === 'object') return keybind.includes(key);

        return key === keybind;
    }

    onKeyDown(code) {
        if (this.game.terminated) return;

        if (this.keyIsKeyBind(code, this.keyBinds.test)) this.game.webSocketHandler.sendUpdate('test');
    }

    onKeyUp(code) {
        if (this.game.terminated) return;
    }
}