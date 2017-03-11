var React = require('react');
var Textarea = require('react-textarea-autosize').default; 

/**
 * @class TextBlockComponent
 *
 * This class will recursively interpret a textblock, thus it might hold
 * some instances of itself.
 *
 * @member {String} prefix The prefix for all control names
 * @member {String} proto The proto in use (determines if we should do index or not)
 * @member {Object} block A Textblock.
 */

 var TextBlockEditor = React.createClass({
  displayName: 'TextBlockEditor',

  propTypes: {
    block: React.PropTypes.shape({
      source: React.PropTypes.string,
      format: React.PropTypes.oneOf(['html', 'markdown'])
    }).isRequired,
    prefix: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    if (this.props.block) {
      return this.props.block;
    } else {
      return {};
    }
  },

  handleChange: function (event) {
    var target = event.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    var name = target.name.replace(this.props.prefix, '').substr(1).slice(0, -1);
    var partialState = {};
    partialState[name] = value;
    this.setState(partialState);
  },

  render: function() {
    if (this.state.format !== 'indexfeed') {
      return (<fieldset>
        <Textarea name={this.props.prefix + '[source]'}
          className="pure-input-1" placeholder="Posting" 
          value={this.state.source} onChange={this.handleChange}>
        </Textarea>
        <select size="1" name={this.props.prefix + '[format]'}
          value={this.state.format} onChange={this.handleChange}>
        <option value="html">HTML</option>
        <option value="markdown">Markdown</option>
        </select>
      </fieldset>);
    }
  }
});

module.exports = exports = TextBlockEditor;
