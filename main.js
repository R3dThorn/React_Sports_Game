function App(props) {
    return <Game venue='Fuck All Stadium' />
}

class Team extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            score: 0,
            shotsTaken: 0,
            visibility: "hidden"
        }
    }
    
    handleShot = (event) => {
        const shoot = new Audio("media/audio/woodbat.mp3")
        const score = new Audio("media/audio/Ball+Hit+Cheer.mp3")
        
        if (Math.round(Math.random() * 100) > 70) {
            return (
                this.state.visibility = "visible",
                this.setState({
                    score: this.state.score + 1,
                    shotsTaken: this.state.shotsTaken + 1
                }),
                score.play()
                )
            }
            return (
                this.state.visibility = "visible",
                this.setState({ shotsTaken: this.state.shotsTaken + 1 }),
                shoot.play()
                )
            }
            
    render() {
        const ratio = (this.state.score / this.state.shotsTaken) || 0
        return (
            <div className={this.props.teamOrigin}>
                <h1>Team {this.props.name}</h1>
                <img src={this.props.logo} />
                <p>Score: {this.state.score}</p>
                <p>Shots Taken: {this.state.shotsTaken}</p>
                <p className={"_ratio"} style={{visibility: this.state.visibility}}>Shot Ratio: {(ratio*100).toFixed(2) + '%'}</p>
                <button onClick={this.handleShot}>Shoot!</button>
            </div>
        )
    }
}

class Game extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <>
                <h1>Welcome to {this.props.venue}!</h1>
                <div id="container">
                    <Team
                        teamOrigin="Visiting"
                        name="NY Yankees"
                        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/NewYorkYankees_caplogo.svg/800px-NewYorkYankees_caplogo.svg.png"
                    />
                    <Team
                        teamOrigin="Home"
                        name="SF Giants"
                        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/San_Francisco_Giants_Cap_Insignia.svg/800px-San_Francisco_Giants_Cap_Insignia.svg.png"
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