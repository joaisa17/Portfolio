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
        this.rotVel = 0;

        this.vel = {
            x: 0,
            y: 0
        };
        
        this.dying = false;
        this.dead = false;

        this.waiting = true;
        this.moving = false;

        this.movementSpeed = 64;
        this.jumpPower = 128;
        this.gravity = 50;

        this.bordersEnabled = true;
        this.elasticity = 40;

        this.size = 48;
        this.collisionRadius = 48;

        this.image = new Image();
        this.image.src = this.game.props.assets.img.eirik;

        this.wingImage = new Image();
        this.wingImage.src = this.game.props.assets.img.wing;

        this.wingWidth = 40 * 2.2;
        this.wingHeight = 50 * 2.2;
        
        this.imageSizeOffset = 56;

        this.hoverHeight = 40;
        this.hoverSpeed = 14;
        this.hoveringUp = true;

        this.wingFlappingUp = true;
        this.wingFlappingSpeed = 8;
        this.wingRotation = 0;
        this.wingMaxRotation = 0.6;
        this.wingRotationOffset = -2;
    }

    setSprint(v) {
        this.sprint = v;
    }

    jump() {
        if (this.game.state !== 'running' || this.dying) return;

        if (!this.moving) {
            this.waiting = false;
            this.moving = true;
            this.game.soundHandler.onPlayerStart();
        }

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
            case 'bottom': return (this.pos.y) + this.collisionRadius > this.gh - this.game.scene.groundHeight;
            case 'left': return (this.pos.x - this.game.camera.pos.x) - this.collisionRadius < 0;
            case 'right': return (this.pos.x - this.game.camera.pos.x) + this.collisionRadius > this.gw;

            default: return;
        }
    }

    die() {
        if (this.dying) return;
        this.game.soundHandler.onPlayerDie();

        this.dying = true;
        this.vel = {
            x: Math.random() * 50 - 25,
            y: -200
        }

        this.rotVel = -20;

        setTimeout(() => this.dead = true, 1000);
    }

    reset() {
        this.dying = false;
        this.dead = false;
        this.waiting = true;
        this.wingRotation = 0;

        this.moving = false;

        this.pos = {
            x: 80,
            y: this.gh / 2
        }

        this.vel = {
            x: 0,
            y: 0
        };

        this.rotVel = 0;
        this.rotation = 0;
    }

    updateWings(dt) {
        if (this.dying) {
            this.wingRotation = this.rotation;
            return;
        }
        if (this.wingRotation >= this.wingMaxRotation) this.wingFlappingUp = false;
        if (this.wingRotation <= -this.wingMaxRotation) this.wingFlappingUp = true;

        this.wingRotation += dt / 1000 * (this.wingFlappingUp ? this.wingFlappingSpeed : -this.wingFlappingSpeed);
    }

    update(dt) {
        if (this.dead) return;

        this.updateWings(dt);

        if (this.waiting) {

            const topPos = this.gh / 2 - this.hoverHeight;
            const bottomPos = this.gh / 2 + this.hoverHeight;

            if (this.pos.y <= topPos) this.hoveringUp = false;
            if (this.pos.y >= bottomPos) this.hoveringUp = true;

            if (this.hoveringUp) {
                this.pos.y -= this.hoverSpeed * dt / 100;
            }

            else {
                this.pos.y += this.hoverSpeed * dt / 100;
            }

            return;
        }
        
        if (this.moving) {
            this.rotation += this.rotVel * dt / 1000;
            this.vel.y += this.gravity * dt / 100;

            if (!this.dying) this.vel.x = this.movementSpeed;
        }
        

        this.pos.x += (this.vel.x * dt / 100);
        this.pos.y += (this.vel.y * dt / 100);

        if (this.dying) return;

        if (this.offScreen('top')) {
            this.pos.y = this.collisionRadius;
            this.vel.y = -this.vel.y * (this.elasticity / 100);
        }

        if (this.offScreen('bottom')) {
            this.pos.y = this.gh - this.collisionRadius - this.game.scene.groundHeight;
            this.vel.y = -this.vel.y * (this.elasticity / 100);

            this.die();
        }

        if (this.pos.x - this.game.camera.pos.x >= 400) this.game.camera.pos.x += this.vel.x * dt / 100;
    }

    drawWings(ctx) {

        const translatePos = {
            x: this.pos.x - this.imageSizeOffset / 2 + this.size / 2 - this.game.camera.pos.x,
            y: this.pos.y - this.imageSizeOffset / 2 + this.size / 2 - this.game.camera.pos.y
        };
        
        // Left wing
        const wingDrawPosLeft = {
            x: -16,
            y: 20
        };

        ctx.translate(translatePos.x + wingDrawPosLeft.x, translatePos.y + wingDrawPosLeft.y);
        ctx.rotate(this.wingRotation + this.wingRotationOffset / 10);

        ctx.drawImage(
            this.wingImage,
            -this.wingWidth,
            -this.wingHeight + 20,
            this.wingWidth,
            this.wingHeight
        );

        // Right wing
        const wingDrawPosRight = {
            x: 16,
            y: 20
        };

        ctx.setTransform(1,0,0,1,0,0);
        ctx.translate(translatePos.x + wingDrawPosRight.x, translatePos.y + wingDrawPosRight.y);
        ctx.rotate(-this.wingRotation - this.wingRotationOffset / 10)

        ctx.scale(-1, 1);

        ctx.drawImage(
            this.wingImage,
            -this.wingWidth,
            -this.wingHeight + 20,
            this.wingWidth,
            this.wingHeight
        )

        ctx.setTransform(1,0,0,1,0,0);
    }

    draw(ctx) {
        this.drawWings(ctx);
        
        const drawPos = {
            x: this.pos.x - this.imageSizeOffset / 2 + this.size / 2 - this.game.camera.pos.x,
            y: this.pos.y - this.imageSizeOffset / 2 + this.size / 2 - this.game.camera.pos.y
        };
        
        ctx.translate(drawPos.x, drawPos.y)
        ctx.rotate(this.rotation);

        ctx.scale(-1, 1)
        
        ctx.drawImage(
            this.image,
            0 - this.size,
            0 - this.size,
            this.size + this.imageSizeOffset,
            this.size + this.imageSizeOffset
        );

        ctx.setTransform(1,0,0,1,0,0);
    }
}