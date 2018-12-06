# @culturehq/add-to-calendar

A small package for adding an event to a calendar.

## Getting started

First, add `@culturehq/add-to-calendar` to your `package.json` `dependencies`, then install using either `npm install` or `yarn install`. Then, get your API key from tenor. Finally, you can add the selector component by adding:

```jsx
<AddToCalendar
  event={{
    name: "Happy Hour",
    details: "Let's go after work",
    location: "Boston, MA",
    startsAt: "2018-12-06T17:00:00-05:00",
    endsAt: "2018-12-06T18:00:00-05:00"
  }}
/>
```

To get the styles, be sure it import `@culturehq/add-to-calendar/dist/styles.css` into your application. You can style it appropriately for your app by overriding the CSS classes used internally. They are listed in [`styles.css`](src/styles.css).

### `children`

The label for the button that triggers the dropdown. Defaults to `"Add to My Calendar"`.

### `event`

Should be an object representing the event to be added to the various calendars. The keys are:

* `name` - the name of the event
* `details` - the details of the event
* `location` - the location of the event
* `startsAt` - the start time of the event, formatted as an ISO string
* `endsAt` - the end time of the event, formatted as an ISO string

### `open`

Defaults to `false`. Whether or not the dropdown should start open. (Will be ignored after initial render.)

## Credit

This package is 

## Testing locally

You can run the tests by running `yarn test` and lint by running `yarn lint`. You can run the local server by running `yarn start` which will start the docs server on `http://localhost:8080`.
