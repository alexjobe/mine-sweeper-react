import React, { Component } from 'react';
import Board from './Board';
import FlagButton from './FlagButton';

const gameStates = {
	GAME_STATE_PLAY: "GAME_STATE_PLAY",
	GAME_STATE_WIN: "GAME_STATE_WIN",
	GAME_STATE_LOSE: "GAME_STATE_LOSE"
}

class Game extends Component {
	state = {
		flagMode: false,
		gameState: gameStates.GAME_STATE_PLAY
	}

	toggleFlagMode = () => {
		this.setState(st => {
			return { flagMode: !this.state.flagMode };
		});
	}

	winGame = () => {
		this.setState(st => {
			return { gameState: gameStates.GAME_STATE_WIN };
		});
	}

	loseGame = () => {
		this.setState(st => {
			return { gameState: gameStates.GAME_STATE_LOSE };
		});
	}

	render = () => {
		return (
			<div className="game">
				<FlagButton flagMode = {this.state.flagMode} toggleFlagMode = {this.toggleFlagMode}/>
				<Board flagMode = {this.state.flagMode} winGame = {this.winGame} loseGame = {this.loseGame}/>
				{this.state.gameState === gameStates.GAME_STATE_WIN ? "You won!" : ""}
				{this.state.gameState === gameStates.GAME_STATE_LOSE ? "You lost!" : ""}
			</div>
		)
	}
}

export default Game;