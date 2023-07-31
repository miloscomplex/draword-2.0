import React from 'react'
import LeaderboardList from './LeaderboardList'
import { connect } from 'react-redux'
import { loadScores } from '../../redux/actions'

class LeaderboardContainer extends React.Component {

  componentDidMount = () => {
    this.props.loadScores()
  }

  loading = () => <span className='loading-message'> </span>

  render() {
    return (
      <div className='wrapper'>
        <div className='leaderboard'>
          <h2>Leaderboard</h2>
          <p className='description'>Here's the top team submissions</p>
          { this.props.loadingScores ?
            this.loading()
            :
            <LeaderboardList scores={this.props.scores} />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    scores: state.scores.scoresList,
    loadingScores: state.scores.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadScores: () => { dispatch(loadScores()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardContainer)
