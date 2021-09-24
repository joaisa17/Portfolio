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
    }

    drawObjectHitbox(ctx, obj) {
        if (obj.collisionRadius <= 0) return;
        ctx.beginPath();

        ctx.arc(obj.pos.x, obj.pos.y, obj.collisionRadius, 0, 2*Math.PI, false);

        ctx.fillStyle = 'rgba(255, 50, 50, 0.25)';
        ctx.fill();
    }

    drawHitboxes(ctx) {
        this.drawObjectHitbox(ctx, this.game.player);

        this.game.enemyHandler.enemies.forEach(enemy => {
            this.drawObjectHitbox(ctx, enemy);

            let collisionDistance = Math.floor((enemy.distanceFromPlayer() - (enemy.collisionRadius + this.game.player.collisionRadius)) * 1000) / 1000;
            collisionDistance = collisionDistance < 0 ? 0 : collisionDistance;

            ctx.font = '16px arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText(
                `D: ${collisionDistance}`,
                enemy.pos.x,
                enemy.pos.y - 40);
            
            ctx.fillText(
                `A: ${Math.floor(enemy.headingAngle)} / ${Math.floor(enemy.getFullHomingAngle())}`,
                enemy.pos.x,
                enemy.pos.y - 60
            )
        })
    }
}