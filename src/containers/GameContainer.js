var React = require('react');
var ButtonPanel = require('../components/ButtonPanel');
var Board = require('../components/Board');

var GameContainer = React.createClass({
  getInitialState: function() {
    return {
      btnText: 'Start',
      isStrict: false
    }
  },
  render: function() {
    return (
      <div>
        < ButtonPanel
            btnText={this.state.btnText}
            isStrict={this.state.isStrict}
            level={0}/>
          < Board />
      </div>
    )
  }
});

module.exports = GameContainer;
