class Dot {
    constructor(props) {
        this.props = props

        this.wobbleTime = 20
        this.radius = 6;

        this.position = {
            x: Math.random() * this.props.canvas.width,
            y: Math.random() * this.props.canvas.height
        }

        this.velocity = {
            x: (Math.random() * 20) - 10,
            y: (Math.random() * 20) - 10
        }

        if (Math.abs(this.velocity.x) < 5) this.velocity.x = 5 + Math.random();
        if (Math.abs(this.velocity.y) < 5) this.velocity.y = 5 + Math.random();
    }

    isOffScreen(edge) {
        switch(edge) {
            case 'left':
                return this.position.x - this.radius < 0
            
            case 'right':
                return this.position.x + this.radius > this.props.canvas.width
            
            case 'top':
                return this.position.y - this.radius < 0

            default:
                return this.position.y + this.radius > this.props.canvas.height
        }
    }

    update(dt) {
        this.radius = Math.abs(Math.sin(this.position.x / this.wobbleTime) + Math.sin(this.position.y / (this.wobbleTime * 2))) * 5;

        this.position.x += (this.velocity.x * dt) / 100;
        this.position.y += (this.velocity.y * dt) / 100;

        if (this.isOffScreen('left')) {
            this.position.x = 0 + this.radius;
            this.velocity.x = -this.velocity.x;
        }

        if (this.isOffScreen('right')) {
            this.position.x = this.props.canvas.width - this.radius;
            this.velocity.x = -this.velocity.x;
        }

        if (this.isOffScreen('top')) {
            this.position.y = 0 + this.radius;
            this.velocity.y = -this.velocity.y;
        }

        if (this.isOffScreen('bottom')) {
            this.position.y = this.props.canvas.height - this.radius;
            this.velocity.y = -this.velocity.y;
        }
    }
}

export default class Dots {

    constructor(props) {
        this.props = props;

        this.ctx = props.ctx;

        this.dots = [];

        for (var i = 0; i < 120; i++) {
            this.dots.push(new Dot({
                canvas: {width: this.props.width, height: this.props.height}
            }));
        }
    }

    update(dt) {
        if (!dt) return;

        this.dots.forEach(dot => {dot.update(dt)});
    }

    drawCircle(dot) {
        this.ctx.beginPath();
        this.ctx.arc(dot.position.x, dot.position.y, dot.radius, 0, 2 * Math.PI, false);

        this.ctx.fillStyle = this.props.color || 'rgba(100, 100, 200, 0.2)';
        this.ctx.fill();
    }

    draw() {
        if (!this.ctx) return;

        this.dots.forEach(dot => {
            this.drawCircle(dot);
        });
    }
}