import React from 'react';
import BoardRow from './BoardRow';
import FlagButton from './FlagButton'
import ResetBoardButton from './ResetBoardButton';
import BombsLeftDisplay from './BombsLeftDisplay';
import TimerDisplay from './TimerDisplay';
import DifficultyButton from './DifficultyButton';

const gameStates = {
	GAME_STATE_START: "GAME_STATE_START",
	GAME_STATE_PLAY: "GAME_STATE_PLAY",
	GAME_STATE_WIN: "GAME_STATE_WIN",
	GAME_STATE_LOSE: "GAME_STATE_LOSE"
}

class Board extends React.Component {

	state = {
		numRows: 9,
		numColumns: 9,
		numBombs: 10,
		numFlags: 0,
		tiles: [],
		difficulty: "Easy"
	}

	componentDidMount = () => {
		this.resetBoard();
	}

	resetBoard = () => {
		this.props.setGameState(gameStates.GAME_STATE_START);

		let tiles = [];

		for(let r = 0; r < this.state.numRows; r++)
		{
			let row = [];
			for(let c = 0; c < this.state.numColumns; c++)
			{
				row.push({ hasBomb: false, numAdjBombs: 0, isFlagged: false, isVisible: false });
			}
			tiles.push(row);
		}

		this.setState(st => {
			return { tiles: tiles, numFlags: 0};
		});
	}

	toggleDifficulty = () => {
		let nextDifficulty = ""
		let numRows = 0;
		let numColumns = 0;
		let numBombs = 0;

		switch (this.state.difficulty) {
			case "Easy":
				nextDifficulty = "Medium";
				numRows = numColumns = 16;
				numBombs = 40;
				break;
			case "Medium":
				nextDifficulty = "Hard";
				numRows = 30;
				numColumns = 16;
				numBombs = 99;
				break;
			case "Hard":
				nextDifficulty = "Easy";
				numRows = numColumns = 9;
				numBombs = 10;
				break;
			default:
				nextDifficulty = "Easy";
				numRows = numColumns = 9;
				numBombs = 10;
				break;
		}

		this.setState(
			{ numRows: numRows, numColumns: numColumns, numBombs: numBombs, difficulty: nextDifficulty }
			, () => {
			this.resetBoard();
		});
	}

	randomizeBombs = (selectedRow, selectedCol) => {
		let tiles = this.state.tiles;

		for(let i = 0; i < this.state.numBombs; i++)
		{
			let randomRow = this.getRandomInt(this.state.numRows);
			let randomCol = this.getRandomInt(this.state.numColumns);

			// TODO: Improve speed
			if (!(randomRow === selectedRow && randomCol === selectedCol) && !tiles[randomRow][randomCol].hasBomb)
			{
				tiles[randomRow][randomCol].hasBomb = true;
				tiles = this.markAdjacent(tiles, randomRow, randomCol);
			}
			else
			{
				i--;
			}
		}

		this.setState(st => {
			return { tiles: tiles };
		});
	}

	markAdjacent = (tiles, row, col) => {
		let startRow = row - 1;
		let endRow = row + 1;
		let startCol = col - 1;
		let endCol = col + 1;

		if (startRow < 0) startRow = 0;
		if (endRow >= tiles.length) endRow = tiles.length - 1;

		if (startCol < 0) startCol = 0;
		if (endCol >= tiles[0].length) endCol = tiles[0].length - 1;

		for (let r = startRow; r <= endRow; r++) {
			for (let c = startCol; c <= endCol; c++) {
				tiles[r][c].numAdjBombs++;
			}
		}

		return tiles;
	}

	getRandomInt = (max) => {
		return Math.floor(Math.random() * Math.floor(max));
	}

