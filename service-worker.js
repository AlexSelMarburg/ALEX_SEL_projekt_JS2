// Set a name for the current cache
var cacheName = "cardGame";

// Default files to always cache

// const cacheFiles = [
//   "./",
//   "/manifest.json",
//   "/index.html",
//   "/favicon.png",
//   "/modules/lib.js",
//   "/data/db-reader.html",
//   "/data/db-saver.html",
//   "/modules/db.js",
//   "/modules/install.js",
//   "/modules/db_read.js",
//   "/modules/db_save.js",
//   "/modules/idb-src.min.js",
//   "/modules/main.js",
//   "/modules/sequenzer.js",
//   "/js/app.js",
//   "/css/style.css",
//   "/data/sounds.json",
//   "/data/volumes.json",
//   "/data/instruments.json",
//   "/images/icons/icon-512x512.png",
//   "/mp3/kick1.mp3",
//   "/mp3/snare1.mp3",
//   "/mp3/percussion1.mp3",
//   "/mp3/cowbell1.mp3",
//   "/mp3/shaker1.mp3",
//   "/mp3/hihat1.mp3",
//   "/mp3/beep.mp3",
//   "/mp3/bass1.mp3",
//   "/mp3/bass2.mp3",
//   "/mp3/brass1.mp3",
//   "/mp3/brass2.mp3",
//   "/mp3/marimba-g2.mp3",
//   "/mp3/marimba-c3.mp3",
//   "/mp3/marimba-dis3.mp3",
//   "/mp3/marimba-f3.mp3",
//   "/mp3/voice.mp3",
// ];

