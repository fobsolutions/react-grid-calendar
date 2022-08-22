import React from 'react';
import { Meta, Story } from '@storybook/react';
import { GridCalendar } from '../src';
import { columnsMock } from '../mocks/Columns';

const meta: Meta = {
  title: 'Welcome',
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
export const Default = Template.bind({});

Default.args = {
  view: 'months',
  columns: columnsMock,
  locale: 'et',
  eventOnClick: (eventId: string) => {
    console.log('clicked on ' + eventId);
  },
  eventRenderer: (eventId: string) => {
    return (
      <div
        style={{ height: '100%', backgroundColor: '#e4e4e4', display: 'flex' }}
      >
        <div style={{ backgroundColor: 'blue', width: '5px' }}></div>
        <div style={{ padding: '5px' }}>
          <span>Event id: {eventId}</span>
        </div>
      </div>
    );
  },
};
