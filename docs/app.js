import React, { useState } from "react";
import ReactDOM from "react-dom";

import AddToCalendar from "../src/AddToCalendar";
import "../src/style.css";

const App = () => (
  <main>
    <AddToCalendar
      event={{
        title: "Test Event",
        description: "This is a test event",
        location: "Boston, MA",
        startTime: "2018-09-16T20:15:00-04:00",
        endTime: "2018-09-16T21:45:00-04:00"
      }}
    />
  </main>
);

ReactDOM.render(<App />, document.getElementById("main"));
