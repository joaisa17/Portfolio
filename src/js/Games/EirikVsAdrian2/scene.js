class Background {
    constructor({
        game,
        imgSrc,
        influence,
        y,
        objWidth,
        objHeight
    }) {

        this.game = game;
        this.y = y;
        this.influence = influence;
        this.objWidth = objWidth;
        this.objHeight = objHeight;

        this.image = new Image();
        this.image.src = imgSrc;

        this.objectPositions = [];
    }

    drawObject(ctx, x) {
        ctx.drawImage(
            this.image,
            x - this.game.camera.pos.x * this.influence,
            this.y - this.game.camera.pos.y * this.influence,
            this.objWidth,
            this.objHeight
        );
    }

    draw(ctx) {
        if (this.objectPositions.length === 0) return;

        if (this.objectPositions[0] + this.objWidth - this.game.camera.pos.x * this.influence <= 0) {
            this.objectPositions.shift()
            this.objectPositions.push(
                this.objectPositions[this.objectPositions.length - 1] + this.objWidth
            );
        }

        this.objectPositions.forEach(pos => this.drawObject(ctx, pos));
    }

    createObjects() {
        this.objectPositions = [];

        const required = Math.ceil(
            this.game.props.gameWidth / this.objWidth + 2
        );

        for (var i = 0; i < required; i++) {
            this.objectPositions.push(this.objWidth * i);
        }
    }

    reset() {
        this.createObjects();
    }
}

export default class Scene {

    constructor(game) {
        this.game = game;

        this.groundHeight = 80;

        //const gw = this.game.props.gameWidth;
        const gh = this.game.props.gameHeight;

        this.backgrounds = [
            // Background
            new Background({
                game: game,
                imgSrc: this.game.props.assets.img.bg,
                influence: 0.1,

                y: 0,

                objWidth: gh * 1.7 * 1.5,
                objHeight: gh * 1.5
            }),

            // Mountain
            new Background({
                game: game,
                imgSrc: this.game.props.assets.img.bgMountain,
                influence: 0.2,

                y: 0,

                objWidth: gh * 1.7,
                objHeight: gh
            }),

            // Mountains
            new Background({
                game: game,
                imgSrc: this.game.props.assets.img.bgMountains,
                influence: 0.25,

                y: 200,

                objWidth: gh * 2.4,
                objHeight: gh
            }),

            // Forest
            new Background({
                game: game,
                imgSrc: this.game.props.assets.img.bgForest,
                influence: 0.5,

                y: gh / 6,

                objWidth: gh * 2.5,
                objHeight: gh / 1.25
            }),

            // Trees
            new Background({
                game: game,
                imgSrc: this.game.props.assets.img.bgTrees,
                influence: 0.7,

                y: 0,

                objWidth: gh * 3.25,
                objHeight: gh
            }),

            // Ground
            new Background({
                game: game,
                imgSrc: this.game.props.assets.img.ground,
                influence: 1,

                y: this.game.props.gameHeight - this.groundHeight,

                objWidth: 800,
                objHeight: this.groundHeight
            })
        ];

        this.backgrounds.forEach(bg => bg.createObjects());
    }

    draw(ctx) {
        this.backgrounds.forEach(bg => bg.draw(ctx));
    }

    reset() {
        this.backgrounds.forEach(bg => bg.reset());
    }
}