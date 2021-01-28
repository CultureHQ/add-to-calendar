import * as React from "react";
import { render, fireEvent } from "@testing-library/react";

import AddToCalendar from "../AddToCalendar";

const mockEvent = {
  name: "Happy Hour",
  details: "Let's go after work",
  location: "Boston, MA",
  startsAt: "2018-12-06T17:00:00-05:00",
  endsAt: "2018-12-06T18:00:00-05:00"
};

const getDropped = (container: HTMLElement) => (
  container.querySelector(".chq-atc--dropdown")
);

test("allows initial open to be set", () => {
  const { container } = render(<AddToCalendar event={mockEvent} open />);

  expect(getDropped(container)).toBeTruthy();
});

test("allows clicking outside to close", () => {
  const { container, getByText } = render(
    <div>
      <AddToCalendar event={mockEvent} open />
      <button type="button">Click Me</button>
    </div>
  );

  fireEvent.click(getByText("Click Me"));
  expect(getDropped(container)).toBeFalsy();
});

test("allows clicking the button to toggle", () => {
  const { container, getByText } = render(<AddToCalendar event={mockEvent} />);

  fireEvent.click(getByText("Add to My Calendar"));
  expect(getDropped(container)).toBeTruthy();

  fireEvent.click(getByText("Add to My Calendar"));
  expect(getDropped(container)).toBeFalsy();
});

test("ignores other updates when establishing listener", () => {
  const { container, rerender } = render(<AddToCalendar event={mockEvent} />);

  rerender(<AddToCalendar event={mockEvent} open />);

  expect(getDropped(container)).toBeFalsy();
});

test("makes expected links", () => {
  const { container } = render(<AddToCalendar event={mockEvent} open />);
  const hrefs = Array.from(container.querySelectorAll("a")).map(node => node.href).sort();

  const name = encodeURIComponent(mockEvent.name);
  const startTime = "20181206T220000Z";
  const startTimeOutlook = "2018-12-06T17%3A00%3A00-05%3A00";

  const [,, google, yahoo, outlook] = hrefs;

  hrefs.forEach(href => {
    expect(href).toContain(name);
    const expectedStartTime = href === outlook ? startTimeOutlook : startTime;
    expect(href).toContain(expectedStartTime);
  });

  expect(google).toContain("https://calendar.google.com");

  expect(yahoo).toContain("https://calendar.yahoo.com");
  expect(yahoo).toContain(encodeURIComponent("0100"));

  expect(outlook).toContain("https://outlook.live.com");
});

test("allows click to be overriden by props", () => {
  const { container, getByText } = render(
    <div>
      <AddToCalendar event={mockEvent} handleClick={(e)=> e.preventDefault() }/>
    </div>
  );
  fireEvent.click(getByText("Add to My Calendar"));
  expect(getDropped(container)).toBeFalsy();
});
