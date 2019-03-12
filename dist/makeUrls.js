"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var makeDuration = function makeDuration(event) {
  var minutes = Math.floor((+new Date(event.endsAt) - +new Date(event.startsAt)) / 60 / 1000);
  return "".concat(Math.floor(minutes / 60), ":").concat("0".concat(minutes % 60).slice(-2));
};

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
  return makeUrl("https://calendar.yahoo.com", {
    v: 60,
    view: "d",
    type: 20,
    title: event.name,
    st: makeTime(event.startsAt),
    dur: makeDuration(event),
    desc: event.details,
    in_loc: event.location
  });
};

var makeICSCalendarUrl = function makeICSCalendarUrl(event) {
  var components = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "URL:".concat(document.URL), "DTSTART:".concat(makeTime(event.startsAt)), "DTEND:".concat(makeTime(event.endsAt)), "SUMMARY:".concat(event.name), "DESCRIPTION:".concat(event.details), "LOCATION:".concat(event.location), "END:VEVENT", "END:VCALENDAR"];
  return encodeURI("data:text/calendar;charset=utf8,".concat(components.join("\n")));
};

var makeUrls = function makeUrls(event) {
  return {
    google: makeGoogleCalendarUrl(event),
    outlook: makeOutlookCalendarUrl(event),
    yahoo: makeYahooCalendarUrl(event),
    ics: makeICSCalendarUrl(event)
  };
};

var _default = makeUrls;
exports.default = _default;