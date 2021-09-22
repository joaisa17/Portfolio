import { Howl } from 'howler';

export default class SoundHandler {
    constructor(game) {
        this.game = game;

        this.enemySpawn = game.props.assets.audio.adrian;

        this.swoosh = new Audio(game.props.assets.audio.eirikSwoosh);
        this.death = new Audio(game.props.assets.audio.eirikAu);

        this.music = new Howl({
            src: game.props.assets.audio.music,
            loop: true,
            volume: 0.5,
        })

        this.enemySounds = [];
    }

    onEnemySpawn() {
        let sound = new Audio(this.enemySpawn);
        sound.volume = 0.25;

        sound.play();

        this.enemySounds.push(sound);

        sound.addEventListener('ended', () => {
            sound.remove();
            this.enemySounds.splice(this.enemySounds.indexOf(sound), 1);
        });
    }

    onRestart() {
        this.enemySounds = [];
        
        this.music.play();
    }

    onPause() {
        this.music.pause();
        this.swoosh.pause();
        this.enemySounds.forEach(enemySound => {enemySound.pause()});
    }

    onUnpause() {
        this.music.play();
        if (this.swoosh.currentTime > 0 && !this.swoosh.ended) this.swoosh.play();
        this.enemySounds.forEach(enemySound => {enemySound.play()});
    }

    onGameOver() {
        this.music.stop();
        this.death.play();

        this.enemySounds.forEach(enemySound => {
            enemySound.pause();
            enemySound.remove();
        });
    }
}