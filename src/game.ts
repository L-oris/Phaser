/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>

import 'p2'
import 'pixi'
import 'phaser'
import { MainScene } from './scenes'

// main game configuration
// const config: GameConfig = {
//   width: 800,
//   height: 600,
//   type: Phaser.AUTO,
//   parent: 'game',
//   scene: {
//     MainScene,
//   },
//   // physics: {
//   //   default: 'arcade',
//   //   arcade: {
//   //     gravity: { y: 200 }
//   //   }
//   // }
// }

export class Game extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO, 'game', MainScene)
    // this.state.add('MainScene', MainScene)
    // this.state.start('MainScene')
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  var game = new Game()
}
