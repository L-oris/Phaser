export class MainScene extends Phaser.Scene {
  // private phaserSprite: Phaser.GameObjects.Sprite

  preload(): void {
    this.load.image('logo', 'public/assets/img/phaser.png')
    this.load.image('sky', 'public/assets/img/sky.png')
    this.load.image('ground', 'public/assets/img/platform.png')
    this.load.image('star', 'public/assets/img/star.png')
    this.load.image('bomb', 'public/assets/img/bomb.png')
    // this.load.spritesheet('dude', 'public/assets/img/dude.png', {
    //   frameWidth: 32,
    //   frameHeight: 48,
    // })
  }

  create(): void {
    this.add.image(400, 300, 'sky')
    this.add.image(400, 300, 'star')
    // this.phaserSprite = this.add.sprite(400, 300, 'logo')
  }

  update(): void {}
}
