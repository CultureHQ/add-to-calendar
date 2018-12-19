"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var makeTime = function makeTime(time) {
  return new Date(time).toISOString().replace(/[-:]|\.\d{3}/g, "");
};

var makeUrl = function makeUrl(base, query) {
  return Object.keys(query).reduce(function (accum, key, index) {
    return "".concat(accum).concat(index === 0 ? "?" : "&").concat(key, "=").concat(encodeURIComponent(query[key]));
  }, base);
};

var makeGoogleCalendarUrl = function makeGoogleCalendarUrl(event) {
  return makeUrl("https://calendar.google.com/calendar/render", {
    action: "TEMPLATE",
    dates: "".concat(makeTime(event.startsAt), "/").concat(makeTime(event.endsAt)),
    location: event.location,
    text: event.name,
    details: event.details
  });
};

var makeOutlookCalendarUrl = function makeOutlookCalendarUrl(event) {
  return makeUrl("https://outlook.live.com/owa", {
    rru: "addevent",
    startdt: makeTime(event.startsAt),
    enddt: makeTime(event.endsAt),
    subject: event.name,
    location: event.location,
    body: event.details,
    allday: false,
    uid: new Date().getTime().toString(),
    path: "/calendar/view/Month"
  });
};

var makeYahooCalendarUrl = function makeYahooCalendarUrl(event) {
  var minutes = Math.floor((+new Date(event.endsAt) - +new Date(event.startsAt)) / 60 / 1000);
  var duration = "".concat(Math.floor(minutes / 60), ":").concat("0".concat(minutes % 60).slice(-2));
  return makeUrl("https://calendar.yahoo.com", {
    v: 60,
    view: "d",
    type: 20,
    title: event.name,
    st: makeTime(event.startsAt),
    dur: duration,
    desc: event.details,
    in_loc: event.location
  });
};

var Calendar = function Calendar(_ref) {
  var children = _ref.children,
      _ref$download = _ref.download,
      download = _ref$download === void 0 ? false : _ref$download,
      href = _ref.href;
  return _react.default.createElement("a", {
    download: download,
    href: href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, children);
};

var ICSCalendar = function ICSCalendar(_ref2) {
  var children = _ref2.children,
      event = _ref2.event;
  var components = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "URL:".concat(document.URL), "DTSTART:".concat(makeTime(event.startsAt)), "DTEND:".concat(makeTime(event.endsAt)), "SUMMARY:".concat(event.name), "DESCRIPTION:".concat(event.details), "LOCATION:".concat(event.location), "END:VEVENT", "END:VCALENDAR"];
  var href = encodeURI("data:text/calendar;charset=utf8,".concat(components.join("\n")));
  return _react.default.createElement(Calendar, {
    href: href,
    download: true
  }, children);
};

var AddToCalendar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AddToCalendar, _PureComponent);

  function AddToCalendar(props) {
    var _this;

    _classCallCheck(this, AddToCalendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddToCalendar).call(this, props));
    _this.state = {
      open: props.open || false
    };
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(AddToCalendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentIsMounted = true;
      this.configureListener();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var open = this.state.open;

      if (open !== prevState.open) {
        this.configureListener();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.componentIsMounted = false;
    }
  }, {
    key: "configureListener",
    value: function configureListener() {
      var open = this.state.open;

      if (open) {
        document.addEventListener("click", this.handleToggle);
      } else {
        document.removeEventListener("click", this.handleToggle);
      }
    }
  }, {
    key: "handleToggle",
    value: function handleToggle() {
      if (this.componentIsMounted) {
        this.setState(function (_ref3) {
          var open = _ref3.open;
          return {
            open: !open
          };
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          event = _this$props.event;
      var open = this.state.open;
      return _react.default.createElement("div", {
        className: "chq-atc"
      }, event && _react.default.createElement("button", {
        type: "button",
        className: "chq-atc--button",
        onClick: this.handleToggle
      }, _react.default.createElement("svg", {
        width: "20px",
        height: "20px",
        viewBox: "0 0 1024 1024"
      }, _react.default.createElement("path", {
        d: "M704 192v-64h-32v64h-320v-64h-32v64h-192v704h768v-704h-192z M864 864h-704v-480h704v480z M864 352h-704v-128h160v64h32v-64h320v64h32v-64h160v128z"
      })), " ", children), open && _react.default.createElement("div", {
        className: "chq-atc--dropdown"
      }, _react.default.createElement(ICSCalendar, {
        event: event
      }, "Apple Calendar"), _react.default.createElement(Calendar, {
        href: makeGoogleCalendarUrl(event)
      }, "Google"), _react.default.createElement(ICSCalendar, {
        event: event
      }, "Outlook"), _react.default.createElement(Calendar, {
        href: makeOutlookCalendarUrl(event)
      }, "Outlook Web App"), _react.default.createElement(Calendar, {
        href: makeYahooCalendarUrl(event)
      }, "Yahoo")));
    }
  }]);

  return AddToCalendar;
}(_react.PureComponent);

AddToCalendar.defaultProps = {
  children: "Add to My Calendar"
};
var _default = AddToCalendar;
exports.default = _default;