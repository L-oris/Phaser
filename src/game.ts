/// <reference path="./phaser.d.ts"/>

import 'phaser'
import { MainScene } from './scenes/mainScene'

// main game configuration
const config: GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: {
    MainScene
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  }
}

// game class
export class Game extends Phaser.Game {
  constructor(GameConfig: config) {
    super(config)
    this.scene.add('MainScene', MainScene, false)
    this.scene.start('MainScene')
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  var game = new Game(config)
}
