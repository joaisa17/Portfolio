export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.plr = game.player;

        this.keyBinds = {
            jump: ['KeyW', 'ArrowUp'],

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
        if (this.game.terminated) return;
        if (this.keyIsKeyBind(code, this.keyBinds.jump)) this.plr.jump();

        else if (this.keyIsKeyBind(code, this.keyBinds.sprint)) this.plr.setSprint(true);

        else if (this.keyIsKeyBind(code, this.keyBinds.restart)) {
            if (this.game.state === 'gameover') this.game.restart();
            else if (this.game.state === 'running' && this.game.props.devmode) this.game.gameOver();
        }

        else if (this.keyIsKeyBind(code, this.keyBinds.pause)) this.game.togglePause();
    }

    onKeyUp(code) {
        if (this.game.terminated) return;
        if (this.keyIsKeyBind(code, this.keyBinds.moveUp)) this.plr.stopMove('up');
        else if (this.keyIsKeyBind(code, this.keyBinds.moveDown)) this.plr.stopMove('down');
        else if (this.keyIsKeyBind(code, this.keyBinds.moveLeft)) this.plr.stopMove('left');
        else if (this.keyIsKeyBind(code, this.keyBinds.moveRight)) this.plr.stopMove('right');

        else if (this.keyIsKeyBind(code, this.keyBinds.sprint)) this.plr.setSprint(false);
    }
}