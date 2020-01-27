import React from 'react';
import BoardRow from './BoardRow';

class Board extends React.Component {

	state = {
		tiles: [
			[{ hasBomb: true, numAdjBombs: 1, isFlagged: false, isVisible: false }, { hasBomb: false, numAdjBombs: 2, isFlagged: false, isVisible: false }, { hasBomb: false, numAdjBombs: 0, isFlagged: false, isVisible: false }],
			[{ hasBomb: true, numAdjBombs: 1, isFlagged: false, isVisible: false }, { hasBomb: false, numAdjBombs: 2, isFlagged: false, isVisible: false }, { hasBomb: false, numAdjBombs: 0, isFlagged: false, isVisible: false }],
			[{ hasBomb: false, numAdjBombs: 1, isFlagged: false, isVisible: false }, { hasBomb: false, numAdjBombs: 1, isFlagged: false, isVisible: false }, { hasBomb: false, numAdjBombs: 0, isFlagged: false, isVisible: false }]
		]
	}

	onSelectTile = (row, col) => {

		if(this.props.flagMode) 
		{ 
			this.flagTile(row, col); 
		}
		else if(this.state.tiles[row][col].hasBomb) 
		{
			this.revealBoard();
			this.props.loseGame();
		}
		else
		{
			this.revealTile(row, col);
			this.checkIfWon();
		}
	}

	flagTile = (row, col) => {
		let tiles = this.state.tiles;

		tiles[row][col].isFlagged = !tiles[row][col].isFlagged;

		this.setState(st => {
			return { tiles: tiles };
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

	revealBoard = () => {
		let tiles = this.state.tiles;

		tiles.forEach((row) => {
			row.forEach((tile) => {
				tile.isFlagged = false;
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
			this.revealBoard();
			this.props.winGame();
		}
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
				{rows}
			</div>
		);
	}

	render = () => {
		return this.renderBoard();
	}
}

export default Board;