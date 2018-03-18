export class MainScene extends Phaser.State {
  preload(): void {
    this.load.image('logo', 'public/assets/img/phaser.png')
    this.load.image('sky', 'public/assets/img/sky.png')
    this.load.image('ground', 'public/assets/img/platform.png')
    this.load.image('star', 'public/assets/img/star.png')
    this.load.spritesheet('dude', 'public/assets/img/dude.png', 32, 48)
  }

  create(): void {
    this.add.sprite(0, 0, 'star')
    this.add.image(400, 300, 'sky')
    this.add.image(400, 300, 'star')
  }

  update(): void {}
}
