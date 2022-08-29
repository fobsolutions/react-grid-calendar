import moment from 'moment';
import React, { ReactElement } from 'react';
import { IEvent, IGridColumn } from './SharedTypes';
import Views, { getViewFromString } from './Views';
import './Main.css';

export interface CalendarProps {
  view: string;
  editMode?: boolean;
  displayDate?: Date;
  stepForwad?: () => void; // function to go a step forward
  stepBack?: () => void; // function to go a step back
  dateChanged?: () => void; // callback when the date was changed in the calendar
  locale?: string; // locale code to localize dates
  columns?: Array<IGridColumn>; // grid columns
  eventRenderer?: (event: IEvent) => ReactElement;
  eventOnClick?: (event: IEvent) => void;
  columnHeaderRenderer?: (column: IGridColumn) => ReactElement;
}

const Calendar = (props: CalendarProps) => {
  const {
    view,
    displayDate,
    columns,
    locale = 'en',
    eventRenderer,
    eventOnClick,
    columnHeaderRenderer,
    editMode,
  } = props;

  // this sets the moment.js locale for entire package
  moment.locale(locale);

  const CalendarView = Views[getViewFromString(view)];

  return (
    <div>
      <CalendarView
        displayDate={displayDate || moment()}
        columns={columns}
        editMode={editMode}
        eventRenderer={eventRenderer}
        eventOnClick={eventOnClick}
        columnHeaderRenderer={columnHeaderRenderer}
      />
    </div>
  );
};

export default Calendar;
