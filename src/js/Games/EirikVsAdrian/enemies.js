class Enemy {
    constructor(game) {
        this.game = game;

        this.toRemove = false;

        this.gw = this.game.props.gameWidth;
        this.gh = this.game.props.gameHeight;

        this.minSpeed = 10;
        this.speedMultiplier = 0.8;

        this.size = 56;
        this.collisionRadius = 40;

        this.imageSizeOffset = 28;
        
        this.imageSrc = document.createElement('img');
        this.imageSrc.setAttribute('src', this.game.props.assets.img.adrian);

        this.originFace = Math.max(
            Math.floor(Math.random() * 4 + 0.5),
            1
        );

        this.pos = {
            x: 0,
            y: 0
        }

        this.pos = (
            this.originFace <= 2 ? { // Top / Bottom
                x: Math.random() * this.gw,
                y: this.originFace === 1 ? -this.imageSizeOffset * 2 : this.gh + this.imageSizeOffset * 2
            } : { // Left / Right
                x: this.originFace === 3 ? -this.imageSizeOffset * 2 : this.gw + this.imageSizeOffset * 2,
                y: Math.random() * this.gh
            }
        );

        this.vel = (
            this.originFace <= 2 ? { // Top / Bottom
                x: Math.random() * this.gw / 30,
                y: this.originFace === 1 ? Math.random() * this.gh / 10 + this.minSpeed : -Math.random() * this.gh / 10 - this.minSpeed
            } : { // Left / Right
                x: this.originFace === 3 ? Math.random() * this.gw / 10 + this.minSpeed : -Math.random() * this.gw / 10 - this.minSpeed,
                y: Math.random() * this.gh / 30
            }
        );
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
        this.pos.x += (this.vel.x * dt / 100) * this.speedMultiplier;
        this.pos.y += (this.vel.y * dt / 100) * this.speedMultiplier;

        switch(this.originFace) {
            
            case 1:
                if (this.pos.y - this.imageSizeOffset * 2 > this.gh) this.toRemove = true;
            break;

            case 2:
                if (this.pos.y + this.imageSizeOffset * 2 < 0) this.toRemove = true;
            break;

            case 3:
                if (this.pos.x - this.imageSizeOffset * 2 > this.gw) this.toRemove = true;
            break;

            case 4:
                if (this.pos.x + this.imageSizeOffset * 2 < 0) this.toRemove = true;
            break;

            default: break;
        }

        if (this.detectCollision() && !this.game.props.devmode) {
            this.game.gameOver();
        }
    }

    draw(ctx) {

        ctx.drawImage(
            this.imageSrc,
            this.pos.x - (this.size + this.imageSizeOffset) / 2,
            this.pos.y - (this.size + this.imageSizeOffset) / 2,
            this.size + this.imageSizeOffset,
            this.size + this.imageSizeOffset
        )
    }
}

export default class Enemies {
    constructor(game) {
        this.game = game;

        this.enemies = [];
    }

    createEnemy() {
        if (this.game.state !== 'running') return;

        setTimeout(() => {
            this.enemies.push(new Enemy(this.game));
            this.game.soundHandler.onEnemySpawn();
        }, Math.random());
    }

    reset() {
        this.enemies = [];

        this.createEnemy();
    }

    update(dt) {
        this.enemies.forEach(enemy => {
            enemy.update(dt);

            if (enemy.toRemove) this.enemies.splice(this.enemies.indexOf(enemy), 1);
        });

        if (Math.floor(Math.random() + this.game.scoreFloat / 1000) >= 1) this.createEnemy();
    }

    draw(ctx) {
        this.enemies.forEach(enemy => {
            enemy.draw(ctx);
        });
    }
}