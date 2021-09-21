class Enemy {
    constructor(game) {
        this.game = game;

        this.pos = {
            x: 10,
            y: 50
        }

        this.vel = {
            x: 10,
            y: 1.
        }

        this.size = 32;
        this.collisionRadius = 30;

        this.imageSizeOffset = 36;

        this.imageSrc = document.getElementById('assets/adrian');
    }

    distanceFromPlayer() {
        let dx = this.game.player.pos.x - this.pos.x;
        let dy = this.game.player.pos.y - this.pos.y;

        return Math.sqrt(
            dx*dx + dy*dy
        );
    }

    detectCollision() {
        return Math.abs(this.distanceFromPlayer()) <= this.collisionRadius + this.game.player.collisionRadius;
    }

    update(dt) {
        this.pos.x += this.vel.x * dt / 100;
        this.pos.y += this.vel.y * dt / 100;

        if (this.detectCollision()) this.game.state = 'gameover';
    }

    draw(ctx) {
        ctx.font = '16px arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(Math.floor((this.distanceFromPlayer() - (this.collisionRadius + this.game.player.collisionRadius)) * Math.pow(10, 3)) / Math.pow(10, 3), this.pos.x, this.pos.y - 40);

        ctx.drawImage(
            this.imageSrc,
            this.pos.x - (this.size + this.imageSizeOffset) / 2,
            this.pos.y - (this.size + this.imageSizeOffset) / 2,
            this.size + this.imageSizeOffset,
            this.size + this.imageSizeOffset
        )

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.collisionRadius, 0, 2*Math.PI, false);

        ctx.fillStyle = 'rgba(255, 100, 100, .5)';
        ctx.fill();
    }
}

export default class Enemies {
    constructor(game) {
        this.game = game;

        this.enemies = [];

        this.createEnemy();
    }

    createEnemy() {
        this.enemies.push(new Enemy(this.game));
    }

    reset() {
        this.enemies = [];

        this.createEnemy();
    }

    update(dt) {
        this.enemies.forEach(enemy => {
            enemy.update(dt);
        });
    }

    draw(ctx) {
        this.enemies.forEach(enemy => {
            enemy.draw(ctx);
        });
    }
}