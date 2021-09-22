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
            volume: 0.5
        });

        this.enemySounds = [];
    }

    stopAllSounds() {
        if (this.swoosh.currentTime > 0) this.swoosh.pause();
        if (this.death.currentTime > 0) this.swoosh.pause();

        this.music.stop();

        this.enemySounds.forEach(enemySound => {enemySound.pause()});
    }

    onEnemySpawn() {
        if (this.enemySounds.length >= 24 || this.game.terminated) return; // Limits how many sounds we can play at a time
        let sound = new Audio(this.enemySpawn);
        sound.volume = Math.max(0.2 - this.enemySounds.length / 125, 0);

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
        if (this.game.terminated) return;

        this.music.pause();
        this.swoosh.pause();
        this.enemySounds.forEach(enemySound => {enemySound.pause()});
    }

    onUnpause() {
        if (this.game.terminated) return;

        this.music.play();
        if (this.swoosh.currentTime > 0 && !this.swoosh.ended) this.swoosh.play();
        this.enemySounds.forEach(enemySound => {enemySound.play()});
    }

    onGameOver() {
        if (this.game.terminated) return;
        
        this.music.stop();
        this.death.play();

        this.enemySounds.forEach(enemySound => {
            enemySound.pause();
            enemySound.remove();
        });
    }
}