import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeekGridDay from '../src/WeekGridDay';
import { columnsMock } from '../mocks/Columns';
import moment from 'moment';
import { IGridDayProps } from '../src/SharedTypes';
import { generateRandomEvents } from '../src/util';

describe('WeekGridDay', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  const weekGridDayProps: IGridDayProps = {
    day: moment().toDate(),
    columns: columnsMock,
    locale: 'en',
  };
  it('renders without crashing', () => {
    render(<WeekGridDay {...weekGridDayProps} />);
  });

  it('renders events', async () => {
    const mockEvents = generateRandomEvents(1);
    const mockColumns = [
      {
        label: 'Court 1',
        events: [
          {
            ...mockEvents[0],
            label: 'renderedEvent',
            startDate: moment().hours(12).minutes(0).toDate(),
            endDate: moment().hours(13).minutes(0).toDate(),
          },
        ],
      },
    ];

    const component = render(
      <WeekGridDay {...{ ...weekGridDayProps, columns: mockColumns }} />
    );
    expect(component.getByText('renderedEvent')).toBeInTheDocument();
  });

  it('calls the onClick function', () => {
    const eventClick = jest.fn();
    const mockEvents = generateRandomEvents(1);
    const mockColumns = [
      {
        label: 'Court 1',
        events: [
          {
            ...mockEvents[0],
            label: 'click me',
            startDate: moment().hours(12).minutes(0).toDate(),
            endDate: moment().hours(13).minutes(0).toDate(),
            eventId: '0000',
          },
        ],
      },
    ];

    const component = render(
      <WeekGridDay
        {...{
          ...weekGridDayProps,
          columns: mockColumns,
          eventOnClick: eventClick,
        }}
      />
    );

    fireEvent.click(component.getByText('click me'));

    expect(eventClick).toHaveBeenCalledWith('0000');
  });
});
