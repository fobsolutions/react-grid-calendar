import moment from 'moment';
import React from 'react';
import { nanoid } from 'nanoid';
import { IEvent, IGridColumn, IViewProps } from './SharedTypes';
import { getWeekDays } from './util';
import WeekGridDay from './WeekGridDay';

/**
 * A weekly grid view
 */
const WeekView = (props: IViewProps) => {
  const {
    selectedDate,
    locale,
    columns,
    events,
    eventRenderer,
    eventOnClick,
    columnHeaderRenderer,
    editMode,
  } = props;

  const weekDays = getWeekDays(selectedDate);

  return (
    <WeekGridDay
      day={selectedDate}
      columns={
        columns ||
        weekDays.map((weekDay) => {
          return {
            id: nanoid(6),
            date: weekDay.toDate(),
            label: weekDay.format('dddd'),
            events: events?.filter((evt: IEvent) => {
              return moment(evt.startDate).isBetween(
                weekDay.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                weekDay.endOf('day').format('YYYY-MM-DD HH:mm:ss')
              );
            }),
          } as IGridColumn;
        })
      }
      locale={locale}
      editMode={editMode}
      eventRenderer={eventRenderer}
      eventOnClick={eventOnClick}
      columnHeaderRenderer={columnHeaderRenderer}
      weekMode={true}
    />
  );
};

export default WeekView;
