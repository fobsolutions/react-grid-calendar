import moment from 'moment';
import React from 'react';
import Views, { getViewFromString } from './Views';

export interface CalendarProps {
  view: string;
  displayDate: Date;
  stepForwad: () => {}; // function to go a step forward
  stepBack: () => {}; // function to go a step back
  dateChanged: () => {}; // callback when the date was changed in the calendar
  locale: string; // locale code to localize dates
}

const Calendar = (props: CalendarProps) => {
  const { view, displayDate } = props;

  const CalendarView = Views[getViewFromString(view)];

  return (
    <div>
      <CalendarView displayDate={displayDate || moment()} />
    </div>
  );
};

export default Calendar;
