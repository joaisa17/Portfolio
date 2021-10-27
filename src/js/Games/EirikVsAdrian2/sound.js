import { Howl } from 'howler';

export default class SoundHandler {
    constructor(game) {
        this.game = game;

        const assets = game.props.assets.audio;

        this.enemySpawn = assets.adrian;

        this.swoosh = new Audio(assets.eirikSwoosh);
        this.death = new Audio(assets.eirikAu);

        this.playerStarted = false;

        this.scoreSounds = {
            69: new Audio(assets.freiNice)
        };

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
        this.swoosh.pause();

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
        this.playerStarted = false;
    }

    onPause() {
        if (this.game.terminated) return;
        this.stopAllSounds();
    }

    onUnpause() {
        if (this.game.terminated) return;

        if (this.playerStarted) this.music.play();
        if (this.swoosh.currentTime > 0 && !this.swoosh.ended) this.swoosh.play();
        this.enemySounds.forEach(enemySound => {enemySound.play()});
    }

    onPlayerStart() {
        this.playerStarted = true;
        if (!this.music.playing()) {
            this.music.play();
        }
    }

    onPlayerDie() {
        this.death.play();
    }

    onGameOver() {
        if (this.game.terminated) return;
        
        this.music.stop();

        if (this.scoreSounds[this.game.score]) setTimeout(this.scoreSounds[this.game.score].play(), 300);

        this.enemySounds.forEach(enemySound => {
            enemySound.pause();
            enemySound.remove();
        });
    }
}