import React from 'react';

class DifficultyButton extends React.Component {

  render = () => {
    return (
      <button className="btn difficulty-button" onClick={this.props.toggleDifficulty}>
        {this.props.difficulty}
      </button>
    );
  }
}

export default DifficultyButton;