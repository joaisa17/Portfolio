export default class Screens {
    constructor(game) {
        this.game = game;

        this.gw = this.game.props.gameWidth;
        this.gh = this.game.props.gameHeight;
    }

    drawCenteredText(ctx, text, y) {
        ctx.textAlign = 'center'
        ctx.fillText(text, this.gw / 2, y);
    }

    background(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, .5)';
        ctx.fillRect(0, 0, this.gw, this.gh);
    }

    titleWithSubtitles(ctx, title, subtitles) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 64px arial';
        ctx.textAlign = 'center';

        this.drawCenteredText(ctx, title, this.gh / 2);



        for(var i = 0; i < subtitles.length; i++) {
            ctx.font = `normal ${40 - i * 8}px arial`;

            this.drawCenteredText(ctx, subtitles[i], this.gh / 2 + 50 + 40 * (i))
        }
    }

    running(ctx, dt) {
        ctx.fillStyle = 'white';
        ctx.font = 'normal 32px arial'
        ctx.textAlign = 'center';

        this.drawCenteredText(ctx, `Score: ${this.game.score}`, this.gh - 48);
    }

    paused(ctx) {
        this.background(ctx);

        this.titleWithSubtitles(
            ctx,
            'PAUSED',
            [`Press ${this.game.inputHandler.keyBinds.pause} to continue`]
        );
    }

    gameover(ctx) {
        this.background(ctx);

        let subtitles = [
            `Score: ${this.game.score}`,
            this.game.score > this.game.sessionHighScore ? 'NEW SESSION HIGH SCORE!' : `Session High Score: ${this.game.sessionHighScore}`,
            `Press ${this.game.inputHandler.keyBinds.restart.replace('Key', '')} to restart`
        ];

        this.titleWithSubtitles(ctx, 'GAME OVER', subtitles);
    }
}