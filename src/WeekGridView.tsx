import React from 'react';
import { IViewProps } from './SharedTypes';
import { getWeekDays } from './util';
import WeekGridDay from './WeekGridDay';

/**
 * A weekly grid view
 */
const WeekGridView = (props: IViewProps) => {
  const { selectedDate, locale, columns, eventRenderer, eventOnClick } = props;
  const weekDays = getWeekDays(selectedDate);
  return (
    <div>
      {weekDays.map((weekDay, i) => (
        <WeekGridDay
          key={`day-${i}`}
          day={weekDay.toDate()}
          columns={columns}
          locale={locale}
          eventRenderer={eventRenderer}
          eventOnClick={eventOnClick}
        />
      ))}
    </div>
  );
};

export default WeekGridView;
