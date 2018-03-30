import * as _ from 'lodash-es'

export interface Platforms extends Phaser.Group {
  createPlatform: (settings: PlatformSettings) => Platforms
}

export interface PlatformsSettings {
  image: string
}
export interface PlatformSettings {
  positionX: number
  positionY: number
  scale?: number
}

export function PlatformsFactory(
  state: Phaser.State,
  { image }: PlatformsSettings
): Platforms {
  const platforms = state.add.group() as Platforms
  platforms.enableBody = true

  return _.merge(platforms, {
    createPlatform({
      positionX,
      positionY,
      scale,
    }: PlatformSettings): Platforms {
      const platform = platforms.create(positionX, positionY, image)
      platform.body.immovable = true
      platform.scale.setTo(scale || 1, scale || 1)
      return platforms
    },
  })
}
