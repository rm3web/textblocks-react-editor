if (!global.Intl) {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}

var React = require('react');
var ReactIntl = require('react-intl');
var IntlMixin  = ReactIntl.IntlMixin;
var FormattedMessage  = ReactIntl.FormattedMessage;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

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
  mixins: [IntlMixin, LinkedStateMixin],

  getInitialState: function() {
    if (this.props.block) {
      return this.props.block;
    } else {
      return {};
    }
  },

  render: function() {
    if (this.state.format !== 'pragma') {
      var vlink = 'source';
      return (<fieldset>
        <textarea rows="30" name={this.props.prefix + '[source]'}
          className="pure-input-1" placeholder="Posting" 
          valueLink={this.linkState(vlink)}>
        </textarea>
        <select size="1" name={this.props.prefix + '[format]'}
          valueLink={this.linkState('format')}>
        <option value="html">HTML</option>
        <option value="markdown">Markdown</option>
        </select>
      </fieldset>);
    }
  }
});

var IndexBlockEditor = React.createClass({
  mixins: [IntlMixin, LinkedStateMixin],

  getInitialState: function() {
    if (this.props.block) {
      return this.props.block;
    } else {
      return {};
    }
  },

  render: function() {
    if (this.state.format === 'pragma') {
      return (<fieldset>
        <input type="hidden" value="pragma" name={this.props.prefix + '[format]'} />
        <select name={this.props.prefix + '[query]'} size="1" 
          valueLink={this.linkState('query')}>
         <option value="child">Query Children (Including this page and all descendents)</option>
         <option value="parents">Query Parent Pages</option>
         <option value="dir">Directory (Only first level children)</option>
        </select>
        <select name={this.props.prefix + '[sort]'} size="1" 
          valueLink={this.linkState('sort')}>
         <option value="path">In path order</option>
         <option value="changed">By most recently changed</option>
         <option value="created">By most recently created</option>
        </select>
        <div className="pure-g">
          <div className="pure-u-1-2">
            <label htmlFor={this.props.prefix + '[navbar]'} className="pure-checkbox">
              <input type="checkbox" value="true" name={this.props.prefix + '[navbar]'}
                checkedLink={this.linkState('navbar')} />
                <FormattedMessage message={this.getIntlMessage('NAVBAR')} />
            </label>
            <label htmlFor={this.props.prefix + '[pagination]'} className="pure-checkbox">
              <input type="checkbox" value="true" name={this.props.prefix + '[pagination]'}
                checkedLink={this.linkState('pagination')} />
              <FormattedMessage message={this.getIntlMessage('PAGINATED')} />
            </label>
          </div>
          <div className="pure-u-1-2">
            <label htmlFor={this.props.prefix + '[navbar]'} className="pure-checkbox">
              <input type="checkbox" value="true" name={this.props.prefix + '[monthFacet]'}
                checkedLink={this.linkState('monthFacet')} />
              <FormattedMessage message={this.getIntlMessage('FACETED_BY_MONTH')} />
            </label>
            <label htmlFor={this.props.prefix + '[navbar]'} className="pure-checkbox">
              <input type="checkbox" value="true" name={this.props.prefix + '[tagFacet]'}
              checkedLink={this.linkState('tagFacet')} />
              <FormattedMessage message={this.getIntlMessage('FACETED_BY_TAG')} />
            </label>
          </div>
        </div>
        <select name={this.props.prefix + '[partial]'} size="1" valueLink={this.linkState('partial')}>
         <option value="card">Card</option>
         <option value="list">List</option>
         <option value="grid">Grid</option>
        </select>
      </fieldset>);
    }
  }
});

function mapBlock(block, i, prefix) {
  if (block.format === 'pragma') {
    return (<IndexBlockEditor key={'b_' + i}
    prefix={prefix + '[blocks][' + i + ']'}
    block={block} child="true" />);
  } else {
    return (<TextBlockEditor key={'b_' + i}
    prefix={prefix + '[blocks][' + i + ']'}
    block={block} child="true" />);
  }
}

var TextBlockComponent = React.createClass({
  mixins: [IntlMixin, LinkedStateMixin],

  getInitialState: function() {
    if (this.props.block) {
      return this.props.block;
    } else {
      return {};
    }
  },

  addText: function(e) {
    e.preventDefault();
    var blocks;
    if (this.state.format === 'section') {
      blocks = this.state.blocks;
    } else {
      blocks = [this.state];
    }
    blocks.push({format: 'html', source: ''});
    this.setState({blocks: blocks,
        format: 'section'});
  },

  addQuery: function(e) {
    e.preventDefault();
    var blocks;
    if (this.state.format === 'section') {
      blocks = this.state.blocks;
    } else {
      blocks = [this.state];
    }
    blocks.push({query:"parents",
      format:"pragma"});
    this.setState({blocks: blocks,
      format: 'section'});
  },

  render: function() {
    var buttons;
    if (this.props.proto === 'index') {
      buttons = (<div className="pure-g-r">
        <button onClick={this.addText} className="pure-button" id="addText">Add Text Section</button>
        <button onClick={this.addQuery} className="pure-button" id="addQuery">Add Query Section</button>
        </div>);
    } else {
      buttons = (<div className="pure-g-r">
        <button onClick={this.addText} className="pure-button" id="addText">Add Text Section</button>
        </div>);
    }

    if (this.state.format === 'section') {
      var self = this;
      var blocks = this.state.blocks.map(function(block, i) {
          var outBlock;
          outBlock = mapBlock(block, i, self.props.prefix);
          return (<div key={i} className="textblockbox">
            {outBlock}
            </div>);
        });
      return (<fieldset>
        <input type="hidden" value="section" name={this.props.prefix + '[format]'}
          id={this.props.prefix + '[format]'} />
        {blocks}
        {buttons}
      </fieldset>);
    } else {
      var block;
      if (this.state.format === 'pragma') {
        block = (<IndexBlockEditor
        prefix={this.props.prefix}
        block={this.state} child="false" />);
      } else {
        block = (<TextBlockEditor
        prefix={this.props.prefix}
        block={this.state} child="false" />);
      }
      return (<fieldset>
        {block}
        {buttons}
      </fieldset>);
    }
  }
});

exports.TextBlockComponent = TextBlockComponent;
