var createComponent = require('./lib/create-component');
var TextBlockComponent = require('../lib/textblocks_forms.jsx').TextBlockComponent;

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
    var form = $(<TextBlockComponent 
      locales = {intl.locales}
      messages = {intl.messages}
      prefix = 'plastic_makes_perfect' />).shallowRender();

    form.children('fieldset').only();

    var blockEditor = form.find('TextBlockEditor').only()[0];

    blockEditor.props.prefix.should.equal('plastic_makes_perfect');
    blockEditor.props.child.should.equal('false');

    var addDiv = form.find('fieldset div').only()[0];
    
    addDiv.props.className.should.equal('pure-g-r');

    form.find('button[id="addText"]').only();
    form.find('button[id="addQuery"]').length.should.equal(0);
  });

  it('should render a textblock with query button', function() {
    var form = $(<TextBlockComponent 
      locales = {intl.locales}
      messages = {intl.messages}
      proto = 'index'
      prefix = 'plastic_makes_perfect' />).shallowRender();

    form.children('fieldset').only();

    var blockEditor = form.find('TextBlockEditor').only()[0];

    blockEditor.props.prefix.should.equal('plastic_makes_perfect');
    blockEditor.props.child.should.equal('false');
    
    var addDiv = form.find('fieldset div').only()[0];
    
    addDiv.props.className.should.equal('pure-g-r');

    form.find('button[id="addText"]').only();
    form.find('button[id="addQuery"]').only();
  });

  it('should render a list of textblocks', function() {
    var block = {"blocks":
      [{source:"# humans make good pets",
        htmltext:"<h1>humans make good pets</h1>",
        format:"markdown"},
        {htmltext:"<strong>html section</strong>",
        format:"html"}],
      format:"section"};
    var form = $(<TextBlockComponent 
      locales = {intl.locales} messages = {intl.messages} proto = 'index'
      block = {block} prefix = 'plastic_makes_perfect' />).shallowRender();

    form.children('fieldset').only();

    var formatField = form.find('fieldset > input');

    formatField.props('type').should.equal('hidden');
    formatField.props('name').should.equal('plastic_makes_perfect[format]');

    var blockList = form.find('fieldset > div');

    blockList.length.should.equal(3);

    blockList[0].props.children.props.prefix.should.equal('plastic_makes_perfect[blocks][0]');
    blockList[0].props.children.props.block.should.eql({source:"# humans make good pets",
        htmltext:"<h1>humans make good pets</h1>",
        format:"markdown"});
    blockList[0].key.should.equal('0');

    blockList[1].props.children.props.prefix.should.equal('plastic_makes_perfect[blocks][1]');
    blockList[1].props.children.props.block.should.eql({htmltext:"<strong>html section</strong>",
        format:"html"});
    blockList[1].key.should.equal('1');

    form.find('button[id="addText"]').only();
    form.find('button[id="addQuery"]').only();

  });

  describe('with a DOM', function() {

    it('should add blocks with the button', function() {
      var form = $(<TextBlockComponent 
        locales = {intl.locales}
        messages = {intl.messages}
        prefix = 'plastic_makes_perfect' />).render(true);

      form.find('button[id="addText"]').trigger('click');

      var blockList = form.dom().querySelectorAll('fieldset > div');

      blockList.length.should.equal(3);

      blockList[0].querySelectorAll('textarea').length.should.equal(1);
      var firstBlock = blockList[0].querySelector('textarea');
      firstBlock.name.should.equal('plastic_makes_perfect[blocks][0][source]')

      blockList[1].querySelectorAll('textarea').length.should.equal(1);
      var secondBlock = blockList[1].querySelector('textarea');
      secondBlock.name.should.equal('plastic_makes_perfect[blocks][1][source]')

      form.dom().querySelectorAll('#addText').length.should.equal(1);
      form.dom().querySelectorAll('#addQuery').length.should.equal(0);
    });
  });
});
