import moment from 'moment-timezone';
import React, { ReactElement } from 'react';
import { IDayEvents, IEvent, IGridColumn } from './SharedTypes';
import Views, { getViewFromString } from './Views';
import './Main.css';

export interface CalendarProps {
  view: string;
  editMode?: boolean;
  hideUnavailableTime?: boolean;
  displayDate?: Date;
  stepForwad?: () => void; // function to go a step forward
  stepBack?: () => void; // function to go a step back
  dateChanged?: () => void; // callback when the date was changed in the calendar
  locale?: string; // locale code to localize dates
  columns?: Array<IGridColumn>; // grid columns
  events?: Array<IDayEvents>; // events
  eventRenderer?: (event: IEvent) => ReactElement;
  mobileEventRenderer?: (event: IEvent, date?: string) => ReactElement;
  eventOnClick?: (event: IEvent) => void;
  cellOnClick?: (columnData: unknown, date: Date) => void;
  columnHeaderRenderer?: (column: IGridColumn) => ReactElement;
  mobileDayHeaderRenderer?: (
    dayEvents: IDayEvents,
    toggleDisplay?: () => void,
    isShowing?: boolean
  ) => ReactElement;
  gutterClassName?: string;
  scrollToEarliest?: boolean;
  scrollToToday?: boolean;
  collapseDays?: boolean;
  collapseToggle?: (collapsed: boolean) => ReactElement;
  mobileDayCollapsable?: boolean;
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
    mobileDayHeaderRenderer,
    editMode,
    hideUnavailableTime,
    gutterClassName,
    scrollToEarliest,
    scrollToToday,
    collapseDays,
    collapseToggle,
    mobileDayCollapsable,
  } = props;

  // this sets the moment.js locale for entire package
  moment.locale(locale);
  // moment.tz.setDefault('Europe/London');

  const CalendarView = Views[getViewFromString(view)];

  return (
    <div>
      <CalendarView
        selectedDate={displayDate || moment()}
        columns={columns}
        events={events}
        editMode={editMode}
        hideUnavailableTime={hideUnavailableTime}
        eventRenderer={eventRenderer}
        mobileEventRenderer={mobileEventRenderer}
        eventOnClick={eventOnClick}
        cellOnClick={cellOnClick}
        columnHeaderRenderer={columnHeaderRenderer}
        mobileDayHeaderRenderer={mobileDayHeaderRenderer}
        gutterClassName={gutterClassName}
        scrollToEarliest={scrollToEarliest}
        scrollToToday={scrollToToday}
        collapseDays={collapseDays}
        collapseToggle={collapseToggle}
        mobileDayCollapsable={mobileDayCollapsable}
      />
    </div>
  );
};

export default Calendar;
export { IGridColumn, IEvent, IDayEvents } from './SharedTypes';
