import React from 'react';

class Tile extends React.Component {

	renderTile = () => {
		let value = '?'
		let tileClass = 'tile';

		if(!this.props.isVisible)
		{
			tileClass += ' hidden';

			if (this.props.isFlagged) {
				value = <i className="fas fa-flag"></i>;
				tileClass += ' flagged';
			}
		}
		else if(this.props.hasBomb && !this.props.isFlagged)
		{
			value = <i className="fas fa-radiation"></i>;
			tileClass += ' bomb';
		}
		else if(this.props.hasBomb)
		{
			value = <i className="fas fa-radiation"></i>;
		}
		else
		{
			value = this.props.numAdjBombs;
			switch (value) {
				case 0:
					tileClass += ' zeroAdjacent';
					break;
				case 1:
					tileClass += ' oneAdjacent';
					break;
				case 2:
					tileClass += ' twoAdjacent';
					break;
				case 3:
					tileClass += ' threeAdjacent';
					break;
				case 4:
					tileClass += ' fourAdjacent';
					break;
				case 5:
					tileClass += ' fiveAdjacent';
					break;
				case 6:
					tileClass += ' sixAdjacent';
					break;
				case 7:
					tileClass += ' sevenAdjacent';
					break;
				case 8:
					tileClass += ' eightAdjacent';
					break;
				default:
					// Do nothing
			}
		}

		return (
			<button className={tileClass} onClick={this.props.onSelectTile}>
				{value}
			</button>
		);
	}

	render = () => {
		return this.renderTile();
	}
}

export default Tile;