var createComponent = require('./lib/create-component');
var TextBlockComponent = require('../lib/textblocks_forms.jsx').TextBlockComponent;
var should = require('chai').should();

var intl = {
  locales: 'en-US',
  messages: {
    FACETED_BY_MONTH: 'Faceted by month',
    NAVBAR: 'Navbar',
    PAGINATED: 'Paginated'
  }
};

describe('TextBlockComponent', function() {
  it('should render a textblock when blank', function() {
    var form = createComponent(TextBlockComponent, {
      locales: intl.locales,
      messages: intl.messages,
      prefix: 'plastic_makes_perfect'
    }).props.children;

    form.type.should.equal('fieldset');

    form.props.children[0].type.displayName.should.equal('TextBlockEditor');

    form.props.children[0].props.prefix.should.equal('plastic_makes_perfect');
    form.props.children[0].props.child.should.equal('false');

    form.props.children[1].type.should.equal('div');
    form.props.children[1].props.className.should.equal('pure-g-r');

    form.props.children[1].props.children.props.id.should.equal('addText');
  });

  it('should render a list of textblocks', function() {
    var form = createComponent(TextBlockComponent, {
      locales: intl.locales,
      messages: intl.messages,
      prefix: 'plastic_makes_perfect',
      block: {"blocks":
      [{source:"# humans make good pets",
        format:"markdown"},
      {source:"<strong>html section</strong>",
        format:"html"}],
        format:"section"}
    }).props.children;

    form.type.should.equal('fieldset');

    var section = form.props.children[0];
    section.props.type.should.equal('hidden');
    section.props.name.should.equal('plastic_makes_perfect[format]');

    var blocklist = form.props.children[1];
    blocklist[0].type.should.equal('div');
    blocklist[0].props.children.props.prefix.should.equal('plastic_makes_perfect[blocks][0]');
    blocklist[0].props.children.props.block.should.eql({source:"# humans make good pets",
      format:"markdown"});
    blocklist[0].key.should.equal('0');

    blocklist[1].type.should.equal('div');
    blocklist[1].props.children.props.prefix.should.equal('plastic_makes_perfect[blocks][1]');
    blocklist[1].props.children.props.block.should.eql({source:"<strong>html section</strong>",
      format:"html"});
    blocklist[1].key.should.equal('1');
  });
});
