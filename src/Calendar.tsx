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
  events?: Array<IEvent>; // events
  eventRenderer?: (event: IEvent) => ReactElement;
  mobileEventRenderer?: (event: IEvent) => ReactElement;
  eventOnClick?: (event: IEvent) => void;
  cellOnClick?: (columnData: unknown, date: Date) => void;
  columnHeaderRenderer?: (column: IGridColumn) => ReactElement;
  gutterClassName?: string;
  scrollToEarliest?: boolean;
}

const Calendar = (props: CalendarProps) => {
  const {
    view,
    displayDate,
    columns,
    events,
    locale = 'en',
    eventRenderer,
    mobileEventRenderer,
    eventOnClick,
    cellOnClick,
    columnHeaderRenderer,
    editMode,
    gutterClassName,
    scrollToEarliest,
  } = props;

  // this sets the moment.js locale for entire package
  moment.locale(locale);

  const CalendarView = Views[getViewFromString(view)];

  return (
    <div>
      <CalendarView
        selectedDate={displayDate || moment()}
        columns={columns}
        events={events}
        editMode={editMode}
        eventRenderer={eventRenderer}
        mobileEventRenderer={mobileEventRenderer}
        eventOnClick={eventOnClick}
        cellOnClick={cellOnClick}
        columnHeaderRenderer={columnHeaderRenderer}
        gutterClassName={gutterClassName}
        scrollToEarliest={scrollToEarliest}
      />
    </div>
  );
};

export default Calendar;
export { IGridColumn, IEvent } from './SharedTypes';
