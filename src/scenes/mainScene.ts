export class MainScene extends Phaser.State {
  preload(): void {
    this.load.image('sky', 'public/assets/img/sky.png')
    this.load.image('ground', 'public/assets/img/platform.png')
    this.load.image('star', 'public/assets/img/star.png')
  }

  create(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.add.sprite(0, 0, 'sky')

    const platforms = this.add.group()
    platforms.enableBody = true

    const ground = platforms.create(0, this.world.height - 64, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true

    platforms.create(400, 400, 'ground').body.immovable = true
    platforms.create(-150, 250, 'ground').body.immovable = true
  }

  update(): void {}
}
