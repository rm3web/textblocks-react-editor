if (!global.Intl) {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}

var React = require('react');
var ReactIntl = require('react-intl');
var IntlProvider = ReactIntl.IntlProvider;
var FormattedMessage  = ReactIntl.FormattedMessage;
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

class IndexBlockEditor extends React.Component {
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
    if (this.props.block.format === 'indexfeed') {
      return (<fieldset>
        <input type="hidden" value="indexfeed" name={this.props.prefix + '[format]'} />
        <select name={this.props.prefix + '[query]'} size="1" value={this.props.block.query}
          onChange={this.handleChange}>
         <option value="child">Query Children (Including this page and all descendents)</option>
         <option value="parents">Query Parent Pages</option>
         <option value="dir">Directory (Only first level children)</option>
        </select>
        <select name={this.props.prefix + '[sort]'} size="1"
          value={this.props.block.sort} onChange={this.handleChange}>
         <option value="path">In path order</option>
         <option value="changed">By most recently changed</option>
         <option value="created">By most recently created</option>
        </select>
        <div className="pure-g">
          <div className="pure-u-1-2">
            <label htmlFor={this.props.prefix + '[navbar]'} className="pure-checkbox">
              <input type="checkbox" name={this.props.prefix + '[navbar]'}
                checked={this.props.block.navbar} onChange={this.handleChange} />
                <FormattedMessage id="NAVBAR" defaultMessage="Navbar" />
            </label>
            <label htmlFor={this.props.prefix + '[pagination]'} className="pure-checkbox">
              <input type="checkbox" name={this.props.prefix + '[pagination]'}
                checked={this.props.block.pagination} onChange={this.handleChange} />
              <FormattedMessage id="PAGINATED" defaultMessage="Paginated" />
            </label>
              <input type="text" value={this.props.block.child} onChange={this.handleChange}
                name={this.props.prefix + '[perPage]'} disabled={!this.props.block.pagination} />
          </div>
          <div className="pure-u-1-2">
            <label htmlFor={this.props.prefix + '[monthFacet]'} className="pure-checkbox">
              <input type="checkbox" name={this.props.prefix + '[monthFacet]'}
                checked={this.props.block.monthFacet} onChange={this.handleChange}  />
              <FormattedMessage id="FACETED_BY_MONTH" defaultMessage="Faceted By Month" />
            </label>
            <label htmlFor={this.props.prefix + '[tagFacet]'} className="pure-checkbox">
              <input type="checkbox" name={this.props.prefix + '[tagFacet]'}
              checked={this.props.block.tagFacet} onChange={this.handleChange}  />
              <FormattedMessage id="FACETED_BY_TAG" defaultMessage="Faceted By Tag" />
            </label>
          </div>
        </div>
        <select name={this.props.prefix + '[partial]'} size="1"
          value={this.props.block.partial} onChange={this.handleChange}>
         <option value="card">Card</option>
         <option value="list">List</option>
         <option value="grid">Grid</option>
         <option value="masonry">Masonry</option>
         <option value="justified">Justified</option>
        </select>
        <div className="pure-g">
          <div className="pure-u-1-2">
            <label htmlFor={this.props.prefix + '[child]'}>
            <FormattedMessage id="CHILD_PATH" defaultMessage="Child path" />
            </label>
            <input type="text" value={this.props.block.child} onChange={this.handleChange}
              name={this.props.prefix + '[child]'} />
          </div>
          <div className="pure-u-1-2">
          <label htmlFor={this.props.prefix + '[proto]'}>
            <FormattedMessage id="SELECT_PROTO" defaultMessage="Select proto" />
            </label>
            <input type="text" value={this.props.block.proto} onChange={this.handleChange}
              name={this.props.prefix + '[proto]'} />
          </div>
        </div>
      </fieldset>);
    }
  }
};

IndexBlockEditor.displayName = 'IndexBlockEditor';

IndexBlockEditor.propTypes = {
  block: PropTypes.shape({
    query: PropTypes.oneOf(['child', 'parents', 'dir']),
    sort: PropTypes.oneOf(['path', 'changed', 'created']),
    navbar: PropTypes.bool,
    pagination: PropTypes.bool,
    perPage: PropTypes.number,
    monthFacet: PropTypes.bool,
    tagFacet: PropTypes.bool,
    partial: PropTypes.oneOf(['card', 'grid', 'list', 'masonry', 'justified']),
    child: PropTypes.string,
    proto: PropTypes.string,
    format: PropTypes.oneOf(['indexfeed'])
  }).isRequired,
  prefix: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func
};

module.exports = exports = IndexBlockEditor;
