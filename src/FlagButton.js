import React from 'react';

class FlagButton extends React.Component {

	render = () => {
		return (
			<button className="flag-button" onClick={this.props.toggleFlagMode}>
				{this.props.flagMode ? 'F' : 'B'}
			</button>
		);
	}
}

export default FlagButton;