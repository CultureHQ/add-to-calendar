# @culturehq/add-to-calendar

A small package for adding an event to a calendar.

## Getting started

First, add `@culturehq/add-to-calendar` to your `package.json` `dependencies`, then install using either `npm install` or `yarn install`. Then, get your API key from tenor. Finally, you can add the selector component by adding:

```jsx
<AddToCalendar
  buttonLabel="Add to My Calendar"
  optionsOpen={false}
  event={
    title: "Test Event",
    description: "This is a test event",
    location: "Boston, MA",
    startTime: "2018-09-16T20:15:00-04:00",
    endTime: "2018-09-16T21:45:00-04:00"
  }
  listItems={[
    { apple: "Apple Calendar" },
    { google: "Google" },
    { outlook: "Outlook" },
    { outlookcom: "Outlook Web App" },
    { yahoo: "Yahoo" }
  ]}
/>
```

To get the styles, be sure it import `@culturehq/add-to-calendar/dist/styles.css` into your application. You can style it appropriately for your app by overriding the CSS classes used internally. They are listed in [`styles.css`](src/styles.css).

## Testing locally

You can run the tests by running `yarn test` and lint by running `yarn lint`. You can run the local server by running `yarn start` which will start the docs server on `http://localhost:8080`.
