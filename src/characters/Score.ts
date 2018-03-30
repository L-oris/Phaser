import * as _ from 'lodash-es'

export interface ScoreText extends Phaser.Text {
  incrementScore: (inc: number) => ScoreText
}

export interface ScoreTextSettings {
  initialScore: number
  positionX?: number
  positionY?: number
  fontSize?: number
  color?: string
}

export function ScoreTextFactory(
  state: Phaser.State,
  { initialScore, positionX, positionY, fontSize, color }: ScoreTextSettings
): ScoreText {
  const scoreText = state.add.text(
    positionX || 16,
    positionY || 16,
    `Score: ${initialScore}`,
    {
      fontSize: fontSize || 32,
      fill: color || '#000',
    }
  ) as ScoreText

  let actualScore = initialScore
  return _.merge(scoreText, {
    incrementScore(inc: number): ScoreText {
      actualScore += inc
      scoreText.text = `Score: ${actualScore}`
      return scoreText
    },
  })
}
