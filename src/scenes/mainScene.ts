export class MainScene extends Phaser.State {
  dude: Phaser.Sprite
  platforms: Phaser.Group
  cursors: Phaser.CursorKeys

  preload(): void {
    this.load.image('sky', 'public/assets/img/sky.png')
    this.load.image('ground', 'public/assets/img/platform.png')
    this.load.image('star', 'public/assets/img/star.png')
    this.load.spritesheet('dude', 'public/assets/img/dude.png', 32, 48)
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

    // dude
    this.dude = this.createDude(this)

    // cursors
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(): void {
    const hitPlatform = this.physics.arcade.collide(this.dude, this.platforms)

    // move player
    this.dude.body.velocity.x = 0
    if (this.cursors.left.isDown) {
      this.dude.body.velocity.x = -150
      this.dude.animations.play('left')
    } else if (this.cursors.right.isDown) {
      this.dude.body.velocity.x = 150
      this.dude.animations.play('right')
    } else {
      this.dude.animations.stop()
      this.dude.frame = 4
    }

    // jump
    if (this.cursors.up.isDown && this.dude.body.touching.down && hitPlatform) {
      this.dude.body.velocity.y = -350
    }
  }

  private createDude(state: Phaser.State): Phaser.Sprite {
    const player = state.add.sprite(32, this.world.height - 150, 'dude')
    state.physics.arcade.enable(player)

    player.body.bounce.y = 0.2
    player.body.gravity.y = 300
    player.body.collideWorldBounds = true

    player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)

    return player
  }
}
