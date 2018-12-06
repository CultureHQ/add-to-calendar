import React, { PureComponent } from "react";

const makeTime = time => new Date(time).toISOString().replace(/[-:]|\.\d{3}/g, '');

const makeUrl = (base, query) => Object.keys(query).reduce((accum, key, index) => (
  `${accum}${index === 0 ? "?" : "&"}${key}=${encodeURIComponent(query[key])}`
), base);

const makeGoogleCalendarUrl = event => makeUrl("https://calendar.google.com/calendar/render", {
  action: "TEMPLATE",
  dates: `${makeTime(event.startsAt)}/${makeTime(event.endsAt)}`,
  location: event.location,
  text: event.name,
  details: event.details
});

const makeOutlookCalendarUrl = event => makeUrl("https://outlook.live.com/owa", {
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

const makeYahooCalendarUrl = event => {
  const minutes = Math.floor((+new Date(event.endsAt) - +new Date(event.startsAt)) / 60 / 1000);
  const duration = `${Math.floor(minutes / 60)}:${`0${minutes % 60}`.slice(-2)}`;

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

const Calendar = ({ children, download = false, href }) => (
  <a download={download} href={href} target="_blank">
    {children}
  </a>
);

const ICSCalendar = ({ children, event }) => {
  const components = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `URL:${document.URL}`,
    `DTSTART:${makeTime(event.startsAt)}`,
    `DTEND:${makeTime(event.endsAt)}`,
    `SUMMARY:${event.name}`,
    `DESCRIPTION:${event.details}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  const href = encodeURI(`data:text/calendar;charset=utf8,${components.join("\n")}`);
  return <Calendar href={href} download>{children}</Calendar>;
};

class AddToCalendar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { open: props.open || false };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.componentIsMounted = true;
    this.configureListener();
  }

  componentDidUpdate(prevProps, prevState) {
    const { open } = this.state;

    if (open !== prevState.open) {
      this.configureListener();
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  configureListener() {
    const { open } = this.state;

    if (open) {
      document.addEventListener("click", this.handleToggle);
    } else {
      document.removeEventListener("click", this.handleToggle);
    }
  }

  handleToggle() {
    if (this.componentIsMounted) {
      this.setState(({ open }) => ({ open: !open }));
    }
  }

  render() {
    const { children = "Add to My Calendar", event } = this.props;
    const { open } = this.state;

    return (
      <div className="chq-atc">
        {event && (
          <button type="button" className="chq-atc--button" onClick={this.handleToggle}>
            <svg width="20px" height="20px" viewBox="0 0 1024 1024">
              <path d="M704 192v-64h-32v64h-320v-64h-32v64h-192v704h768v-704h-192z M864 864h-704v-480h704v480z M864 352h-704v-128h160v64h32v-64h320v64h32v-64h160v128z" />
            </svg>
            {" "}
            {children}
          </button>
        )}
        {open && (
          <div className="chq-atc--dropdown">
            <ICSCalendar event={event}>
              Apple Calendar
            </ICSCalendar>
            <Calendar href={makeGoogleCalendarUrl(event)}>
              Google
            </Calendar>
            <ICSCalendar event={event}>
              Outlook
            </ICSCalendar>
            <Calendar href={makeOutlookCalendarUrl(event)}>
              Outlook Web App
            </Calendar>
            <Calendar href={makeYahooCalendarUrl(event)}>
              Yahoo
            </Calendar>
          </div>
        )}
      </div>
    );
  }
}

export default AddToCalendar;
