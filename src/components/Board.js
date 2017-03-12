var React = require('react');
var PropTypes = React.PropTypes;

function BoardItem(props) {
  return (
    <div
      className="board-item"
      id={props.itemId}
      onMouseDown={props.onMouseDown}/>
  )
}

function Board(props) {
  var items = [0,1,2,3].map(function(item) {
    var itemId = "board-item-" + item;
    return (
      <BoardItem
        key={item}
        itemId={itemId}
        onMouseDown={props.onMouseDown.bind(null, item)} />
    )
  });
  return (
    <div className="flex-container">
      <div className="flex-item board text-center">
        {items}
      </div>
    </div>
  )
}

Board.propTypes = {
  onMouseDown: PropTypes.func.isRequired
}

module.exports = Board;
