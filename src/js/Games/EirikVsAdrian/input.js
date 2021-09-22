export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.plr = game.player;

        this.keyBinds = {
            moveUp: ['KeyW', 'ArrowUp'],
            moveDown: ['KeyS', 'ArrowDown'],
            moveLeft: ['KeyA', 'ArrowLeft'],
            moveRight: ['KeyD', 'ArrowRight'],

            restart: 'KeyR',
            pause: 'Space',
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
        if (this.keyIsKeyBind(code, this.keyBinds.moveUp)) this.plr.move('up');
        else if (this.keyIsKeyBind(code, this.keyBinds.moveDown)) this.plr.move('down');
        else if (this.keyIsKeyBind(code, this.keyBinds.moveLeft)) this.plr.move('left');
        else if (this.keyIsKeyBind(code, this.keyBinds.moveRight)) this.plr.move('right');

        else if (this.keyIsKeyBind(code, this.keyBinds.restart) && this.game.state === 'gameover') this.game.restart();
        else if (this.keyIsKeyBind(code, this.keyBinds.pause)) this.game.togglePause();
    }

    onKeyUp(code) {
        if (this.keyIsKeyBind(code, this.keyBinds.moveUp)) this.plr.stopMove('up');
        else if (this.keyIsKeyBind(code, this.keyBinds.moveDown)) this.plr.stopMove('down');
        else if (this.keyIsKeyBind(code, this.keyBinds.moveLeft)) this.plr.stopMove('left');
        else if (this.keyIsKeyBind(code, this.keyBinds.moveRight)) this.plr.stopMove('right');
    }
}