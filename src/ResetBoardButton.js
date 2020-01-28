import React from 'react';

class ResetBoardButton extends React.Component {

	render = () => {
		return (
			<button className="btn reset-board-button" onClick={this.props.resetBoard}>
				<i className="far fa-smile"></i>
			</button>
		);
	}
}

export default ResetBoardButton;