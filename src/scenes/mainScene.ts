import {
  PlayerFactory,
  StarsFactory,
  Player,
  Stars,
  ScoreTextFactory,
  ScoreText,
  Platforms,
  PlatformsFactory,
} from '../characters'

export class MainScene extends Phaser.State {
  player: Player
  platforms: Platforms
  stars: Stars
  cursorKeys: Phaser.CursorKeys
  scoreText: ScoreText

  preload(): void {
    this.load.image('sky', 'public/assets/img/sky.png')
    this.load.image('ground', 'public/assets/img/platform.png')
    this.load.image('star', 'public/assets/img/star.png')
    this.load.spritesheet('player', 'public/assets/img/dude.png', 32, 48)
  }

  create(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.cursorKeys = this.input.keyboard.createCursorKeys()

    this.scoreText = ScoreTextFactory(this, { initialScore: 0 })
    this.add.sprite(0, 0, 'sky')

    this.platforms = PlatformsFactory(this, { image: 'ground' })
    // floor
    this.platforms.createPlatform({
      positionX: 0,
      positionY: this.world.height - 64,
      scale: 2,
    })
    // middle platform
    this.platforms.createPlatform({
      positionX: 400,
      positionY: 400,
    })
    // top platform
    this.platforms.createPlatform({
      positionX: -150,
      positionY: 250,
    })

    this.player = PlayerFactory(this, {
      image: 'player',
      initialPositionX: 200,
    })

    this.stars = StarsFactory(this, { image: 'star' })
    for (let i = 0; i <= 12; i++) {
      this.stars.createBouncingStar(i * 70, 0)
    }
  }

  update(): void {
    this.physics.arcade.collide(this.stars, this.platforms)
    const hitPlatform = this.physics.arcade.collide(this.player, this.platforms)
    this.physics.arcade.overlap(
      this.player,
      this.stars,
      this.playerCollectsStar
    )

    this.player.setSpeedX(0)
    if (this.cursorKeys.left.isDown) {
      this.player.turnLeft()
    } else if (this.cursorKeys.right.isDown) {
      this.player.turnRight()
    } else {
      this.player.stop()
    }

    if (this.cursorKeys.up.isDown && hitPlatform) {
      this.player.jump()
    }
  }

  private playerCollectsStar = (_player: Player, stars: Stars): void => {
    stars.kill()
    this.scoreText.incrementScore(10)
  }
}
