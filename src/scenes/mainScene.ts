import { PlayerFactory, StarsFactory, Player, Stars } from '../characters'

export class MainScene extends Phaser.State {
  player: Player
  platforms: Phaser.Group
  stars: Stars
  cursors: Phaser.CursorKeys
  scoreText: Phaser.Text
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

    // ground
    const ground = this.platforms.create(0, this.world.height - 64, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true

    // platforms
    this.platforms.create(400, 400, 'ground').body.immovable = true
    this.platforms.create(-150, 250, 'ground').body.immovable = true

    // player
    this.player = PlayerFactory(this, 'player')

    // stars
    this.stars = StarsFactory(this, 'star')
    for (let i = 0; i <= 12; i++) {
      this.stars.createBouncingStar(i * 70, 0)
    }

    // cursors
    this.cursors = this.input.keyboard.createCursorKeys()

    // score
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: 32,
      fill: '#000',
    })
  }

  update(): void {
    const hitPlatform = this.physics.arcade.collide(this.player, this.platforms)
    this.physics.arcade.collide(this.stars, this.platforms)
    this.physics.arcade.overlap(this.player, this.stars, this.collectStar)

    this.player.setSpeedX(0)
    if (this.cursors.left.isDown) {
      this.player.turnLeft()
    } else if (this.cursors.right.isDown) {
      this.player.turnRight()
    } else {
      this.player.stop()
    }

    if (this.cursors.up.isDown && hitPlatform) {
      const returned = this.player.jump()
    }
  }

  private collectStar = (_player: Phaser.Sprite, star: Phaser.Group): void => {
    star.kill()
    this.score += 10
    this.scoreText.text = `Score: ${this.score}`
  }
}
