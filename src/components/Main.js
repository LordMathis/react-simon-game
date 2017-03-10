var React = require('react');
require('../index.css');
var GameContainer = require('../containers/GameContainer');

function Main(props) {
  return (
    <div className="container">
      <div className="text-center header">
        <h1 className="font-primary">Simon Game</h1>
      </div>
      <div className="flex-container">
        <div className="flex-item">
          <GameContainer/>
        </div>
      </div>
    </div>
  )
}

module.exports = Main;
