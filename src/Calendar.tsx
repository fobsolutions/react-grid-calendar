import moment from 'moment';
import React, { ReactElement } from 'react';
import { IGridColumn } from './SharedTypes';
import Views, { getViewFromString } from './Views';
import './Main.css';

export interface CalendarProps {
  view: string;
  displayDate?: Date;
  stepForwad?: () => void; // function to go a step forward
  stepBack?: () => void; // function to go a step back
  dateChanged?: () => void; // callback when the date was changed in the calendar
  locale?: string; // locale code to localize dates
  columns?: Array<IGridColumn>; // grid columns
  eventRenderer?: (eventId: string) => ReactElement;
  eventOnClick?: (eventId: string) => void;
}

const Calendar = (props: CalendarProps) => {
  const {
    view,
    displayDate,
    columns,
    locale = 'en',
    eventRenderer,
    eventOnClick,
  } = props;

  // this sets the moment.js locale for entire package
  moment.locale(locale);

  const CalendarView = Views[getViewFromString(view)];

  return (
    <div>
      <CalendarView
        displayDate={displayDate || moment()}
        columns={columns}
        eventRenderer={eventRenderer}
        eventOnClick={eventOnClick}
      />
    </div>
  );
};

export default Calendar;
