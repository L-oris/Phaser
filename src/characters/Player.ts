export class Player extends Phaser.State {
  preload(): void {
    this.load.spritesheet('dude', 'public/assets/img/dude.png', 32, 48)
  }

  create() {
    const player = this.add.sprite(32, this.world.height - 150, 'dude')
    this.physics.arcade.enable(player)

    player.body.bounce.y = 0.2
    player.body.gravity.y = 300
    player.body.collideWorldBounds = true

    player.animations.add('left', [0, 1, 2, 3], 10, true)
    player.animations.add('right', [5, 6, 7, 8], 10, true)
  }
}