const cacheFiles = [
  "./",
  "assets/audio/music/forest.mp3",
  "assets/audio/music/sewers.mp3",
  "assets/audio/sfx/aimed_shot.mp3",
  "assets/audio/sfx/basic-atack.wav",
  "assets/audio/sfx/basic-hit.mp3",
  "assets/audio/sfx/bear-roar.mp3",
  "assets/audio/sfx/big-animal-death.wav",
  "assets/audio/sfx/bleed.mp3",
  "assets/audio/sfx/blocked.mp3",
  "assets/audio/sfx/bone-break.mp3",
  "assets/audio/sfx/button-click.mp3",
  "assets/audio/sfx/clear-wave.mp3",
  "assets/audio/sfx/deathgrip.mp3",
  "assets/audio/sfx/drink-potion.mp3",
  "assets/audio/sfx/enemy-death.mp3",
  "assets/audio/sfx/execute.mp3",
  "assets/audio/sfx/fortify.mp3",
  "assets/audio/sfx/get-hit.mp3",
  "assets/audio/sfx/goblin-death.mp3",
  "assets/audio/sfx/hammer-slam.mp3",
  "assets/audio/sfx/heal.mp3",
  "assets/audio/sfx/infuse-light.mp3",
  "assets/audio/sfx/male-hero-death.mp3",
  "assets/audio/sfx/place-card.mp3",
  "assets/audio/sfx/place-hero.mp3",
  "assets/audio/sfx/put-in-bag.mp3",
  "assets/audio/sfx/rat-death.mp3",
  "assets/audio/sfx/roar.mp3",
  "assets/audio/sfx/sharpen-weapon.mp3",
  "assets/audio/sfx/skip-acktion.mp3",
  "assets/audio/sfx/spider-death.mp3",
  "assets/audio/sfx/sting.mp3",
  "assets/audio/sfx/sword-slash.mp3",
  "assets/audio/sfx/sword-thrust.mp3",
  "assets/audio/sfx/tailswing.mp3",
  "assets/audio/sfx/victory.mp3",
  "assets/img/abilities/ability-blade-thrust.jpeg",
  "assets/img/abilities/ability-dragons-roar.jpeg",
  "assets/img/abilities/ability-execute.jpeg",
  "assets/img/abilities/ability-hammer-slam.jpeg",
  "assets/img/abilities/ability-holy-shield.jpeg",
  "assets/img/abilities/ability-infuse-light.jpeg",
  "assets/img/abilities/ability-judgement.jpeg",
  "assets/img/abilities/ability-sword-slash.jpeg",
  "assets/img/backgrounds/hero/templar-bg.jpeg",
  "assets/img/backgrounds/levels/forest/forest-1.jpeg",
  "assets/img/backgrounds/levels/forest/forest-2.jpeg",
  "assets/img/backgrounds/levels/forest/forest-3.jpeg",
  "assets/img/backgrounds/levels/forest/forest-4.jpeg",
  "assets/img/backgrounds/levels/forest/forest-5.jpeg",
  "assets/img/backgrounds/levels/forest/forest-6.jpeg",
  "assets/img/backgrounds/levels/forest/forest-7.jpeg",
  "assets/img/backgrounds/levels/forest/forest-8.jpeg",
  "assets/img/backgrounds/levels/forest/forest-9.jpeg",
  "assets/img/backgrounds/levels/forest/forest-10.jpeg",
  "assets/img/backgrounds/levels/forest/forest-11.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-1.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-2.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-3.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-4.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-5.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-6.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-7.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-8.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-9.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-10.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-11.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-12.jpeg",
  "assets/img/backgrounds/levels/sewers/sewers-13.jpeg",
  "assets/img/backgrounds/textures/consumable-bg.png",
  "assets/img/backgrounds/textures/enemy-pos-bg.jpeg",
  "assets/img/backgrounds/textures/hero-data-background.jpeg",
  "assets/img/backgrounds/textures/hero-pos-bg.jpeg",
  "assets/img/buffs/filled-poison-sack.buff.png",
  "assets/img/buffs/holy-shield-buff.png",
  "assets/img/buffs/infuse-light-buff.png",
  "assets/img/buffs/scared-debuff.jpeg",
  "assets/img/buffs/sharpened-weapon.png",
  "assets/img/consumables/bag-extension.png",
  "assets/img/consumables/big-potion.png",
  "assets/img/consumables/medium-potion.png",
  "assets/img/consumables/minor-potion.png",
  "assets/img/consumables/whetstone.png",
  "assets/img/debuff/bleeding-debuff.png",
  "assets/img/debuff/decomposing-poison.jpeg",
  "assets/img/enemies/alligator/alligator-1.png",
  "assets/img/enemies/alligator/alligator-2.png",
  "assets/img/enemies/alligator/alligator-3.png",
  "assets/img/enemies/alligator/alligator-4.png",
  "assets/img/enemies/alligator/alligator-5.png",
  "assets/img/enemies/bat/bat-1.png",
  "assets/img/enemies/bat/bat-2.png",
  "assets/img/enemies/bat/bat-3.png",
  "assets/img/enemies/bat/bat-4.png",
  "assets/img/enemies/bat/bat-5.png",
  "assets/img/enemies/bear/bear-1.png",
  "assets/img/enemies/bear/bear-2.png",
  "assets/img/enemies/bear/bear-3.png",
  "assets/img/enemies/bear/bear-4.png",
  "assets/img/enemies/goblinRanger/goblin-ranger-1.png",
  "assets/img/enemies/goblinRanger/goblin-ranger-2.png",
  "assets/img/enemies/goblinRanger/goblin-ranger-3.png",
  "assets/img/enemies/goblinRanger/goblin-ranger-4.png",
  "assets/img/enemies/goblinRanger/goblin-ranger-5.png",
  "assets/img/enemies/rat/rat-1.png",
  "assets/img/enemies/rat/rat-2.png",
  "assets/img/enemies/rat/rat-3.png",
  "assets/img/enemies/rat/rat-4.png",
  "assets/img/enemies/rat/rat-5.png",
  "assets/img/enemies/rat/rat-6.png",
  "assets/img/enemies/snake/snake-1.png",
  "assets/img/enemies/snake/snake-2.png",
  "assets/img/enemies/snake/snake-3.png",
  "assets/img/enemies/snake/snake-4.png",
  "assets/img/enemies/snake/snake-5.png",
  "assets/img/enemies/spider/spider-1.png",
  "assets/img/enemies/spider/spider-2.png",
  "assets/img/enemies/spider/spider-3.png",
  "assets/img/enemies/spider/spider-4.png",
  "assets/img/enemies/spider/spider-5.png",
  "assets/img/enemies/spider/spider-6.png",
  "assets/img/enemies/varan/waran-1.png",
  "assets/img/enemies/varan/waran-2.png",
  "assets/img/enemies/varan/waran-3.png",
  "assets/img/enemies/wolf/wolf-1.png",
  "assets/img/enemies/wolf/wolf-2.png",
  "assets/img/enemies/wolf/wolf-3.png",
  "assets/img/enemies/wolf/wolf-4.png",
  "assets/img/enemies/wolf/wolf-5.png",
  "assets/img/enemies/wolf/wolf-6.png",
  "assets/img/enemyAbilities/aimed-shot.jpeg",
  "assets/img/enemyAbilities/basic-attack.jpeg",
  "assets/img/enemyAbilities/bear-roar.jpeg",
  "assets/img/enemyAbilities/ferocious-bite.jpeg",
  "assets/img/enemyAbilities/lizard-tail-blow.jpeg",
  "assets/img/enemyAbilities/spitting-decomposing-poison.jpeg",
  "assets/img/enemyAbilities/vampiric-bite.jpeg",
  "assets/img/hero/templar-portrait.png",
  "assets/img/hero/templar.png",
  "assets/img/hero/warrior-portrait.png",
  "assets/img/hero/warrior.png",
  "assets/img/HUD/can-move.png",
  "assets/img/HUD/death-icon.png",
  "assets/img/HUD/deleteBtn.png",
  "assets/img/HUD/heart-broken.png",
  "assets/img/HUD/heart.png",
  "assets/img/HUD/loot-icon.png",
  "assets/img/HUD/sack.png",
  "assets/img/HUD/shield.png",
  "assets/img/HUD/swords-crossed.png",
  "assets/img/icons/icon-128x128.png",
  "assets/img/icons/icon-144x144.png",
  "assets/img/icons/icon-152x152.png",
  "assets/img/icons/icon-192x192.png",
  "assets/img/icons/icon-256x256.png",
  "assets/img/icons/icon-512x512.png",
  "css/board/board-vars.css",
  "css/board/enemies-panel.css",
  "css/board/game-board.css",
  "css/board/hero-panel.css",
  "css/board/select-hero-panel.css",
  "css/board/select-level-panel.css",
  "css/board/start-game-panel.css",
  "css/base.css",
  "css/dungeon-info-panel.css",
  "css/enemy-card-canvas.css",
  "css/hero-card-canvas.css",
  "css/options-panel.css",
  "data/heroes.json",
  "data/levels.json",
  "js/app.js",
  "modules/buffDebuff/BleedingDebuff.js",
  "modules/buffDebuff/BuffDebuff.js",
  "modules/buffDebuff/DecomposingPoisonDebuff.js",
  "modules/buffDebuff/DragonsRoarBuff.js",
  "modules/buffDebuff/FilledPoisonSackBuff.js",
  "modules/buffDebuff/HolyShieldBuff.js",
  "modules/buffDebuff/InfuseLightBuff.js",
  "modules/buffDebuff/ScaredDebuff.js",
  "modules/buffDebuff/SharpenedWeaponBuff.js",
  "modules/canvas/Canvas.js",
  "modules/canvas/EnemyCardCanvis.js",
  "modules/canvas/EntityCardCanvas.js",
  "modules/canvas/HeroCardCanvas.js",
  "modules/canvas/LootCardCanvas.js",
  "modules/consumable/BagExtension.js",
  "modules/consumable/BigPotionConsumable.js",
  "modules/consumable/Consumable.js",
  "modules/consumable/consumables.js",
  "modules/consumable/MediumPotionConsumable.js",
  "modules/consumable/MinorPotionConsumable.js",
  "modules/consumable/WhetstoneConsumable.js",
  "modules/enemy/EnemyCard.js",
  "modules/enemy/EnemyCardAlligator.js",
  "modules/enemy/EnemyCardAnaconda.js",
  "modules/enemy/EnemyCardBat.js",
  "modules/enemy/EnemyCardBear.js",
  "modules/enemy/EnemyCardRat.js",
  "modules/enemy/EnemyCardSpider.js",
  "modules/enemy/EnemyCardWaran.js",
  "modules/enemy/EnemyCardWolf.js",
  "modules/enemy/EnemyGoblinRanger.js",
  "modules/EnemyAbilities/AimedShot.js",
  "modules/EnemyAbilities/BasicAttackEnemyAbility.js",
  "modules/EnemyAbilities/BearRoarEnemyAbility.js",
  "modules/EnemyAbilities/EnemyAbility.js",
  "modules/EnemyAbilities/FerociousBiteEnemyAbility.js",
  "modules/EnemyAbilities/LizardTailBlowEnemyAbility.js",
  "modules/EnemyAbilities/SpittingDecomposingPoisonAbility.js",
  "modules/EnemyAbilities/VampiricBiteEnemyAbility.js",
  "modules/Hero/Backpack.js",
  "modules/Hero/ConsumableSlot.js",
  "modules/Hero/HeroCard.js",
  "modules/Hero/heroes.js",
  "modules/Hero/TemplarCard.js",
  "modules/Hero/WarriorCard.js",
  "modules/HeroAbilities/DragonsRorAbility.js",
  "modules/HeroAbilities/ExecuteAbility.js",
  "modules/HeroAbilities/HammerSlamAbility.js",
  "modules/HeroAbilities/HeroAbility.js",
  "modules/HeroAbilities/HolyShieldAbility.js",
  "modules/HeroAbilities/InfuseLightAbility.js",
  "modules/HeroAbilities/JudgementAbility.js",
  "modules/HeroAbilities/SwordSlashAbility.js",
  "modules/HeroAbilities/SwordThrustAbility.js",
  "modules/level/DuskwoodForest.js",
  "modules/level/GameLevel.js",
  "modules/level/levels.js",
  "modules/level/LocalSewers.js",
  "modules/lib/utils.js",
  "modules/loot/LootCard.js",
  "modules/AudioPlayer.js",
  "modules/db.js",
  "modules/DungeonInfoPanel.js",
  "modules/GameBoard.js",
  "modules/GameEngine.js",
  "modules/HeroSavedSelectDisplay.js",
  "modules/HeroSelectDisplay.js",
  "modules/idb-src.js",
  "modules/LevelSelectDisplay.js",
  "modules/main.js",
  "modules/SelecSavedtHeroPanel.js",
  "modules/SelectHeroPanel.js",
  "modules/SelectLevelPanel.js",
  "modules/StartGamePanel.js",
  "favicon.png",
  "index.html",
  "main.css",
  "manifest.json",
  "service-worker.js",
  "modules/install.js",
  "assets/fonts/OFL.txt",
  "assets/fonts/PressStart2P-Regular.ttf",
  "assets/fonts/PressStart2P-Regular.woff2",
  "assets/img/HUD/volume_up.png",
  "assets/img/HUD/volume_off.png",
  "assets/img/HUD/fullscreen_exit.png",
  "assets/img/HUD/fullscreen.png",
];

