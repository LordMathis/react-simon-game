var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Label = ReactBootstrap.Label;
var PropTypes = React.PropTypes;

function ButtonPanel(props) {
  return (
    <div className="text-center button-panel">
        <Button bsStyle="primary" className="button-panel-item">{props.btnText}</Button>
        <Label className="button-panel-item">Level: {props.level}</Label>
        <Button bsStyle={props.isStrict ? "success" : "danger"} className="button-panel-item">{props.isStrict ? "Strict mode on" : "Strict mode off"}</Button>
    </div>
  )
}

ButtonPanel.propTypes = {
  btnText: PropTypes.string.isRequired,
  isStrict: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired
}

module.exports = ButtonPanel;
