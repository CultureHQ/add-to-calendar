import React, { Component } from "react";

const makeTime = time => new Date(time).toISOString().replace(/[-:]|\.\d{3}/g, '');

const makeUrl = (base, query) => Object.keys(query).reduce((accum, key, index) => (
  `${accum}${index === 0 ? "?" : "&"}${key}=${encodeURIComponent(query[key])}`
), base);

const makeGoogleCalendarUrl = event => makeUrl("https://calendar.google.com/calendar/render", {
  action: "TEMPLATE",
  dates: `${makeTime(event.startTime)}/${makeTime(event.endTime)}`,
  location: event.location,
  text: event.title,
  details: event.description
});

const makeOutlookCalendarUrl = event => makeUrl("https://outlook.live.com/owa", {
  rru: "addevent",
  startdt: makeTime(event.startTime),
  enddt: makeTime(event.endTime),
  subject: event.title,
  location: event.location,
  body: event.description,
  allday: false,
  uid: new Date().getTime().toString(),
  path: "/calendar/view/Month"
});

const makeYahooCalendarUrl = event => {
  const minutes = Math.floor((+event.endTime - +event.startTime) / 60 / 1000);
  const duration = `${Math.floor(minutes / 60)}:${`0${minutes % 60}`.slice(-2)}`;

  return makeUrl("https://calendar.yahoo.com", {
    v: 60,
    view: "d",
    type: 20,
    title: event.title,
    st: makeTime(event.startTime),
    dur: duration,
    desc: event.description,
    in_loc: event.location
  });
};

const Calendar = ({ children, download = false, href, onClick }) => (
  <a download={download} href={href} onClick={onClick} target="_blank">
    {children}
  </a>
);

const ICSCalendar = ({ children, event, onClick }) => {
  const components = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `URL:${document.URL}`,
    `DTSTART:${makeTime(event.startTime)}`,
    `DTEND:${makeTime(event.endTime)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  const href = encodeURI(`data:text/calendar;charset=utf8,${components.join("\n")}`);
  return <Calendar href={href} onClick={onClick} download>{children}</Calendar>;
};

class AddToCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = { open: props.open || false };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    let showOptions = !this.state.open;

    if (showOptions) {
      document.addEventListener("click", this.handleToggle);
    } else {
      document.removeEventListener("click", this.handleToggle);
    }

    this.setState({ open: showOptions });
  }

  render() {
    const { buttonLabel, event, listItems } = this.props;
    const { open } = this.state;

    return (
      <div className="chq-atc">
        {event && (
          <button type="button" className="chq-atc--button" onClick={this.handleToggle}>
            <svg width="20px" height="20px" viewBox="0 0 1024 1024">
              <path d="M704 192v-64h-32v64h-320v-64h-32v64h-192v704h768v-704h-192z M864 864h-704v-480h704v480z M864 352h-704v-128h160v64h32v-64h320v64h32v-64h160v128z" />
            </svg>
            {" "}
            {buttonLabel}
          </button>
        )}
        {open && (
          <div className="chq-atc--dropdown">
            <ICSCalendar event={event} onClick={this.handleToggle}>
              Apple Calendar
            </ICSCalendar>
            <Calendar href={makeGoogleCalendarUrl(event)} onClick={this.handleToggle}>
              Google
            </Calendar>
            <ICSCalendar event={event} onClick={this.handleToggle}>
              Outlook
            </ICSCalendar>
            <Calendar href={makeOutlookCalendarUrl(event)} onClick={this.handleToggle}>
              Outlook Web App
            </Calendar>
            <Calendar href={makeYahooCalendarUrl(event)} onClick={this.handleToggle}>
              Yahoo
            </Calendar>
          </div>
        )}
      </div>
    );
  }
}

AddToCalendar.defaultProps = {
  buttonLabel: "Add to My Calendar",
  open: false,
  event: {
    title: "Sample Event",
    description: "This is the sample event provided as an example only",
    location: "Portland, OR",
    startTime: "2016-09-16T20:15:00-04:00",
    endTime: "2016-09-16T21:45:00-04:00"
  }
};

export default AddToCalendar;
