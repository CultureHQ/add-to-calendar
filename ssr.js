// This file is here to verify that the component can be rendered on a server
// without breaking.

const React = require("react");
const ReactDOM = require("react-dom/server");

// eslint-disable-next-line import/no-unresolved
const { default: AddToCalendar } = require("./dist/AddToCalendar");

ReactDOM.renderToString(React.createElement(AddToCalendar, {
  event: {
    name: "Happy Hour",
    details: "Let's go after work",
    location: "Boston, MA",
    startsAt: "2018-12-06T17:00:00-05:00",
    endsAt: "2018-12-06T18:00:00-05:00"
  }
}));
