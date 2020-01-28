import React from 'react';

class BombsLeftDisplay extends React.Component {

	render = () => {
		return (
			<button className="btn bombs-left-display" onClick={this.props.resetFlags}>
				{this.props.bombsLeft}
			</button>
		);
	}
}

export default BombsLeftDisplay;