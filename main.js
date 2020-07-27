const App = (props) => {
    return <Game venue='Appropriate Name Stadium' />
}

const Scoreboard = (props) => {
    return (
        <>
            <h1>{props.team} Score</h1>
            <h1>{props.score}</h1>
        </>
    )
}

function Team(props) {
    const ratio = (props.score / props.shots) || 0
    return (
        <div className={props.teamOrigin}>
            <Scoreboard
                score={props.score}
                team={props.teamOrigin}
            />
            <h1>Team {props.name}</h1>
            <img src={props.logo} />
            <p>Score: {props.score}</p>
            <p>Shots Taken: {props.shots}</p>
            <p style={{ visibility: props.visibility }}>Shot Ratio: {(ratio * 100).toFixed(3) + '%'}</p>
            <button onClick={props.handleGame}>Shoot!</button>
        </div>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            homeStats: {
                score: 0,
                shots: 0,
                vis: "hidden"
            },

            visitStats: {
                score: 0,
                shots: 0,
                vis: "hidden"
            },

            resetCounter : 0
        }
        this.handleShot = this.handleShot.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleShot(team) {
        const teamKey = `${team}Stats`
        const teamScore = this.state[teamKey].score
        const teamShots = this.state[teamKey].shots
        const shootAttempt = new Audio("media/audio/woodbat.mp3")
        const scorePoint = new Audio("media/audio/Ball+Hit+Cheer.mp3")

        if ((Math.random() * 10) > 6) {
            this.setState((state, props) => ({
                [teamKey]: {
                    score: teamScore + 1,
                    shots: teamShots + 1,
                    vis: "visible"
                }
            }))
            scorePoint.play()
        }
        else {
            this.setState((state, props) => ({
                [teamKey]: {
                    score: teamScore,
                    shots: teamShots + 1,
                    vis: "visible"
                }
            }))
            shootAttempt.play()
        }

    }

    handleReset() {
        if (this.state.homeStats.shots !== 0 || this.state.visitStats.shots !== 0) { 
            alert("Game reset!")
            this.setState({resetCounter : this.state.resetCounter + 1})
        }
        this.setState({
            homeStats: {
                score: 0, 
                shots: 0, 
                vis: "hidden"},
                
            visitStats:{
                score: 0, 
                shots: 0, 
                vis: "hidden"}
        })
    }

    render() {
        return (
            <>
                <button onClick={this.handleReset}>Reset Game</button>
                <br />
                <span>Resets this session: {this.state.resetCounter}</span>
                <br />
                <h1>Welcome to {this.props.venue}!</h1>
                <div id="container">
                    <Team
                        teamOrigin="Home"
                        name="SF Giants"
                        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/San_Francisco_Giants_Cap_Insignia.svg/800px-San_Francisco_Giants_Cap_Insignia.svg.png"
                        handleGame={() => this.handleShot("home")}
                        score={this.state.homeStats.score}
                        shots={this.state.homeStats.shots}
                        visibility={this.state.homeStats.vis}
                    />
                    <Team
                        teamOrigin="Visiting"
                        name="NY Yankees"
                        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/NewYorkYankees_caplogo.svg/800px-NewYorkYankees_caplogo.svg.png"
                        handleGame={() => this.handleShot("visit")}
                        score={this.state.visitStats.score}
                        shots={this.state.visitStats.shots}
                        visibility={this.state.visitStats.vis}
                    />
                </div>
            </>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)