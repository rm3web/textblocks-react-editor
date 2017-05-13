var React = require('react');
var Textarea = require('react-textarea-autosize').default;
var PropTypes = require('prop-types');

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

class TextBlockEditor extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    var target = event.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    var name = target.name.replace(this.props.prefix, '').substr(1).slice(0, -1);
    this.props.handleUpdate(name, value);
  }

  render() {
    if (this.props.block.format !== 'indexfeed') {
      return (<fieldset>
        <Textarea name={this.props.prefix + '[source]'}
          className="pure-input-1" placeholder="Posting"
          value={this.props.block.source} onChange={this.handleChange}>
        </Textarea>
        <select size="1" name={this.props.prefix + '[format]'}
          value={this.props.block.format} onChange={this.handleChange}>
        <option value="html">HTML</option>
        <option value="markdown">Markdown</option>
        </select>
      </fieldset>);
    }
  }
};

TextBlockEditor.displayName = 'TextBlockEditor';

TextBlockEditor.propTypes = {
  block: PropTypes.shape({
    source: PropTypes.string,
    format: PropTypes.oneOf(['html', 'markdown'])
  }).isRequired,
  prefix: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func
};

module.exports = exports = TextBlockEditor;