self.addEventListener("install", function (e) {
  console.log("[ServiceWorker] Installed");

  // e.waitUntil Delays the event until the Promise is resolved
  e.waitUntil(
    // Open the cache
    caches.open(cacheName).then(function (cache) {
      // Add all the default files to the cache
      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  ); // end e.waitUntil
});

self.addEventListener("activate", function (e) {
  console.log("[ServiceWorker] Activated");

  e.waitUntil(
    // Get all the cache keys (cacheName)
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (thisCacheName) {
          // If a cached item is saved under a previous cacheName
          if (thisCacheName !== cacheName) {
            // Delete that cached file
            console.log(
              "[ServiceWorker] Removing Cached Files from Cache - ",
              thisCacheName
            );
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  ); // end e.waitUntil
});

self.addEventListener("fetch", function (e) {
  console.log("[ServiceWorker] Fetch", e.request.url);

  // e.respondWidth Responds to the fetch event
  e.respondWith(
    // Check in cache for the request being made
    caches
      .match(e.request)

      .then(function (response) {
        // If the request is in the cache
        if (response) {
          console.log(
            "[ServiceWorker] Found in Cache",
            e.request.url,
            response
          );
          // Return the cached version
          return response;
        }

        // If the request is NOT in the cache, fetch and cache

        var requestClone = e.request.clone();
        return fetch(requestClone)
          .then(function (response) {
            if (!response) {
              console.log("[ServiceWorker] No response from fetch ");
              return response;
            }

            var responseClone = response.clone();

            //  Open the cache
            caches.open(cacheName).then(function (cache) {
              // Put the fetched response in the cache
              cache.put(e.request, responseClone);
              console.log("[ServiceWorker] New Data Cached", e.request.url);

              // Return the response
              return response;
            }); // end caches.open
          })
          .catch(function (err) {
            console.log(
              "[ServiceWorker] Error Fetching & Caching New Data",
              err
            );
          });
      }) // end caches.match(e.request)
  ); // end e.respondWith
});
