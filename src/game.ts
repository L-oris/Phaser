/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>

import 'p2'
import 'pixi'
import 'phaser'
import { MainScene } from './scenes'
import { Player } from './characters'

export class Game extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO, 'game')
    this.state.add('MainScene', MainScene)
    this.state.start('MainScene')
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  var game = new Game()
}
