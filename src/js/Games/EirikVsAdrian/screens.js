export default class Screens {
    constructor(game) {
        this.game = game;

        this.gw = this.game.props.gameWidth;
        this.gh = this.game.props.gameHeight;
    }

    background(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, .5)';
        ctx.fillRect(0, 0, this.gw, this.gh);
    }

    titleWithSub(ctx, title, subtitle) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 64px arial';
        ctx.textAlign = 'center';

        ctx.fillText(title, this.gw / 2, this.gh / 2);

        ctx.font = 'normal 32px arial';
        ctx.fillText(subtitle, this.gw / 2, this.gh / 2 + 50)
    }

    paused(ctx) {
        this.background(ctx);

        this.titleWithSub(
            ctx,
            'PAUSED',
            `Press ${this.game.inputHandler.keyBinds.pause} to continue`
        )
    }

    gameover(ctx) {
        this.background(ctx);

        this.titleWithSub(
            ctx,
            'GAME OVER',
            `Press ${this.game.inputHandler.keyBinds.restart.replace('Key', '')} to restart`
        );
    }
}