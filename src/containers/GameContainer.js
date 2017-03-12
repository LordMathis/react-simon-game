var React = require('react');
var ButtonPanel = require('../components/ButtonPanel');
var Board = require('../components/Board');

var GameContainer = React.createClass({
  getInitialState: function() {
    return {
      isStarted: false,
      isStrict: false,
      level: 0,
      activeItems: [false, false, false, false]
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
    }, this.levelUp);
  },
  levelUp: function() {
    if (this.state.isStarted) {
      this.setState({
        level: this.state.level+1
      }, this.start)
    }
  },
  start: function() {
    if (!this.state.isStarted) {
      return
    }

    if (this.soundArray.length < this.state.level) {
      this.soundArray.push(Math.floor(Math.random() * 4));
    }

    this.playSounds();
  },
  playSounds: function() {
    if (!this.state.isStarted) {
      return;
    }

    // removes active effect to board item
    var setInactive = function(i) {
      var activeItems = this.state.activeItems;
      activeItems[i] = false;
      this.setState({
        activeItems: activeItems
      });
    }.bind(this);

    // adds active effect to board item
    var setActive = function(i) {
      var activeItems = this.state.activeItems;
      activeItems[i] = true;
      this.setState({
        activeItems: activeItems
      }, function() {
        setTimeout(setInactive, 400, i)
      });
    }.bind(this);

    var playSound = function(i) {
      if (i < this.soundArray.length) {
        var index = this.soundArray[i];
        setActive(index);
        this.soundBoard[index].play();
        setTimeout(playSound, 700, i+1);
      } else {
        
      }
    }.bind(this);
    playSound(0);
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
    this.soundArray = [];
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
          onMouseDown={this.handleMouseDown}
          activeItems={this.state.activeItems}/>

      </div>
    )
  }
});

module.exports = GameContainer;
