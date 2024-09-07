export const SFX_SOUNDS = Object.freeze({
  BASIC_ATTACK: "assets/audio/sfx/basic-atack.wav",
  HEAL: "assets/audio/sfx/heal.mp3",
  EXECUTE: "assets/audio/sfx/execute.mp3",
  PLACE_CARD: "assets/audio/sfx/place-card.mp3",
  PLACE_HERO: "assets/audio/sfx/place-hero.mp3",
  REMOVE_WAVE: "assets/audio/sfx/clear-wave.mp3",
  ENEMY_DEATH: "assets/audio/sfx/enemy-death.mp3",
  MALE_HERO_DEATH: "assets/audio/sfx/male-hero-death.mp3",
  SKIP: "assets/audio/sfx/skip-acktion.mp3",
  ENEMY_HIT: "assets/audio/sfx/get-hit.mp3",
  DRINK_POTION: "assets/audio/sfx/drink-potion.mp3",
  PUT_IN_BAG: "assets/audio/sfx/put-in-bag.mp3",
  VICTORY: "assets/audio/sfx/victory.mp3",
  ROAR: "assets/audio/sfx/roar.mp3",
  INFUSE_LIGHT: "assets/audio/sfx/infuse-light.mp3",
  HAMMER_SLAM: "assets/audio/sfx/hammer-slam.mp3",
  FORTIFY: "assets/audio/sfx/fortify.mp3",
  BLOCKED: "assets/audio/sfx/blocked.mp3",
  TAILSWING: "assets/audio/sfx/tailswing.mp3",
  STING: "assets/audio/sfx/sting.mp3",
  DEATHGRIP: "assets/audio/sfx/deathgrip.mp3",
  AIMED_SHOT: "assets/audio/sfx/aimed_shot.mp3",
  RAT_BAT_DEATH: "assets/audio/sfx/rat-death.mp3",
  BIG_ANIMAL_DEATH: "assets/audio/sfx/big-animal-death.wav",
  BLEED: "assets/audio/sfx/bleed.mp3",
  SHARPEN_WEAPON: "assets/audio/sfx/sharpen-weapon.mp3",
  BASIC_HIT: "assets/audio/sfx/basic-hit.mp3",
  BREAK_BONES: "assets/audio/sfx/bone-break.mp3",
  SWORD_SLASH: "assets/audio/sfx/sword-slash.mp3",
  SWORD_THRUST: "assets/audio/sfx/sword-thrust.mp3",
  GOBLIN_DEATH: "assets/audio/sfx/goblin-death.mp3",
  SPIDER_DEATH: "assets/audio/sfx/spider-death.mp3",
  BEAR_ROAR: "assets/audio/sfx/bear-roar.mp3",
  CLICK_BTN: "assets/audio/sfx/button-click.mp3",
});

export const MUSIC_SOUNDS = Object.freeze({
  SEWERS: "assets/audio/music/sewers.mp3",
  FOREST: "assets/audio/music/forest.mp3",
});

class AudioPlayer {
  constructor(sounds = SFX_SOUNDS) {
    this.audioFiles = {};
    this.isMuted = false;
    this.loadFiles(sounds);
    this.musicTrack = null;
  }

  setMusicTrack(trackName) {
    this.musicTrack = trackName;
  }

  loadFiles(sounds) {
    for (const [soundName, soundPath] of Object.entries(sounds)) {
      const audio = new Audio(soundPath);
      audio.load();
      this.audioFiles[soundName] = audio;
    }
  }

  play(soundName) {
    if (this.isMuted) return;

    const audio = this.audioFiles[soundName];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error(`Failed to play sound ${soundName}: ${error.message}`);
      });
    } else {
      console.error(`Sound ${soundName} not found.`);
    }
  }

  setVolume(volume) {
    if (volume < 0 || volume > 1) {
      console.error("Volume must be between 0 and 1.");
      return;
    }

    Object.values(this.audioFiles).forEach((audio) => {
      audio.volume = volume;
    });
  }

  stopAllSounds() {
    Object.values(this.audioFiles).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
  }
}

function initAudio() {
  const sfxPlayer = new AudioPlayer(SFX_SOUNDS);
  const musicPlayer = new AudioPlayer(MUSIC_SOUNDS);

  setupVolumeControl("sfxVolume-range", sfxPlayer);
  setupVolumeControl("musicVolume-range", musicPlayer);

  setupMuteButton("muteMusic-btn", musicPlayer, "MAIN_MUSIC");
  setupMuteButton("muteSfx-btn", sfxPlayer);

  return { sfxPlayer, musicPlayer };
}

function setupVolumeControl(elementId, player) {
  document.getElementById(elementId).addEventListener("input", (event) => {
    player.setVolume(event.target.value);
  });
}

function setupMuteButton(elementId, player, musicTrack = null) {
  document.getElementById(elementId).addEventListener("click", function () {
    player.toggleMute();
    this.querySelector("img").src = player.isMuted
      ? "assets/img/HUD/volume_off.png"
      : "assets/img/HUD/volume_up.png";

    if (musicTrack) {
      if (player.isMuted) {
        player.stopAllSounds();
      } else {
        player.play(musicTrack);
      }
    } else {
      player.stopAllSounds();
    }
  });
}

const { sfxPlayer, musicPlayer } = initAudio();
export { sfxPlayer, musicPlayer };

sfxPlayer.setVolume(
  parseFloat(document.querySelector("#sfxVolume-range").getAttribute("max"))
);

musicPlayer.setVolume(
  parseFloat(document.querySelector("#musicVolume-range").getAttribute("max"))
);