	onSelectTile = (row, col) => {

		if(this.props.gameState === gameStates.GAME_STATE_START)
		{
			if (this.props.flagMode && !this.state.tiles[row][col].isVisible) 
			{
				this.flagTile(row, col);
			}
			else 
			{
				this.randomizeBombs(row, col);
				this.revealTile(row, col);
				this.props.setGameState(gameStates.GAME_STATE_PLAY);
			}
		}
		else if (this.props.gameState === gameStates.GAME_STATE_PLAY)
		{
			if (this.props.flagMode && !this.state.tiles[row][col].isVisible) 
			{
				this.flagTile(row, col);
			}
			else if (!this.state.tiles[row][col].isFlagged && this.state.tiles[row][col].hasBomb) 
			{
				this.revealBoard();
				this.props.setGameState(gameStates.GAME_STATE_LOSE);
			}
			else if (!this.state.tiles[row][col].isFlagged)
			{
				this.revealTile(row, col);
				this.checkIfWon();
			}
		}
	}

	flagTile = (row, col) => {
		let tiles = this.state.tiles;
		let numFlags = this.state.numFlags;

		!tiles[row][col].isFlagged ? numFlags++ : numFlags--;

		tiles[row][col].isFlagged = !tiles[row][col].isFlagged;

		this.setState(st => {
			return { tiles: tiles, numFlags: numFlags };
		});
	}

	revealTile = (row, col) => {
		let tiles = this.state.tiles;
		tiles[row][col].isFlagged = false;
		tiles[row][col].isVisible = true;

		if(tiles[row][col].numAdjBombs === 0)
		{
			tiles = this.revealNeighbors(tiles, row, col);
		}

		this.setState(st => {
			return { tiles: tiles };
		});
	}

	revealNeighbors = (tiles, row, col) => {
		let startRow = row - 1;
		let endRow = row + 1;
		let startCol = col - 1;
		let endCol = col + 1;

		if(startRow < 0) startRow = 0;
		if(endRow >= tiles.length) endRow = tiles.length - 1;

		if(startCol < 0) startCol = 0;
		if(endCol >= tiles[0].length) endCol = tiles[0].length - 1;

		for(let r = startRow; r <= endRow; r++)
		{
			for(let c = startCol; c <= endCol; c++)
			{
				if (!tiles[r][c].isVisible && !tiles[r][c].isFlagged)
				{
					tiles[r][c].isVisible = true;
					if (tiles[r][c].numAdjBombs === 0) {
						tiles = this.revealNeighbors(tiles, r, c);
					}
				}
			}
		}

		return tiles;
	}

	revealBoard = (won) => {
		let tiles = this.state.tiles;

		tiles.forEach((row) => {
			row.forEach((tile) => {
				if(won) { tile.isFlagged = true; }
				tile.isVisible = true;
			});
		});

		this.setState(st => {
			return { tiles: tiles };
		});
	}

	checkIfWon = () => {
		let numHiddenTiles = 0;

		this.state.tiles.forEach((row) => {
			row.forEach((tile) => {
				if (!tile.hasBomb && !tile.isVisible)
				{
					numHiddenTiles++;
				}
			});
		});

		if(numHiddenTiles === 0)
		{
			this.props.setGameState(gameStates.GAME_STATE_WIN);
			this.revealBoard(true);
		}
	}

	resetFlags = () => {
		let tiles = this.state.tiles;
		this.state.tiles.forEach((row) => {
			row.forEach((tile) => {
				tile.isFlagged = false;
			});
		});

		this.setState(st => {
			return { tiles: tiles, numFlags: 0 };
		});
	}

	renderBoard = () => {
		const rows = this.state.tiles.map((row, index) => (
			<BoardRow 
				key = {index}
				rowNum = {index}
				row = {row} 
				onSelectTile = {this.onSelectTile}
			/>
		));

		return (
			<div className="board">
				<div className="board-ui">
					{ this.props.gameState === gameStates.GAME_STATE_START ? 
						<DifficultyButton difficulty={this.state.difficulty} toggleDifficulty={this.toggleDifficulty} /> 
						: <TimerDisplay numSeconds={this.props.numSeconds} /> 
					}
					<ResetBoardButton resetBoard={this.resetBoard} />
					<BombsLeftDisplay bombsLeft={this.state.numBombs - this.state.numFlags} resetFlags={this.resetFlags} />
					<FlagButton flagMode={this.props.flagMode} toggleFlagMode={this.props.toggleFlagMode} />
				</div>
				<div className="board-rows">
					{rows}
				</div>
			</div>
		);
	}

	render = () => {
		return this.renderBoard();
	}
}

export default Board;