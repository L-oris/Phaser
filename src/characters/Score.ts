import * as _ from 'lodash-es'

export interface ScoreText extends Phaser.Text {
  incrementScore: (inc: number) => ScoreText
}

export function ScoreTextFactory(
  state: Phaser.State,
  initialScore: number
): ScoreText {
  const scoreText = state.add.text(16, 16, `Score: ${initialScore}`, {
    fontSize: 32,
    fill: '#000',
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
