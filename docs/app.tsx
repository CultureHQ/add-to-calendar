import * as React from "react";
import * as ReactDOM from "react-dom";

import AddToCalendar from "../src/AddToCalendar";
import "../src/styles.css";

type FieldProps = {
  children: string,
  name: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
};

const Field = ({ children, name, value, setValue }: FieldProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return (
    <label htmlFor={name}>
      {children}
      <input id={name} name={name} type="text" value={value} onChange={onChange} />
    </label>
  );
};

const App = () => {
  const [name, setName] = React.useState("Happy Hour");
  const [details, setDetails] = React.useState("Let's go after work");
  const [location, setLocation] = React.useState("Boston, MA");
  const [startsAt, setStartsAt] = React.useState("2018-12-06T17:00:00-05:00");
  const [endsAt, setEndsAt] = React.useState("2018-12-06T18:00:00-05:00");

  return (
    <>
      <nav>@culturehq/add-to-calendar</nav>
      <main>
        <Field name="name" value={name} setValue={setName}>
          Name
        </Field>
        <Field name="details" value={details} setValue={setDetails}>
          Details
        </Field>
        <Field name="location" value={location} setValue={setLocation}>
          Location
        </Field>
        <Field name="startsAt" value={startsAt} setValue={setStartsAt}>
          Starts At
        </Field>
        <Field name="endsAt" value={endsAt} setValue={setEndsAt}>
          Ends At
        </Field>
        <div className="chq-atc--wrap">
          <AddToCalendar event={{ name, details, location, startsAt, endsAt }} />
        </div>
      </main>
      {ReactDOM.createPortal(
        <footer>
          <p>
            Copyright (c) 2018-present CultureHQ
            <br />
            <a href="https://github.com/CultureHQ/add-to-calendar">
              github.com/CultureHQ/add-to-calendar
            </a>
            <br />
            <a href="https://engineering.culturehq.com">
              engineering.culturehq.com
            </a>
          </p>
        </footer>,
        document.body
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("main"));
