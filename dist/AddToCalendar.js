"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _makeUrls = _interopRequireDefault(require("./makeUrls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useAutoFocus = function useAutoFocus() {
  var ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var _document = document,
        activeElement = _document.activeElement;
    ref.current.focus();
    return function () {
      return activeElement.focus();
    };
  }, []);
  return ref;
};

var useOpenState = function useOpenState(initialOpen) {
  var _useState = (0, _react.useState)(initialOpen),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var onToggle = (0, _react.useCallback)(function () {
    return setOpen(function (current) {
      return !current;
    });
  }, [setOpen]);
  (0, _react.useEffect)(function () {
    if (open) {
      var onClose = function onClose() {
        return setOpen(false);
      };

      document.addEventListener("click", onClose);
      return function () {
        return document.removeEventListener("click", onClose);
      };
    }

    return undefined;
  }, [open, setOpen]);
  return [open, onToggle];
};

var Calendar = _react.default.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      _ref$download = _ref.download,
      download = _ref$download === void 0 ? false : _ref$download,
      href = _ref.href;
  return _react.default.createElement("a", {
    ref: ref,
    download: download,
    href: href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, children);
});

var Dropdown = function Dropdown(_ref2) {
  var onToggle = _ref2.onToggle,
      urls = _ref2.urls;
  var ref = useAutoFocus();
  var onKeyDown = (0, _react.useCallback)(function (_ref3) {
    var key = _ref3.key;

    if (key === "Escape") {
      onToggle();
    }
  }, [onToggle]);
  return _react.default.createElement("div", {
    className: "chq-atc--dropdown",
    onKeyDown: onKeyDown,
    role: "presentation"
  }, _react.default.createElement(Calendar, {
    href: urls.ics,
    download: true,
    ref: ref
  }, "Apple Calendar"), _react.default.createElement(Calendar, {
    href: urls.google
  }, "Google"), _react.default.createElement(Calendar, {
    href: urls.ics,
    download: true
  }, "Outlook"), _react.default.createElement(Calendar, {
    href: urls.outlook
  }, "Outlook Web App"), _react.default.createElement(Calendar, {
    href: urls.yahoo
  }, "Yahoo"));
};

var AddToCalendar = function AddToCalendar(_ref4) {
  var _ref4$children = _ref4.children,
      children = _ref4$children === void 0 ? "Add to My Calendar" : _ref4$children,
      event = _ref4.event,
      initialOpen = _ref4.open;

  var _useOpenState = useOpenState(initialOpen),
      _useOpenState2 = _slicedToArray(_useOpenState, 2),
      open = _useOpenState2[0],
      onToggle = _useOpenState2[1];

  var urls = (0, _react.useMemo)(function () {
    return (0, _makeUrls.default)(event);
  }, [event]);
  return _react.default.createElement("div", {
    className: "chq-atc"
  }, event && _react.default.createElement("button", {
    type: "button",
    className: "chq-atc--button",
    onClick: onToggle
  }, _react.default.createElement("svg", {
    width: "20px",
    height: "20px",
    viewBox: "0 0 1024 1024"
  }, _react.default.createElement("path", {
    d: "M704 192v-64h-32v64h-320v-64h-32v64h-192v704h768v-704h-192z M864 864h-704v-480h704v480z M864 352h-704v-128h160v64h32v-64h320v64h32v-64h160v128z"
  })), " ", children), open && _react.default.createElement(Dropdown, {
    onToggle: onToggle,
    urls: urls
  }));
};

var _default = AddToCalendar;
exports.default = _default;