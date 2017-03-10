var React = require('react');

function BoardItem(props) {
  return (
    <div className="board-item" id={props.itemId}/>
  )
}

function Board(props) {
  var items = [0,1,2,3].map(function(item) {
    var itemId = "board-item-" + item;
    return (
      <BoardItem key={item} itemId={itemId} />
    )
  });
  return (
    <div className="board text-center">
      {items}
    </div>
  )
}

module.exports = Board;
