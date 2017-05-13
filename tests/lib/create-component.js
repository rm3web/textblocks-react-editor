// hat tip to:
// http://simonsmith.io/unit-testing-react-components-without-a-dom/
var React = require('react');
var ReactShallowRenderer = require('react-test-renderer/shallow');

function createComponent(component, props) {
  var shallowRenderer = new ReactShallowRenderer();
  shallowRenderer.render(React.createElement(component, props));
  return shallowRenderer.getRenderOutput();
}

module.exports = exports = createComponent;
