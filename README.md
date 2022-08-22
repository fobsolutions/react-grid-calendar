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

### Storybook

Run inside another terminal:

```bash
npm run storybook # yarn storybook
```

This loads the stories from `./stories`.

> NOTE: Stories should reference the components as if using the library. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

> NOTE: If you troubles running the storybook described in [here](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported) try running the following command: `export NODE_OPTIONS=--openssl-legacy-provider`

### Tests

To run tests:

```bash
npm t
```

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Usage

To use the calendar you need to specify the **columns that contain the events**. See _stories/GridCalendar.strories.tsx_ for example. Your data should look something like this:

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
  }
];

<GridCalendar
    columns={columns}
/>
```

This will render one column that has 2 events.

### Events rendering

You can chose to render the events using custom renderer function by passing the **eventRenderer** function that accepts one parameter **eventId**.

```
<GridCalendar
    columns={columns}
    eventRenderer={(eventId) => (<div>Event id: {eventId}</div>)}
/>
```

### Listening to event clicks

You can listen to event clicks by specifying the **eventOnClick** paramter to the component. Just like renderer function it accepts one parameter **eventId**.

```
<GridCalendar
    columns={columns}
    eventOnClick={(eventId) => console.log('clicked event: + eventId')}
/>
```

### Specifying the locale

To specify the locale to be used in the calendar simply specify 2-letter locale code like 'en', 'es' etc. Default locale is 'en';

```
<GridCalendar
    columns={columns}
    locale='es'
/>
```
