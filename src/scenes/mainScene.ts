/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite

  preload(): void {
    this.load.image('logo', 'public/assets/img/phaser.png')
  }

  create(): void {
    this.phaserSprite = this.add.sprite(400, 300, 'logo')
  }
}
