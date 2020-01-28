import React from 'react';

class TimerDisplay extends React.Component {

	formatTime = () => {
		let numSeconds = this.props.numSeconds;
		let numMinutes = Math.floor(numSeconds / 60);
		let numHours = Math.floor(numMinutes / 60);
		let formattedTime = "";

		if(numMinutes > 0)
		{
			if(numHours > 0)
			{
				formattedTime = numHours.toString() + ":";
				numMinutes = numMinutes % 60;
			}
			formattedTime += numMinutes.toString() + ":";
			numSeconds = numSeconds % 60;
		}
		formattedTime += numSeconds.toString();
		return formattedTime;
	}

	render = () => {
		return (
			<button className="btn timer">
				{ this.formatTime() }
			</button>
		);
	}
}

export default TimerDisplay;