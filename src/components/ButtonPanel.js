var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var Label = ReactBootstrap.Label;
var PropTypes = React.PropTypes;
var Tooltip = ReactBootstrap.Tooltip;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;

function ButtonPanel(props) {

  const tooltip = (
    <Tooltip id="tooltip">{props.isStrict ? "Strict mode is turned on" : "Strict mode is turned off"}</Tooltip>
  );

  return (
    <div className="text-center button-panel">
        <Button
          bsStyle="primary"
          className="button-panel-item"
          onClick={props.onStart}>
          {props.isStarted ? 'STOP' : 'START'}
        </Button>
        <Label className="button-panel-item">Count: {props.count}</Label>
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <Button
            bsStyle={props.isStrict ? "success" : "danger"}
            className="button-panel-item"
            onClick={props.onStrictToggle}
            disabled={false}>
            STRICT
          </Button>
        </OverlayTrigger>
    </div>
  )
}

ButtonPanel.propTypes = {
  isStarted: PropTypes.bool.isRequired,
  isStrict: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  onStrictToggle: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired
}

module.exports = ButtonPanel;
