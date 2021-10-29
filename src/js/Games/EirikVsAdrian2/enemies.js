class Enemy {
    constructor(game, averagePos) {
        this.game = game;

        const gw = this.game.props.gameWidth;
        const gh = this.game.props.gameHeight;

        this.toRemove = false;

        this.size = 48;
        this.collisionRadius = 48;

        this.pos = {
            x: this.game.player.pos.x + gw,
            y: averagePos + (Math.random() * gh / 100) - this.game.scene.groundHeight
        }

        const plrDiff = game.player.pos.y - this.pos.y;

        this.vel = {
            x: -Math.random() * 100,
            y: Math.random() * 20 - 10 + plrDiff / 30
        }


        this.image = new Image();
        this.image.src = this.game.props.assets.img.adrian;
        
        this.imageSizeOffset = 56;
    }

    distanceFromPlayer() {
        let dx = this.game.player.pos.x - this.pos.x;
        let dy = this.game.player.pos.y - this.pos.y;

        return Math.sqrt(
            dx*dx + dy*dy
        );
    }

    collidingWithPlayer() {
        return Math.abs(this.distanceFromPlayer()) <= this.collisionRadius + this.game.player.collisionRadius;
    }

    update(dt) {
        this.pos.x += this.vel.x * dt / 100;
        this.pos.y += this.vel.y * dt / 100;

        if (this.collidingWithPlayer()) {
            this.game.player.die();
        }

        if (this.pos.x + this.size + this.imageSizeOffset <= 0) this.toRemove = true;
    }

    draw(ctx) {
        const drawPos = {
            x: this.pos.x - this.imageSizeOffset / 2 + this.size / 2 - this.game.camera.pos.x,
            y: this.pos.y - this.imageSizeOffset / 2 + this.size / 2 - this.game.camera.pos.y
        };

        ctx.drawImage(
            this.image,
            drawPos.x - this.size,
            drawPos.y - this.size,
            this.size + this.imageSizeOffset,
            this.size + this.imageSizeOffset
        );
    }
}

export default class EnemyHandler {
    constructor(game) {
        this.game = game;

        this.enemies = [];

        this.spawnTime = 0;

        this.maxSpawnTime = 3000;
        this.minSpawnTime = 250;

        this.screenArea = this.game.props.gameWidth * this.game.props.gameHeight;

        this.averagePlayerPosition = this.game.props.gameHeight / 2;
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
        this.averagePlayerPosition = (this.averagePlayerPosition + this.game.player.pos.y) / 2;

        this.spawnTime = this.getSpawnTime();

        if (!this.game || this.game.state !== 'running') return;

        this.enemies.push(new Enemy(this.game, this.averagePlayerPosition));
        this.game.soundHandler.onEnemySpawn();
    }

    reset() {
        this.spawnTime = 0;
        this.enemies = [];

        this.averagePlayerPosition = this.game.props.gameHeight / 2;
    }

    update(dt) {
        this.enemies.forEach(enemy => {
            enemy.update(dt);

            if (enemy.toRemove) {
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
        });

        if (!this.game.player.moving || this.game.player.dying) return;
        this.spawnTime -= dt;

        if (this.spawnTime <= 0) {
            this.createEnemy();
        }
    }

    draw(ctx) {
        this.enemies.forEach(enemy => {
            enemy.draw(ctx);
        });
    }
}