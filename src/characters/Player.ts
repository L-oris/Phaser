import * as _ from 'lodash-es'

export interface Player extends Phaser.Sprite {
  setSpeedX: (speed: number) => Player
  setSpeedY: (speed: number) => Player
  turnLeft: () => Player
  turnRight: () => Player
  stop: () => Player
  jump: () => Player
}

export interface PlayerSettings {
  image: string
  initialX?: number
  initialY?: number
}

export function PlayerFactory(
  state: Phaser.State,
  { image, initialX, initialY }: PlayerSettings
): Player {
  const player = state.add.sprite(
    initialX || 32,
    initialY || state.world.height - 150,
    image
  ) as Player

  state.physics.arcade.enable(player)
  player.body.bounce.y = 0.2
  player.body.gravity.y = 300
  player.body.collideWorldBounds = true

  player.animations.add('left', [0, 1, 2, 3], 10, true)
  player.animations.add('right', [5, 6, 7, 8], 10, true)

  return _.merge(player, {
    setSpeedX(speed: number): Player {
      player.body.velocity.x = speed
      return player
    },

    setSpeedY(speed: number): Player {
      player.body.velocity.y = speed
      return player
    },

    turnLeft(): Player {
      player.body.velocity.x = -150
      player.animations.play('left')
      return player
    },

    turnRight(): Player {
      player.body.velocity.x = 150
      player.animations.play('right')
      return player
    },

    stop(): Player {
      player.animations.stop()
      player.frame = 4
      return player
    },

    jump(): Player {
      if (player.body.touching.down) {
        player.body.velocity.y = -350
      }
      return player
    },
  })
}

/*
  OLD PLAYER CLASS
*/

// export class PlayerClass {
//   player: Player
//   constructor(private state: Phaser.State) {}

//   create(): Phaser.Sprite {
//     this.player = this.state.add.sprite(
//       32,
//       this.state.world.height - 150,
//       'dude'
//     ) as Player
//     this.state.physics.arcade.enable(this.player)

//     this.player.body.bounce.y = 0.2
//     this.player.body.gravity.y = 300
//     this.player.body.collideWorldBounds = true

//     this.player.animations.add('left', [0, 1, 2, 3], 10, true)
//     this.player.animations.add('right', [5, 6, 7, 8], 10, true)

//     return this.player
//   }

//   setSpeedX(speed: number): Player {
//     this.player.body.velocity.x = speed
//     return this.player
//   }

//   setSpeedY(speed: number): Player {
//     this.player.body.velocity.y = speed
//     return this.player
//   }

//   turnLeft(): Player {
//     this.setSpeedX(-150)
//     this.player.animations.play('left')
//     return this.player
//   }

//   turnRight(): Player {
//     this.setSpeedX(150)
//     this.player.animations.play('right')
//     return this.player
//   }

//   stop(): Player {
//     this.player.animations.stop()
//     this.player.frame = 4
//     return this.player
//   }

//   jump(): Player {
//     if (this.player.body.touching.down) {
//       this.setSpeedY(-350)
//     }
//     return this.player
//   }
// }
