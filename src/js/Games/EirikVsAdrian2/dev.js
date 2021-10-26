export default class Dev {
    constructor(game) {
        this.game = game;
    }

    running(ctx) {
        let spawnTime = Math.floor(this.game.enemyHandler.getSpawnTime());

        ctx.textAlign = 'left';
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px arial';
        ctx.fillText(`Enemy spawn time: ${spawnTime}`, 20, 50);

        ctx.textAlign = 'center';
        ctx.fillText(`A: ${this.game.player.headingAngle}`, this.game.player.pos.x, this.game.player.pos.y - 60);
    }

    drawObjectHitbox(ctx, obj) {
        if (obj.collisionRadius <= 0) return;
        ctx.beginPath();

        ctx.arc(obj.pos.x - this.game.camera.pos.x, obj.pos.y - this.game.camera.pos.y, obj.collisionRadius, 0, 2*Math.PI, false);

        ctx.fillStyle = 'rgba(255, 50, 50, 0.25)';
        ctx.fill();
    }

    drawHitboxes(ctx) {
        this.drawObjectHitbox(ctx, this.game.player);
    }
}