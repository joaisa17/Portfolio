class Line {
    constructor(props) {
        this.props = props;
        this.finished = false;

        this.position = {
            x: Math.random() * this.props.canvas.width,
            y: 0
        }

        this.velocity = 5 + Math.random() * 10;

        this.length = 20 + Math.random() * 50
    }

    update(dt) {

        this.position.y = Math.floor(
            this.position.y + (
                (this.props.canvas.height - (this.position.y - this.length))
                * dt / 1000
            ) + this.velocity / 2
        )

        if (this.position.y - this.length > this.props.canvas.height) {
            this.finished = true;
        }
    }
}

export default class Lines {
    constructor(props) {
        this.props = props;

        this.ctx = props.ctx;

        this.randomRange = 2000;
        this.lines = [];

        for (var i = 0; i < 100; i++) {
            setTimeout(() => {
                this.lines.push(new Line({
                    canvas: {width: this.props.width, height: this.props.height}
                }));
            }, Math.random() * this.randomRange)
        }
    }

    update(dt) {
        if (!dt) return;

        this.lines.forEach(line => {
            line.update(dt);
            if (line.finished) {
                this.lines.splice(this.lines.indexOf(line), 1);
                
                setTimeout(() => {
                    this.lines.push(new Line({
                        canvas: {width: this.props.width, height: this.props.height}
                    }));
                }, Math.random() * this.randomRange)
            }
        });
    }

    drawLine(line) {
        this.ctx.beginPath();

        this.ctx.moveTo(line.position.x, line.position.y);
        this.ctx.lineTo(line.position.x, line.position.y - line.length);

        this.ctx.strokeStyle = this.props.color || 'rgba(100, 100, 200, 0.2)';
        this.ctx.lineWidth = 2
        this.ctx.stroke();
    }

    draw() {
        if (!this.ctx) return;

        this.lines.forEach(line => {
            this.drawLine(line);
        });
    }
}