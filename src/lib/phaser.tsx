import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import PhaserButtonContent from './phaser_button_content';
import dragon from '/dragon.png';
import bird from '/bird.png';
import cloud from '/cloud.png';
import bolt1 from '/bolt.png';
import bolt2 from '/bolt2.png';
import bolt3 from '/bolt3.png';
import bolt4 from '/bolt4.png';

// ✅ Define your scene interface
interface CustomScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  scoreValue: number;
  obstaclesQueue: Phaser.Physics.Arcade.Sprite[];
  framesSinceLastObstacle: number;
  obstacleSpeedUpModifier: number;
  scoreText: Phaser.GameObjects.Text;
  wKey: Phaser.Input.Keyboard.Key;
  sKey: Phaser.Input.Keyboard.Key;
}

type FunctionProps = {
  onHideGame: () => void;
};

export default function PhaserGame({ onHideGame }: FunctionProps) {
  const [gameHidden, setGameHidden] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState(-1);
  const [highScores, setHighScores] = useState<any[]>([]);
  const [nameWriting, setNameWriting] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const gameStartedRef = useRef(false);
  const phaserSceneRef = useRef<CustomScene | null>(null);

  const handleStart = (): void => {
    if (phaserSceneRef.current) {
      phaserSceneRef.current.scene.restart();
    }
    setNameWriting(false);
    setFinalScore(0);
    setDirection(null);
    gameStartedRef.current = true;
    setGameStarted(true);
  };

  useEffect(() => {
    let firstGameStart = true;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.RESIZE,
        parent: gameContainerRef.current!,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: { transparent: true },
      backgroundColor: 'transparent',
      physics: {
        default: 'arcade',
        arcade: { gravity: { x: 0, y: 0 }, debug: false },
      },
      audio: { noAudio: true },
      scene: {
        preload,
        create,
        update,
      } as unknown as Phaser.Types.Scenes.SettingsConfig,
    };

    const game = new Phaser.Game(config);

    function preload(this: CustomScene): void {
      this.load.image('cloud', cloud);
      this.load.image('bolt1', bolt1);
      this.load.image('bolt2', bolt2);
      this.load.image('bolt3', bolt3);
      this.load.image('bolt4', bolt4);
      this.load.image('bird', bird);
      this.load.spritesheet('dragon', dragon, {
        frameWidth: 191,
        frameHeight: 161,
      });
    }

    function create(this: CustomScene): void {
      phaserSceneRef.current = this;

      this.scoreValue = 0;
      this.framesSinceLastObstacle = 0;
      this.obstacleSpeedUpModifier = 0;
      this.obstaclesQueue = [];

      const rect = gameContainerRef.current?.getBoundingClientRect();
      if (rect) {
        this.scale.resize(rect.width, rect.height);
        this.physics.world.setBounds(0, 0, rect.width, rect.height);
      }

      const onScroll = (): void => {
        try {
          const r = gameContainerRef.current?.getBoundingClientRect();
          if (r) {
            this.scale.resize(r.width, r.height);
            this.physics.world.setBounds(0, 0, r.width, r.height);
          }
        } catch {
          // ignore
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      this.events.once('shutdown', () =>
        window.removeEventListener('scroll', onScroll)
      );

      const width = this.scale.width;
      const height = this.scale.height;
      this.physics.world.setBounds(0, 0, width, height);

      this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('dragon', { start: 3, end: 5 }),
        frameRate: 6,
        repeat: -1,
      });

      this.player = this.physics.add
        .sprite(50, 50, 'dragon')
        .setScale(0.45)
        .play('fly');
      this.player.setCollideWorldBounds(true);
      this.player.body?.setSize(40, 60);
      this.player.body?.setOffset(20, 50);

      this.scoreText = this.add
        .text(width / 2, 20, 'Score: 0', {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#cccccc',
        })
        .setOrigin(0.5, 0);

      if (firstGameStart) this.scoreText.setAlpha(0);

      if (this.input.keyboard) {
        this.wKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.W
        );
        this.sKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.S
        );
      }

      if (firstGameStart && gameStartedRef.current) {
        const style: Phaser.Types.GameObjects.Text.TextStyle = {
          fontFamily: 'Arial',
          fontSize: '12px',
          fontStyle: 'italic',
          color: '#fff',
          stroke: '#000',
          strokeThickness: 2,
        };
        const t1 = this.add
          .text(
            this.player.x + 60,
            this.player.y - 20,
            'Press W/S or use buttons',
            style
          )
          .setOrigin(0, 0.5);
        const t2 = this.add
          .text(this.player.x + 60, this.player.y + 5, 'Avoid obstacles', style)
          .setOrigin(0, 0.5);

        this.tweens.add({
          targets: [t1, t2],
          alpha: 0,
          y: '-=10',
          ease: 'Cubic.easeOut',
          delay: 4000,
          duration: 1000,
          onComplete: () => {
            t1.destroy();
            t2.destroy();
            this.tweens.add({
              targets: this.scoreText,
              alpha: 1,
              duration: 1000,
            });
          },
        });
        firstGameStart = false;
      }
    }

    function update(this: CustomScene): void {
      if (!gameStartedRef.current) return;

      const s = this.scoreValue;
      if (s < 5) this.obstacleSpeedUpModifier = 20;
      else if (s < 10) this.obstacleSpeedUpModifier = 40;
      else if (s < 15) this.obstacleSpeedUpModifier = 70;
      else if (s < 25) this.obstacleSpeedUpModifier = 90;
      else this.obstacleSpeedUpModifier = 100;

      this.framesSinceLastObstacle++;
      if (this.framesSinceLastObstacle >= 180 - this.obstacleSpeedUpModifier) {
        this.obstaclesQueue.push(addObstacle(this));
        this.framesSinceLastObstacle = 0;
      }

      this.obstaclesQueue = this.obstaclesQueue.filter((obs) => {
        if (obs.x + obs.displayWidth < 0) {
          obs.destroy();
          return false;
        }
        return true;
      });

      if (this.wKey.isDown) this.player.setVelocityY(-230);
      else if (this.sKey.isDown) this.player.setVelocityY(230);

      while (
        this.obstaclesQueue.length &&
        this.player.x >= this.obstaclesQueue[0].x
      ) {
        this.obstaclesQueue.shift();
        this.scoreValue++;
        this.scoreText.setText(`Score: ${this.scoreValue}`);
      }
    }

    function addObstacle(scene: CustomScene): Phaser.Physics.Arcade.Sprite {
      const x = scene.scale.width + 50;
      const y = Phaser.Math.Between(20, scene.scale.height - 20);
      const s = scene.scoreValue;
      let correctSprite = 'bolt1';
      if (s < 5) correctSprite = 'bolt1';
      else if (s < 10) correctSprite = 'bolt2';
      else if (s < 15) correctSprite = 'bolt3';
      else if (s < 25) correctSprite = 'bolt4';
      else correctSprite = 'bolt1';

      const obs = scene.physics.add
        .sprite(x, y, correctSprite)
        .setScale(Phaser.Math.FloatBetween(0.05, 0.3));
      obs.body.setImmovable(true);
      obs.setVelocityX(-400);

      if (gameStartedRef.current) {
        scene.physics.add.collider(scene.player, obs, () => {
          setFinalScore(scene.scoreValue);
          gameStartedRef.current = false;
          setGameStarted(false);
        });
      }
      return obs;
    }

    return () => game.destroy(true);
  }, []);

  // Fetch scores
  useEffect(() => {
    const fetchScores = async (): Promise<void> => {
      try {
        const response = await fetch(
          'https://personal-website-backend-production-c5a6.up.railway.app/api/scores'
        );
        if (response.ok) {
          const data = await response.json();
          setHighScores(data?.scores || []);
        } else {
          console.error('Failed to fetch scores:', response.statusText);
        }
      } catch (err) {
        console.error('Error fetching scores:', err);
      }
    };
    fetchScores();
  }, []);

  // Check if score is top 5
  useEffect(() => {
    if (finalScore < 0) return;
    const fetchCheck = async (): Promise<void> => {
      const response = await fetch(
        'https://personal-website-backend-production-c5a6.up.railway.app/api/scores/check',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score: finalScore }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.topFive) setNameWriting(true);
      }
    };
    fetchCheck();
  }, [finalScore]);

  // Handle keyboard capture toggle
  useEffect(() => {
    const scene = phaserSceneRef.current;
    if (!scene) return;
    if (nameWriting) {
      scene.input.keyboard?.removeCapture([
        Phaser.Input.Keyboard.KeyCodes.W,
        Phaser.Input.Keyboard.KeyCodes.S,
      ]);
    } else {
      scene.input.keyboard?.addCapture([
        Phaser.Input.Keyboard.KeyCodes.W,
        Phaser.Input.Keyboard.KeyCodes.S,
      ]);
    }
  }, [nameWriting]);

  const handleUpClick = (): void => {
    const scene = phaserSceneRef.current;
    if (scene) {
      scene.player.setVelocityY(-280);
      setDirection('up');
    }
  };

  const handleDownClick = (): void => {
    const scene = phaserSceneRef.current;
    if (scene) {
      scene.player.setVelocityY(280);
      setDirection('down');
    }
  };

  if (gameHidden) return null;

  return (
    <div
      ref={gameContainerRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '200px',
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.85)',
      }}
    >
      {!gameStarted && (
        <PhaserButtonContent
          scoreToDisplay={finalScore}
          highScoresArray={highScores}
          startGameCallback={handleStart}
          hideGameCallback={() => {
            setGameHidden(true);
            onHideGame();
          }}
          nameWriting={nameWriting}
        />
      )}
      {gameStarted && (
        <>
          <button
            onClick={handleUpClick}
            style={{
              position: 'absolute',
              left: '10px',
              top: '10px',
              opacity: gameStarted ? 1 : 0,
              transition: 'opacity 0.5s',
              padding: '8px',
              background:
                direction === 'up' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            ▲
          </button>
          <button
            onClick={handleDownClick}
            style={{
              position: 'absolute',
              left: '10px',
              bottom: '10px',
              opacity: gameStarted ? 1 : 0,
              transition: 'opacity 0.5s',
              padding: '8px',
              background:
                direction === 'down' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            ▼
          </button>
        </>
      )}
    </div>
  );
}
