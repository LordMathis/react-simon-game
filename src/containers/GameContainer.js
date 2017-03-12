var React = require('react');
var ButtonPanel = require('../components/ButtonPanel');
var Board = require('../components/Board');

var GameContainer = React.createClass({
  getInitialState: function() {
    return {
      isStarted: false,
      isStrict: false,
      level: 0
    }
  },
  handleStrictToggle: function(event) {
    this.setState({
      isStrict: !this.state.isStrict
    })
  },
  handleStart: function() {
    this.setState({
      isStarted: !this.state.isStarted
    })
  },
  handleMouseDown: function(i, event) {
    this.soundBoard[i].play();
  },
  componentDidMount: function() {
    this.soundBoard = {
      0: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
      1: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
      2: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
      3: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    }
  },
  render: function() {
    return (
      <div>
        <ButtonPanel
          isStarted={this.state.isStarted}
          isStrict={this.state.isStrict}
          level={this.state.level}
          onStrictToggle={this.handleStrictToggle}
          onStart={this.handleStart}/>
        <Board
          onMouseDown={this.handleMouseDown}/>

      </div>
    )
  }
});

module.exports = GameContainer;
