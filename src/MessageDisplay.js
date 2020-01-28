import React from 'react';

const gameStates = {
	GAME_STATE_START: "GAME_STATE_START",
	GAME_STATE_PLAY: "GAME_STATE_PLAY",
	GAME_STATE_WIN: "GAME_STATE_WIN",
	GAME_STATE_LOSE: "GAME_STATE_LOSE"
}

class MessageDisplay extends React.Component {

	renderMessage = () => {
		let message = '';
		switch (this.props.gameState) 
		{
			case gameStates.GAME_STATE_PLAY:
				message = <span>Find the bombs!</span>;
				break;
			case gameStates.GAME_STATE_START:
				message = <span>Click a tile to begin</span>;
				break;
			case gameStates.GAME_STATE_WIN:
				message = <span>You win! Click  <i className="far fa-smile"></i>  to play again</span>;
				break;
			case gameStates.GAME_STATE_LOSE:
				message = <span>You lose! Click  <i className="far fa-smile"></i>  to play again</span>;
				break;
			default:
					// Do nothing
		}
		return message;
	}

	render = () => {
		return (
			<div className="message-display">
				{this.renderMessage()}
			</div>
		);
	}
}

export default MessageDisplay;