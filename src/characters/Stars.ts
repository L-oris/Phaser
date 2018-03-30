import * as _ from 'lodash-es'

export interface Stars extends Phaser.Group {
  createBouncingStar: (positionX: number, positionY: number) => Stars
}

export interface StarsSettings {
  image: string
}

export function StarsFactory(
  state: Phaser.State,
  { image }: StarsSettings
): Stars {
  const stars = state.add.group() as Stars
  stars.enableBody = true

  return _.merge(stars, {
    createBouncingStar(positionX: number, positionY: number): Stars {
      const star = stars.create(positionX, positionY, image)
      star.body.gravity.y = 40
      star.body.bounce.y = 0.7 + Math.random() * 0.2
      return stars
    },
  })
}
