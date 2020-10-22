import React from 'react';
import Button from './components/Button';
import Grid from './components/Grid';


export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isGameRunning: 0
        };
    }

    toggleGame = () => {
        this.setState({
            isGameRunning: !this.state.isGameRunning
        })
    }

    render() {
        return (
            <>
                <Button
                    toggleGame={this.toggleGame}
                    isGameRunning={this.state.isGameRunning}
                />
                <Grid
                    gridPace={this.props.pace}
                    gridSize={this.props.gridSize}
                    isGameRunning={this.state.isGameRunning}
                />
            </>
        );
    };
}
