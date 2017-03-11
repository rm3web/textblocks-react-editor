if (!global.Intl) {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}

var React = require('react');
var ReactIntl = require('react-intl');
var IntlProvider = ReactIntl.IntlProvider;
var FormattedMessage  = ReactIntl.FormattedMessage;
var TextBlockEditor = require('./TextBlockEditor');
var IndexBlockEditor = require('./IndexBlockEditor');

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

var TextBlockComponent = React.createClass({
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
      format:"indexfeed"});
    this.setState({blocks: blocks,
      format: 'section'});
  },

  handleUpdateBase: function (key, val) {
    this.setState({[key]: val});
  },

  handleUpdate: function (block, key, val) {
    var blocks;
    if (this.state.format === 'section') {
      blocks = this.state.blocks;
    } else {
      blocks = [this.state];
    }
    blocks[block][key] = val;
    this.setState({blocks:blocks});
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
          if (block.format === 'indexfeed') {
            outBlock = (<IndexBlockEditor key={'b_' + i}
            prefix={self.props.prefix + '[blocks][' + i + ']'}
            block={block} handleUpdate={self.handleUpdate.bind(self, i)}/>);
          } else {
            outBlock = (<TextBlockEditor key={'b_' + i}
            prefix={self.props.prefix + '[blocks][' + i + ']'}
            block={block} handleUpdate={self.handleUpdate.bind(self, i)} />);
          }
          return (<div key={i} className="textblockbox">
            {outBlock}
            </div>);
        });
      return (<IntlProvider messages={this.props.messages} locale='en'><fieldset>
        <input type="hidden" value="section" name={this.props.prefix + '[format]'}
          id={this.props.prefix + '[format]'} />
        {blocks}
        {buttons}
      </fieldset></IntlProvider>);
    } else {
      var block;
      if (this.state.format === 'indexfeed') {
        block = (<IndexBlockEditor
        prefix={this.props.prefix}
        block={this.state} handleUpdate={this.handleUpdateBase} child="false" />);
      } else {
        block = (<TextBlockEditor
        prefix={this.props.prefix}
        block={this.state} handleUpdate={this.handleUpdateBase} child="false" />);
      }
      return ( <IntlProvider messages={this.props.messages} locale='en'><fieldset>
        {block}
        {buttons}
      </fieldset></IntlProvider>);
    }
  }
});

exports.TextBlockComponent = TextBlockComponent;
