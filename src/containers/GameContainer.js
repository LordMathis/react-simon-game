var React = require('react');
var ButtonPanel = require('../components/ButtonPanel');
var Board = require('../components/Board');

var GameContainer = React.createClass({
  getInitialState: function() {
    return {
      isStarted: false,
      isStrict: false,
      count: 0,
      activeItems: [false, false, false, false],
      isEnabled: false,
      isBlinking: false
    }
  },
  handleStrictToggle: function(event) {
    this.setState({
      isStrict: !this.state.isStrict
    })
  },
  handleStart: function() {
    if (this.state.isStarted) {
      this.stop();
    } else {
      this.setState({
        isStarted: true
      }, this.countUp);
    }
  },
  countUp: function() {
    if (this.state.isStarted) {
      this.setState({
        count: this.state.count+1
      }, this.start)
    }
  },
  stop: function() {
    this.currentIndex = 0;
    this.soundArray = [];
    this.setState({
      isStarted: false,
      isStrict: this.state.isStrict,
      count: 0,
      activeItems: [false, false, false, false],
      isEnabled: false,
      isBlinking: false
    })
  },
  start: function() {
    if (!this.state.isStarted) {
      return
    }

    if (this.soundArray.length < this.state.count) {
      this.soundArray.push(Math.floor(Math.random() * 4));
    }

    this.playSounds();
  },
  playSounds: function() {

    this.setState({
      isBlinking: false
    })

    if (!this.state.isStarted) {
      return;
    }

    this.currentIndex = 0;

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
        this.setState({
          isEnabled: true
        });
      }
    }.bind(this);
    playSound(0);
  },
  handleMouseDown: function(i, event) {
    this.soundBoard[i].play();

    if (i === this.soundArray[this.currentIndex]) {
      this.currentIndex++;
      if (this.currentIndex >= this.soundArray.length) {
        setTimeout(this.countUp, 1000);
      }
    } else {
      this.setState({
        isBlinking: true
      }, () => setTimeout(this.handleError, 500));
    }
  },
  handleError: function() {
    if (this.state.isStrict) {
      this.stop();
      setTimeout(this.handleStart, 1000);
    } else {
      setTimeout(this.playSounds, 1000);
    }
  },
  componentDidMount: function() {
    this.soundBoard = {
      0: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
      1: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
      2: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
      3: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    }
    this.soundArray = [];
    this.currentIndex = 0;
  },
  render: function() {
    return (
      <div>

        <ButtonPanel
          isStarted={this.state.isStarted}
          isStrict={this.state.isStrict}
          count={this.state.count}
          onStrictToggle={this.handleStrictToggle}
          onStart={this.handleStart}/>

        <Board
          onMouseDown={this.handleMouseDown}
          activeItems={this.state.activeItems}
          isEnabled={this.state.isEnabled}
          isBlinking={this.state.isBlinking}/>

      </div>
    )
  }
});

module.exports = GameContainer;
