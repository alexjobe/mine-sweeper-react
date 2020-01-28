import React from 'react';

class FlagButton extends React.Component {

	render = () => {
		return (
			<button className="btn flag-button" onClick={this.props.toggleFlagMode}>
				{
					this.props.flagMode ? 
						<i className="fas fa-flag"></i>
					: 
						<i className="fas fa-radiation"></i>
				}
			</button>
		);
	}
}

export default FlagButton;