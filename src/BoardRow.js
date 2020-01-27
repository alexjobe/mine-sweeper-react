import React from 'react';
import Tile from './Tile';

class BoardRow extends React.Component {

	renderRow = () => {
		const tiles = this.props.row.map((tile, index) => (
			<Tile 
				key = {index}
				isVisible = {tile.isVisible}
				hasBomb = {tile.hasBomb}
				isFlagged = {tile.isFlagged}
				numAdjBombs = {tile.numAdjBombs}
				onSelectTile = {this.props.onSelectTile.bind(this, this.props.rowNum, index)}
			/>
		));

		return (
			<div className="board-row">
				{tiles}
			</div>
		);
	}

	render = () => {
		return this.renderRow();
	}
}

export default BoardRow;