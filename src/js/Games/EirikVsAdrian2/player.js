function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

export default class Player {
    constructor(game) {
        this.game = game;

        this.gw = game.props.gameWidth;
        this.gh = game.props.gameHeight;

        this.defaultPos = {
            x: 80,
            y: this.gh / 2
        }

        this.pos = this.defaultPos; 
        this.rotation = 0; //degrees

        this.vel = {
            x: 0,
            y: 0
        };

        this.moving = false;

        this.movementSpeed = 64;
        this.jumpPower = 128;
        this.gravity = 50;

        this.bordersEnabled = true;
        this.elasticity = 40;

        this.size = 48;
        this.collisionRadius = 48;

        this.imageSrc = document.createElement('img');
        this.imageSrc.setAttribute('src', this.game.props.assets.img.eirik);
        
        this.imageSizeOffset = 56;
    }

    setSprint(v) {
        this.sprint = v;
    }

    jump() {
        this.moving = true;
        this.vel.y = clamp(this.vel.y - this.jumpPower / 2, -Infinity, -this.jumpPower)
    }

    move(d) {
        this[d] = true;
    }

    stopMove(d) {
        this[d] = false;
    }

    offScreen(face) {
        if (!this.bordersEnabled) return false;

        switch(face) {
            case 'top': return (this.pos.y - this.game.camera.pos.y) - this.collisionRadius < 0;
            case 'bottom': return (this.pos.y - this.game.camera.pos.y) + this.collisionRadius > this.gh;
            case 'left': return (this.pos.x - this.game.camera.pos.x) - this.collisionRadius < 0;
            case 'right': return (this.pos.x - this.game.camera.pos.x) + this.collisionRadius > this.gw;

            default: return;
        }
    }

    reset() {
        this.headingAngle = 0;
        this.moving = false;

        this.stamina = 100;

        this.pos = this.defaultPos;

        this.vel = {
            x: 0,
            y: 0
        };
    }

    update(dt) {

        if (this.moving) {
            this.vel.x = this.movementSpeed;
            this.vel.y += this.gravity * dt / 100;
        }
        

        this.pos.x += (this.vel.x * dt / 100);
        this.pos.y += (this.vel.y * dt / 100);

        if (this.offScreen('top')) {
            this.pos.y = this.collisionRadius;
            this.vel.y = -this.vel.y * (this.elasticity / 100);
        }

        if (this.offScreen('bottom')) {
            this.pos.y = this.gh - this.collisionRadius;
            this.vel.y = -this.vel.y * (this.elasticity / 100);
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'white';

        const drawPos = {
            x: this.pos.x - (this.size + this.imageSizeOffset) / 2 - this.game.camera.pos.x,
            y: this.pos.y - (this.size + this.imageSizeOffset) / 2 - this.game.camera.pos.y
        };

        //ctx.translate(drawPos.x, drawPos.y)

        ctx.drawImage(
            this.imageSrc,
            drawPos.x,
            drawPos.y,
            this.size + this.imageSizeOffset,
            this.size + this.imageSizeOffset
        );

        //ctx.translate(0, 0)
    }
}