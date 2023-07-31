import React from 'react'

class LeaderboardList extends React.Component {

  render() {

    return (
      <ul>
        { orderedLeaderboard(this.props.scores) }
      </ul>
    )
  }
}

export default LeaderboardList

// helpers

const orderedLeaderboard = scores => {
  const sortedScores = scores.sort(
    (a, b) => a.time_in_seconds - b.time_in_seconds
  )
  return sortedScores.map( (score, index) => {
    return (
      <li key={score.id}> {index + 1} - Time it took: <strong>{score.time_in_seconds}</strong> sec,
      <strong> {score.room.title}</strong>,
      Phrase: <strong>{score.phrase}</strong>
      </li>
    )
  })
}
