export default class Player {
    constructor(game) {
        this.game = game;

        this.gw = game.props.gameWidth;
        this.gh = game.props.gameHeight

        this.pos = {
            x: this.gw / 2,
            y: this.gh / 2
        };

        this.vel = {
            x: 0,
            y: 0
        }

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.movementSpeed = 32;

        this.size = 56;
        this.collisionRadius = 54;

        this.imageSrc = document.getElementById('assets/eirik');
        this.imageSizeOffset = 56;
    }

    move(d) {
        this[d] = true;
    }

    stopMove(d) {
        this[d] = false;
    }

    offScreen(face) {
        switch(face) {
            case 'top': return this.pos.y - this.collisionRadius < 0;
            case 'bottom': return this.pos.y + this.collisionRadius > this.gh;
            case 'left': return this.pos.x - this.collisionRadius < 0;
            case 'right': return this.pos.x + this.collisionRadius > this.gw;

            default: return;
        }
    }

    reset() {
        this.pos = {
            x: this.gw / 2,
            y: this.gh / 2
        }
    }

    update(dt) {
        if (this.up && !this.down) this.vel.y = -this.movementSpeed;
        else if (this.down && !this.up) this.vel.y = this.movementSpeed;
        else this.vel.y = 0;

        if (this.left && !this.right) this.vel.x = -this.movementSpeed;
        else if (this.right && !this.left) this.vel.x = this.movementSpeed;
        else this.vel.x = 0;

        this.pos.x += this.vel.x * dt / 100;
        this.pos.y += this.vel.y * dt / 100;

        if (this.offScreen('top')) this.pos.y = this.collisionRadius;
        if (this.offScreen('bottom')) this.pos.y = this.gh - this.collisionRadius;
        if (this.offScreen('left')) this.pos.x = this.collisionRadius;
        if (this.offScreen('right')) this.pos.x = this.gw - this.collisionRadius;
    }

    draw(ctx) {
        ctx.drawImage(
            this.imageSrc,
            this.pos.x - (this.size + this.imageSizeOffset) / 2,
            this.pos.y - (this.size + this.imageSizeOffset) / 2,
            this.size + this.imageSizeOffset,
            this.size + this.imageSizeOffset
        )

         ctx.beginPath();

         ctx.arc(this.pos.x, this.pos.y, this.collisionRadius, 0, 2*Math.PI, false);

         ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
         ctx.fill();
    }
}