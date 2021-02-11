"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var makeUrls_1 = __importDefault(require("./makeUrls"));
var useAutoFocus = function () {
    var elementRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var previous = document.activeElement;
        var element = elementRef.current;
        if (element) {
            element.focus();
        }
        if (previous instanceof HTMLElement) {
            return function () { return previous.focus(); };
        }
        return undefined;
    }, []);
    return elementRef;
};
var useOpenState = function (initialOpen) {
    var _a = react_1.useState(initialOpen), open = _a[0], setOpen = _a[1];
    var onToggle = function () { return setOpen(function (current) { return !current; }); };
    react_1.useEffect(function () {
        if (open) {
            var onClose_1 = function () {
                setTimeout(function () {
                    setOpen(false);
                }, 50);
            };
            // use "mousedown" otherwise "click" is the same as "mouseup" and gets called immediately and closes the dialog
            // but click is better semantically : https://stackoverflow.com/questions/14805225/whats-the-difference-between-mouseup-and-click-events/14805233
            document.addEventListener("mouseup", onClose_1);
            return function () { return document.removeEventListener("mouseup", onClose_1); };
        }
        return undefined;
    }, [open, setOpen]);
    return [open, onToggle];
};
var Calendar = react_1.default.forwardRef(function (_a, ref) {
    var children = _a.children, _b = _a.filename, filename = _b === void 0 ? false : _b, href = _a.href;
    return (react_1.default.createElement("a", { ref: ref, download: filename, href: "#", rel: "noopener noreferrer", onClick: function () { return window.open(href, "_blank"); } }, children));
});
var Dropdown = function (_a) {
    var filename = _a.filename, onToggle = _a.onToggle, urls = _a.urls;
    var ref = useAutoFocus();
    var onKeyDown = function (event) {
        if (event.key === "Escape") {
            onToggle();
        }
    };
    return (react_1.default.createElement("div", { className: "chq-atc--dropdown", onKeyDown: onKeyDown, role: "presentation" },
        react_1.default.createElement(Calendar, { href: urls.google }, "Google"),
        react_1.default.createElement(Calendar, { href: urls.outlook }, "Outlook Web App"),
        react_1.default.createElement(Calendar, { href: urls.ics, filename: filename }, "Outlook"),
        react_1.default.createElement(Calendar, { href: urls.ics, filename: filename, ref: ref }, "Apple"),
        react_1.default.createElement(Calendar, { href: urls.yahoo }, "Yahoo")));
};
var AddToCalendar = function (_a) {
    var _b = _a.children, children = _b === void 0 ? "Add to My Calendar" : _b, event = _a.event, _c = _a.filename, filename = _c === void 0 ? "download" : _c, _d = _a.open, initialOpen = _d === void 0 ? false : _d;
    var _e = useOpenState(initialOpen), open = _e[0], onToggle = _e[1];
    var urls = react_1.useMemo(function () { return makeUrls_1.default(event); }, [event]);
    return (react_1.default.createElement("div", { className: "chq-atc" },
        event && (react_1.default.createElement("button", { type: "button", className: "chq-atc--button", onClick: onToggle },
            react_1.default.createElement("svg", { width: "20px", height: "20px", viewBox: "0 0 1024 1024" },
                react_1.default.createElement("path", { d: "M704 192v-64h-32v64h-320v-64h-32v64h-192v704h768v-704h-192z M864 864h-704v-480h704v480z M864 352h-704v-128h160v64h32v-64h320v64h32v-64h160v128z" })),
            " ",
            children)),
        open && react_1.default.createElement(Dropdown, { filename: filename, onToggle: onToggle, urls: urls })));
};
exports.default = AddToCalendar;
