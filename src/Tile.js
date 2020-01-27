import React from 'react';

class Tile extends React.Component {

	renderTile = () => {
		let value = ''
		if (this.props.isFlagged) 
		{
			value = 'F';
		}
		else if(!this.props.isVisible)
		{
			value = '?';
		}
		else if(this.props.hasBomb)
		{
			value = 'B';
		}
		else
		{
			value = this.props.numAdjBombs;
		}

		return (
			<button className="tile" onClick={this.props.onSelectTile}>
				{value}
			</button>
		);
	}

	render = () => {
		return this.renderTile();
	}
}

export default Tile;