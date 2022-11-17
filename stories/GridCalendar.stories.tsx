import React from 'react';
import { Meta, Story } from '@storybook/react';
import { GridCalendar } from '../src';
import { columnsMock } from '../mocks/Columns';
import { IEvent, IGridColumn } from '../src/SharedTypes';
import moment from 'moment';
import { generateRandomEvents } from '../src/util';

const meta: Meta = {
  title: 'Grid calendar',
  component: GridCalendar,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<any> = (args) => <GridCalendar {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const WeekGridView = Template.bind({});

WeekGridView.args = {
  view: 'weekgrid',
  columns: columnsMock,
  locale: 'en',
  eventOnClick: (eventId: string) => {
    console.log('clicked on ' + eventId);
  },
  cellOnClick: (columnData: unknown, date: Date) => {
    console.log('col:' + columnData + ' date:' + date);
  },
  eventRenderer: (event: IEvent) => {
    return (
      <div
        style={{ height: '100%', backgroundColor: '#e4e4e4', display: 'flex' }}
      >
        <div
          style={{
            backgroundColor: event.backgroundColor,
            width: '5px',
          }}
        ></div>
        <div style={{ padding: '5px' }}>
          <span>
            Start: {moment(event.startDate).format('HH:mm')} End:
            {moment(event.endDate).format('HH:mm')}
          </span>
        </div>
      </div>
    );
  },
  columnHeaderRenderer: (column: IGridColumn) => {
    return `${column.label} (${column.events.length})`;
  },
};

export const WeekView = Template.bind({});

WeekView.args = {
  view: 'week',
  events: generateRandomEvents(8),
  locale: 'en',
  eventOnClick: (eventId: string) => {
    console.log('clicked on ' + eventId);
  },
  cellOnClick: (columnData: unknown, date: Date) => {
    console.log('col:' + columnData + ' date:' + date);
  },
  eventRenderer: (event: IEvent) => {
    return (
      <div
        style={{ height: '100%', backgroundColor: '#e4e4e4', display: 'flex' }}
      >
        <div
          style={{
            backgroundColor: event.backgroundColor,
            width: '5px',
          }}
        ></div>
        <div style={{ padding: '5px' }}>
          <span>
            Start: {moment(event.startDate).format('DD-MM HH:mm')} End:
            {moment(event.endDate).format('HH:mm')}
          </span>
        </div>
      </div>
    );
  },
  columnHeaderRenderer: (col: IGridColumn) => {
    return (
      <div>
        {col.label}
        <p>{moment(col.date).format('MMMM DD')}</p>
      </div>
    );
  },
};
