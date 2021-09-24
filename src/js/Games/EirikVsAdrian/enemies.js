function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

class Enemy {
    constructor(game) {
        this.game = game;

        this.toRemove = false;

        this.gw = this.game.props.gameWidth;
        this.gh = this.game.props.gameHeight;

        this.minSpeed = 10;
        this.speedMultiplier = 0.8;

        this.maxHomingSpeed = 10;
        this.homingMultiplier = 1.5;

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

    getHomingNumber(playerAxisPos, enemyAxisPos) {
        let d = playerAxisPos - enemyAxisPos;

        return Math.min((d * Math.pow(this.game.scoreFloat, 1.1)) * (this.homingMultiplier / 100000), this.maxHomingSpeed);
    }

    update(dt) {
        this.pos.x += (this.vel.x * dt / 100) * this.speedMultiplier;
        this.pos.y += (this.vel.y * dt / 100) * this.speedMultiplier;

        let plrPos = this.game.player.pos

        switch(this.originFace) {
            
            case 1:
                this.vel.x += this.getHomingNumber(plrPos.x, this.pos.x);
                if (this.pos.y - this.imageSizeOffset * 2 > this.gh) this.toRemove = true;
            break;

            case 2:
                this.vel.x += this.getHomingNumber(plrPos.x, this.pos.x);
                if (this.pos.y + this.imageSizeOffset * 2 < 0) this.toRemove = true;
            break;

            case 3:
                this.vel.y += this.getHomingNumber(plrPos.y, this.pos.y);
                if (this.pos.x - this.imageSizeOffset * 2 > this.gw) this.toRemove = true;
            break;

            case 4:
                this.vel.y += this.getHomingNumber(plrPos.y, this.pos.y);
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
        );

        // Draw helping dots

        let plrPos = this.game.player.pos;
        let dx = plrPos.x - this.pos.x;
        let dy = plrPos.y - this.pos.y;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';

        let dotSize = clamp(
            8 / Math.max(1 / 50, this.distanceFromPlayer() / 200),
            0,
            20
        );
        
        ctx.beginPath();
        ctx.arc(
            plrPos.x - dx / 2,
            plrPos.y - dy / 2,
            dotSize, 0, 2 * Math.PI
        );
        ctx.fill();
    }
}

export default class Enemies {
    constructor(game) {
        this.game = game;

        this.enemies = [];

        this.screenArea = this.game.props.gameWidth * this.game.props.gameHeight;

        // Chances: x/100
        this.minChance = 0.04;
        this.maxChance = 5;

        this.spawnRate = 0.8;
    }

    getSpawnChance() {
        let score = this.game.scoreFloat;
        let screenAreaFloat = this.screenArea / Math.pow(10, 6.5);

        return clamp(
            this.spawnRate / 100 + Math.pow(score, 1 + screenAreaFloat) / 500 - Math.pow(this.enemies.length, 1.5) / 50,
            this.minChance,
            this.maxChance
        );
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

        if (Math.floor(Math.random() * 100) <= this.getSpawnChance()) this.createEnemy();
    }

    draw(ctx) {
        this.enemies.forEach(enemy => {
            enemy.draw(ctx);
        });
    }
}