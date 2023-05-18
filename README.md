# react-grid-calendar

React calendar package that supports weekly grid view with vertical columns that are very useful for displaying bookings through the week.

## Installing

Run

```bash
npm install # or yarn install
```

## Commands

The recommended workflow is to run TSDX in one terminal:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run either Storybook or the example playground:

## Storybook

Run inside another terminal:

```bash
npm run storybook # yarn storybook
```

This loads the stories from `./stories`.

> NOTE: Stories should reference the components as if using the library. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

> NOTE: If you troubles running the storybook described in [here](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported) try running the following command: `export NODE_OPTIONS=--openssl-legacy-provider`

## Tests

To run tests:

```bash
npm t
```

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

## Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

## TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Usage

Currently there are 2 views, Week Grid view (default) and simple Week view. To use week view simply specify the parameter view like so: `view="week"`

### Week Grid view

You need to specify the **columns that contain the events** (See _stories/GridCalendar.strories.tsx_ for example). In this case your data should look something like this:

```
const columns = [
  {
    label: 'Court 1',
    events: [
        {
            eventId: '0000-0000-0000',
            startDate: '2022-08-01 12:00:00',
            endDate: '2022-08-01 13:00:00',
            label: `Level 1`,
            backgroundColor: `#0000ff`,
        },
        {
            eventId: '0000-0000-0001',
            startDate: '2022-08-01 15:00:00',
            endDate: '2022-08-01 16:00:00',
            label: `Level 1`,
            backgroundColor: `#0000ff`,
        }
    ],
    columnData: { id: '000-000-001', name: 'Court 1' }
  }
];

<GridCalendar
    columns={columns}
/>
```

This will render one column that has 2 events.

#### Overlapping events

If some events are overlapping they are sorted by 3 things in this order: start date, duration, eventId. Note that eventId is random so if your events have the same start and end dates, they will appear on top of each other in random order.

#### Availability

By default Calendar in Grid Mode hides the cells that are not inside of availability. If you want to display all the cells do not provie `availability` property in `columns` at all.

To disable from clicking and grey out some of the cells that are use the `availability` object like so:

```
const columns = [
  {
    label: 'Court 1',
    columnData: { id: '000-000-001', name: 'Court 1' }
    availability: [{ weekDay: 1, startTime: '06:00', endTime: '19:00' }],
  }
];

<GridCalendar
    columns={columns}
/>
```

Note that presense of empty `availability` array disables entire column for the day. To make entire day available remove the `availability` property.

### Week view

You need to specify the list of events; Example:

```
const events = [
        {
            eventId: '0000-0000-0000',
            startDate: '2022-08-01 12:00:00',
            endDate: '2022-08-01 13:00:00',
            label: `Level 1`,
            backgroundColor: `#0000ff`,
        },
        {
            eventId: '0000-0000-0001',
            startDate: '2022-08-01 15:00:00',
            endDate: '2022-08-01 16:00:00',
            label: `Level 1`,
            backgroundColor: `#0000ff`,
        }
    ],

<GridCalendar
    events={events}
    view="week"
/>
```

This will render the week view with 2 events.

#### Week mobile view

The week view is responsive. It changes to mobile view at breakpoint 768px. Mobile event renderer and mobile day header are specified separatley from regular event renderer and column header renderer via `mobileEventRenderer` and `mobileDayHeaderRenderer` props.

## Display date

The calendar library does not provide the UI to change the displayed week instead you can develop your own UI and simply specify the display date using the **displayDate** parameter and the library will display the week that this date falls into. Example:

```
<GridCalendar
    columns={columns}
    displayDate={new Date('2000-01-01')}
/>
```

This will render the week that 1st of January 2000 falls onto.

## Events rendering

You can chose to render the events using custom renderer function by passing the **eventRenderer** function that accepts one parameter **event**.

```
<GridCalendar
    columns={columns}
    eventRenderer={(event) => (<div>Event: {event.eventId}</div>)}
/>
```

## Listening to event clicks

You can listen to event clicks by specifying the **eventOnClick** paramter to the component. Just like renderer function it accepts one parameter **event**.

```
<GridCalendar
    columns={columns}
    eventOnClick={(event) => console.log('clicked event: + event.eventId')}
/>
```

## Listening to cell clicks

You can listen to clicks on empty cells by specifying the **cellOnClick** paramter to the component. This function accepts two parameters **columnData** [unknown] and **date** [string]. **columnData** contains the data provided in the **columnData** property specified in the column (see _Week Grid view_ section above) and **date** contains the date associated with the lcicked cell.

```
<GridCalendar
    columns={columns}
    cellOnClick: (columnData: unknown, date: string) => {
        console.log('col:' + JSON.stringify(columnData) + ' date:' + date);
    }
/>
```

## Column header rendering

You can chose to render the column header using custom renderer function by passing the **columnHeaderRenderer** function that accepts one parameter **column**.

```
<GridCalendar
    columns={columns}
    columnHeaderRenderer={(event) => (<div>{column.label} ({column.events.length})</div>)}
/>
```

## Specifying the locale

To specify the locale to be used in the calendar simply specify 2-letter locale code like 'en', 'es' etc. Default locale is 'en';

```
<GridCalendar
    columns={columns}
    locale='es'
/>
```

## Hiding time slots in Week Mode

In order to display only the tme slots in Week Mode that start from earliest event and ends at latest use the prop `hideUnavailableTime={true}`

## Collapsable days in mobile view

By default the days in the mobile view are collapsable, meaning that the days in the past will be collapsed initially and all days can be collapsed or expanded by clicking on the day header. To disable this functionality use the `mobileDayCollapsable` prop.
