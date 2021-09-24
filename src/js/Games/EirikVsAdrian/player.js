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

        this.sprint = false;
        this.sprintMultiplier = 2;

        this.sprintRegen = true;
        this.sprintRegenCooldown = 750;
        this.sprintRegenTimeout = undefined;
        
        this.stamina = 100;
        this.staminaRegenRate = 0.5;
        this.staminaBarWidth = this.gw / 3;

        this.movementSpeed = 42;

        this.size = 48;
        this.collisionRadius = 48;

        this.imageSrc = document.createElement('img');
        this.imageSrc.setAttribute('src', this.game.props.assets.img.eirik);
        
        this.imageSizeOffset = 56;
    }

    setSprint(v) {
        console.log("s")
        this.sprint = v
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
        this.stamina = 100;
        this.pos = {
            x: this.gw / 2,
            y: this.gh / 2
        }
    }

    update(dt) {
        if (this.sprint) {
            this.sprintRegen = false;

            this.stamina = Math.max(this.stamina - 1 * dt / 10, 0);
            if (this.sprintRegenTimeout) {
                clearTimeout(this.sprintRegenTimeout);
                this.sprintRegenTimeout = undefined;
            }
        }

        else {
            if (this.sprintRegen) {
                this.stamina = Math.min(this.stamina + this.staminaRegenRate * dt / 10, 100);
            }

            if (!this.sprintRegenTimeout) {
                this.sprintRegenTimeout = setTimeout(() => {
                    this.sprintRegen = true;
                }, this.sprintRegenCooldown);
            }
        }

        if (this.up && !this.down) this.vel.y = -this.movementSpeed;
        else if (this.down && !this.up) this.vel.y = this.movementSpeed;
        else this.vel.y = 0;

        if (this.left && !this.right) this.vel.x = -this.movementSpeed;
        else if (this.right && !this.left) this.vel.x = this.movementSpeed;
        else this.vel.x = 0;

        this.pos.x += (this.vel.x * (this.stamina > 0 && this.sprint ? this.sprintMultiplier : 1)) * dt / 100;
        this.pos.y += (this.vel.y * (this.stamina > 0 && this.sprint ? this.sprintMultiplier : 1)) * dt / 100;

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
        );

        // Stamina bar
        ctx.fillStyle = 'rgb(100, 255, 100)';

        ctx.beginPath();
        ctx.fillRect(
            this.gw / 2 - this.staminaBarWidth / 2,
            this.gh / 40,
            this.staminaBarWidth * (this.stamina / 100),
            20
        )

        // Stamina bar outline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.rect(
            this.gw / 2 - this.staminaBarWidth / 2,
            this.gh / 40,
            this.staminaBarWidth,
            20
        );
        ctx.stroke();

        // Stamina bar text
        ctx.fillStyle = 'white';
        ctx.font = '32px arial';
        ctx.textAlign = 'center';
        ctx.fillText('Stamina', this.gw / 2, this.gh / 40 + 52);
    }
}