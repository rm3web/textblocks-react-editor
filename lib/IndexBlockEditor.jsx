if (!global.Intl) {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}

var React = require('react');
var ReactIntl = require('react-intl');
var IntlProvider = ReactIntl.IntlProvider;
var FormattedMessage  = ReactIntl.FormattedMessage;

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

var IndexBlockEditor = React.createClass({
  displayName: 'IndexBlockEditor',

  propTypes: {
    block: React.PropTypes.shape({
      query: React.PropTypes.oneOf(['child', 'parents', 'dir']),
      sort: React.PropTypes.oneOf(['path', 'changed', 'created']),
      navbar: React.PropTypes.bool,
      pagination: React.PropTypes.bool,
      perPage: React.PropTypes.number,
      monthFacet: React.PropTypes.bool,
      tagFacet: React.PropTypes.bool,
      partial: React.PropTypes.oneOf(['card', 'grid', 'list', 'masonry', 'justified']),
      child: React.PropTypes.string,
      proto: React.PropTypes.string,
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

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name.replace(this.props.prefix, '').substr(1).slice(0, -1);
    this.setState({
      [name]: value
    });
  },

  render: function() {
    if (this.state.format === 'indexfeed') {
      return (<fieldset>
        <input type="hidden" value="indexfeed" name={this.props.prefix + '[format]'} />
        <select name={this.props.prefix + '[query]'} size="1" value={this.state.query}
          onChange={this.handleChange}>
         <option value="child">Query Children (Including this page and all descendents)</option>
         <option value="parents">Query Parent Pages</option>
         <option value="dir">Directory (Only first level children)</option>
        </select>
        <select name={this.props.prefix + '[sort]'} size="1" 
          value={this.state.sort} onChange={this.handleChange}>
         <option value="path">In path order</option>
         <option value="changed">By most recently changed</option>
         <option value="created">By most recently created</option>
        </select>
        <div className="pure-g">
          <div className="pure-u-1-2">
            <label htmlFor={this.props.prefix + '[navbar]'} className="pure-checkbox">
              <input type="checkbox" name={this.props.prefix + '[navbar]'}
                checked={this.state.navbar} onChange={this.handleChange} />
                <FormattedMessage id="NAVBAR" defaultMessage="Navbar" />
            </label>
            <label htmlFor={this.props.prefix + '[pagination]'} className="pure-checkbox">
              <input type="checkbox" name={this.props.prefix + '[pagination]'}
                checked={this.state.pagination} onChange={this.handleChange} />
              <FormattedMessage id="PAGINATED" defaultMessage="Paginated" />
            </label>
              <input type="text" value={this.state.child} onChange={this.handleChange} 
                name={this.props.prefix + '[perPage]'} disabled={!this.state.pagination} />
          </div>
          <div className="pure-u-1-2">
            <label htmlFor={this.props.prefix + '[monthFacet]'} className="pure-checkbox">
              <input type="checkbox" name={this.props.prefix + '[monthFacet]'}
                checked={this.state.monthFacet} onChange={this.handleChange}  />
              <FormattedMessage id="FACETED_BY_MONTH" defaultMessage="Faceted By Month" />
            </label>
            <label htmlFor={this.props.prefix + '[tagFacet]'} className="pure-checkbox">
              <input type="checkbox" name={this.props.prefix + '[tagFacet]'}
              checked={this.state.tagFacet} onChange={this.handleChange}  />
              <FormattedMessage id="FACETED_BY_TAG" defaultMessage="Faceted By Tag" />
            </label>
          </div>
        </div>
        <select name={this.props.prefix + '[partial]'} size="1" 
          value={this.state.partial} onChange={this.handleChange}>
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
            <input type="text" value={this.state.child} onChange={this.handleChange}
              name={this.props.prefix + '[child]'} />
          </div>
          <div className="pure-u-1-2">
          <label htmlFor={this.props.prefix + '[proto]'}>
            <FormattedMessage id="SELECT_PROTO" defaultMessage="Select proto" />
            </label>
            <input type="text" value={this.state.proto} onChange={this.handleChange}
              name={this.props.prefix + '[proto]'} />
          </div>
        </div>
      </fieldset>);
    }
  }
});

module.exports = exports = IndexBlockEditor;