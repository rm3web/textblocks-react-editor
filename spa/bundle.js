var React = require('react');
var ReactDOM = require('react-dom');
var TextblockForms = require('../lib/index.jsx');

var intl = {
  locales: 'en-US',
  messages: {
    CHILD_PATH: 'Child path',
    FACETED_BY_TAG: 'Faceted by tag',
    FACETED_BY_MONTH: 'Faceted by month',
    NAVBAR: 'Navbar',
    SELECT_PROTO: 'Select Proto',
    PAGINATED: 'Paginated'
  }
};

var block = {"blocks":
      [{source:"# humans make good pets",
        format:"markdown"},
        {source:"<strong>html section</strong>",
        format:"html"}],
      format:"section"}

ReactDOM.render(
  <div>
    <h2>Textblock Control</h2>
    <form id="draft" id="userform-form" method="post" className="pure-form pure-form-stacked">
    <TextblockForms.TextBlockComponent locales={intl.locales} messages={intl.messages}
       prefix="posting" proto="index" block={block} />
    </form>
  </div>
  ,
  document.getElementById('textblock')
);