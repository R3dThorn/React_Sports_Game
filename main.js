function App(props) {
    return <Game venue='Fuck All Stadium' />
}

class Team extends React.Component {
    constructor(props) {
        super(props)
        this.handleShot = this.handleShot.bind(this)
    }
    
    handleShot(){
        const shootAttempt = new Audio("media/audio/woodbat.mp3")
        const scorePoint = new Audio("media/audio/Ball+Hit+Cheer.mp3")
        let score = this.props.score
        let shots = this.props.shots

        if((Math.random()*10)>6){
            score++
            shots++
            scorePoint.play()
        }
        else{
            shots++
            shootAttempt.play()
        }
        this.props.handleGame(score, shots)
    }
            
    render() {
        const ratio = (this.props.score / this.props.shots) || 0
        return (
            <div className={this.props.teamOrigin}>
                <Scoreboard 
                    score={this.props.score}
                    team={this.props.teamOrigin}
                />
                <h1>Team {this.props.name}</h1>
                <img src={this.props.logo} />
                <p>Score: {this.props.score}</p>
                <p>Shots Taken: {this.props.shots}</p>
                <p className={"_ratio"} style={{visibility: this.props.visibility}}>Shot Ratio: {(ratio*100).toFixed(3) + '%'}</p>
                <button onClick={this.handleShot}>Shoot!</button>
            </div>
        )
    }
}

class Game extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            homeScore: 0,
            homeShots: 0,
            homeVis: "hidden",

            visitScore : 0,
            visitShots : 0,
            visitVis : "hidden"
        }
        this.handleHome = this.handleHome.bind(this)
        this.handleVisit = this.handleVisit.bind(this)
    }
    handleHome(score, shot){
        this.setState({homeScore : score, homeShots : shot, homeVis : "visible"})
    }

    handleVisit(score, shot){
        this.setState({visitScore : score, visitShots : shot, visitVis : "visible"})
    }

    render(){
        return (
            <>
                <h1>Welcome to {this.props.venue}!</h1>
                <div id="container">
                    <Team
                        teamOrigin="Home"
                        name="SF Giants"
                        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/San_Francisco_Giants_Cap_Insignia.svg/800px-San_Francisco_Giants_Cap_Insignia.svg.png"
                        handleGame={this.handleVisit}
                        score={this.state.visitScore}
                        shots={this.state.visitShots}
                        visibility={this.state.visitVis}
                    />
                    <Team
                        teamOrigin="Visiting"
                        name="NY Yankees"
                        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/NewYorkYankees_caplogo.svg/800px-NewYorkYankees_caplogo.svg.png"
                        handleGame={this.handleHome}
                        score={this.state.homeScore}
                        shots={this.state.homeShots}
                        visibility={this.state.homeVis}
                    />
                </div>
            </>
        )
    }
}

function Scoreboard (props){
    return(
        <>
            <h1>{props.team} Score</h1>
            <h1>{props.score}</h1>
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)