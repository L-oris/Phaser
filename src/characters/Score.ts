import * as _ from 'lodash-es'

export interface ScoreText extends Phaser.Text {
  incrementScore: (inc: number) => ScoreText
}

export interface ScoreTextSettings {
  initialScore: number
  x?: number
  y?: number
  fontSize?: number
  color?: string
}

export function ScoreTextFactory(
  state: Phaser.State,
  { initialScore, x, y, fontSize, color }: ScoreTextSettings
): ScoreText {
  const scoreText = state.add.text(x || 16, y || 16, `Score: ${initialScore}`, {
    fontSize: fontSize || 32,
    fill: color || '#000',
  }) as ScoreText

  let actualScore = initialScore
  return _.merge(scoreText, {
    incrementScore(inc: number): ScoreText {
      actualScore += inc
      scoreText.text = `Score: ${actualScore}`
      return scoreText
    },
  })
}
