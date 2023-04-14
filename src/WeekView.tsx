import moment from 'moment';
import React from 'react';
import { nanoid } from 'nanoid';
import { IGridColumn, IViewProps } from './SharedTypes';
import WeekGridDay from './WeekGridDay';
import WeekMobileView from './WeekMobileView';

/**
 * A weekly grid view
 */
const WeekView = (props: IViewProps) => {
  const {
    selectedDate,
    locale,
    columns,
    events,
    hideUnavailableTime,
    eventRenderer,
    mobileEventRenderer,
    mobileDayHeaderRenderer,
    eventOnClick,
    cellOnClick,
    columnHeaderRenderer,
    editMode,
    scrollToToday,
  } = props;

  return (
    <>
      <WeekMobileView
        events={events}
        mobileEventRenderer={mobileEventRenderer}
        mobileDayHeaderRenderer={mobileDayHeaderRenderer}
        locale={locale}
        eventOnClick={eventOnClick}
        selectedDate={selectedDate}
        scrollToToday={scrollToToday}
      />
      <WeekGridDay
        day={selectedDate}
        columns={
          columns ||
          events?.map((weekDay) => {
            return {
              ...weekDay,
              id: nanoid(6),
              date: moment(weekDay.date).toDate(),
              label: moment(weekDay.date).format('dddd'),
            } as unknown as IGridColumn;
          })
        }
        locale={locale}
        editMode={editMode}
        hideUnavailableTime={hideUnavailableTime}
        eventRenderer={eventRenderer}
        eventOnClick={eventOnClick}
        cellOnClick={cellOnClick}
        columnHeaderRenderer={columnHeaderRenderer}
        weekMode={true}
        classNames={'week-view'}
      />
    </>
  );
};

export default WeekView;
