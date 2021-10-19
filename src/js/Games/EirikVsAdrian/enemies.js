function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function translate(angle) {
    return {
        x: Math.sin(angle / 180 * Math.PI),
        y: -Math.cos(angle / 180 * Math.PI)
    }
}

class Enemy {
    constructor(game, props) {
        this.game = game;
        this.props = props

        this.removing = false;
        this.toRemove = false;
        this.removalMultiplier = 0.5;

        this.gw = this.game.props.gameWidth;
        this.gh = this.game.props.gameHeight;

        this.minSpeed = 10;
        this.maxSpeed = 100;

        this.speedMultiplier = 0.8;

        this.maxHomingSpeed = 10;
        this.homingMultiplier = 2.5;

        this.size = 40;
        this.collisionRadius = 40;

        this.imageSizeOffset = 36;
        
        this.imageSrc = document.createElement('img');
        this.imageSrc.setAttribute('src', this.game.props.assets.img.adrian);

        this.headingAngle = Math.random() * 360;
        this.translation = translate(this.headingAngle);

        this.spawnDistance = Math.max(this.gw / 2, this.gh / 2) + 200;

        this.pos = {
            x: this.gw / 2 - this.spawnDistance * this.translation.x,
            y: this.gh / 2 - this.spawnDistance * this.translation.y
        }

        this.vel = {
            x: Math.max(Math.random() * this.maxSpeed, this.minSpeed) * this.translation.x,
            y: Math.max(Math.random() * this.maxSpeed, this.minSpeed) * this.translation.y
        }

        setTimeout(() => {this.removing = true}, Math.random() * 3000 + 2000);
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

    getHomingNumber() {
        let d = this.distanceFromPlayer();

        return Math.min((d * Math.pow(this.game.scoreFloat, 1.09)) * (this.homingMultiplier / 100000), this.maxHomingSpeed);
    }

    getFullHomingAngle() {
        const plrPos = this.game.player.pos;
        return 90 + Math.atan2(
            plrPos.y - this.pos.y,
            plrPos.x - this.pos.x
        ) * 180 / Math.PI
    }

    update(dt) {
        this.pos.x += (this.vel.x * dt / 100) * this.speedMultiplier;
        this.pos.y += (this.vel.y * dt / 100) * this.speedMultiplier;

        const homingTranslation = translate(this.getFullHomingAngle());
        
        this.vel.x += homingTranslation.x * this.getHomingNumber();
        this.vel.y += homingTranslation.y * this.getHomingNumber();

        if (this.detectCollision()) {
            if (!this.game.props.devmode) this.game.gameOver();
            else this.game.soundHandler.death.play();
        }

        if (this.removing) {
            const toSubtract = dt / (this.size + 0.01) * this.removalMultiplier;
            this.size -= toSubtract;
            this.imageSizeOffset = Math.max(this.imageSizeOffset - toSubtract * 2, 0);
            this.collisionRadius = Math.max(this.collisionRadius - toSubtract * 2, 1);

            if (this.size + this.imageSizeOffset <= 0) {
                this.toRemove = true;
            }
        }
    }

    draw(ctx) {
        // Draw helping line

        let plrPos = this.game.player.pos;

        ctx.lineWidth = clamp(
            8 / Math.max(1 / 50, this.distanceFromPlayer() / 300),
            0, this.size + this.imageSizeOffset
        );

        ctx.strokeStyle = `rgba(255, 100, 100, ${clamp(ctx.lineWidth / 60, 0, this.size + this.imageSizeOffset)})`;
        
        ctx.beginPath();
        ctx.moveTo(plrPos.x, plrPos.y);
        ctx.lineTo(this.pos.x, this.pos.y);
        ctx.stroke();

        // Draw enemy
        ctx.drawImage(
            this.imageSrc,
            this.pos.x - (this.size + this.imageSizeOffset) / 2,
            this.pos.y - (this.size + this.imageSizeOffset) / 2,
            this.size + this.imageSizeOffset,
            this.size + this.imageSizeOffset
        );
    }
}

export default class Enemies {
    constructor(game) {
        this.game = game;

        this.enemies = [];

        this.spawnTimeout = undefined;

        this.spawnTime = 0;

        this.maxSpawnTime = 3000;
        this.minSpawnTime = 250;

        this.screenArea = this.game.props.gameWidth * this.game.props.gameHeight;
    }

    getSpawnTime() {
        let score = this.game.scoreFloat;
        let screenAreaFloat = this.screenArea / Math.pow(10, 6.5);
        
        return Math.max(
            this.maxSpawnTime / (1 + Math.pow(score, 2) / 5000 + screenAreaFloat / 50000),
            this.minSpawnTime
        )
    }

    createEnemy() {
        this.spawnTime = this.getSpawnTime();

        if (!this.game || this.game.state !== 'running') return;

        this.enemies.push(new Enemy(this.game));
        this.game.soundHandler.onEnemySpawn();
    }

    reset() {
        this.spawnTime = 0;
        this.enemies = [];
    }

    update(dt) {
        this.spawnTime -= dt;

        if (this.spawnTime <= 0) {
            this.createEnemy();
        }

        this.enemies.forEach(enemy => {
            enemy.update(dt);

            if (enemy.toRemove) {
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
        });
    }

    draw(ctx) {
        this.enemies.forEach(enemy => {
            enemy.draw(ctx);
        });
    }
}