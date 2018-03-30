import {
  PlayerFactory,
  StarsFactory,
  Player,
  Stars,
  ScoreTextFactory,
  ScoreText,
} from '../characters'

export class MainScene extends Phaser.State {
  player: Player
  platforms: Phaser.Group
  stars: Stars
  cursorKeys: Phaser.CursorKeys
  scoreText: ScoreText
  score = 0

  preload(): void {
    this.load.image('sky', 'public/assets/img/sky.png')
    this.load.image('ground', 'public/assets/img/platform.png')
    this.load.image('star', 'public/assets/img/star.png')
    this.load.spritesheet('player', 'public/assets/img/dude.png', 32, 48)
  }

  create(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.add.sprite(0, 0, 'sky')

    this.platforms = this.add.group()
    this.platforms.enableBody = true

    const ground = this.platforms.create(0, this.world.height - 64, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true

    this.platforms.create(400, 400, 'ground').body.immovable = true
    this.platforms.create(-150, 250, 'ground').body.immovable = true

    this.player = PlayerFactory(this, 'player')

    this.stars = StarsFactory(this, 'star')
    for (let i = 0; i <= 12; i++) {
      this.stars.createBouncingStar(i * 70, 0)
    }

    this.scoreText = ScoreTextFactory(this, 0)

    this.cursorKeys = this.input.keyboard.createCursorKeys()
  }

  update(): void {
    const hitPlatform = this.physics.arcade.collide(this.player, this.platforms)
    this.physics.arcade.collide(this.stars, this.platforms)
    this.physics.arcade.overlap(this.player, this.stars, this.collectStar)

    this.player.setSpeedX(0)
    if (this.cursorKeys.left.isDown) {
      this.player.turnLeft()
    } else if (this.cursorKeys.right.isDown) {
      this.player.turnRight()
    } else {
      this.player.stop()
    }

    if (this.cursorKeys.up.isDown && hitPlatform) {
      const returned = this.player.jump()
    }
  }

  private collectStar = (_player: Player, stars: Stars): void => {
    stars.kill()
    this.scoreText.incrementScore(10)
  }
}
