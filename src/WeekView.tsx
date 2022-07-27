import React from 'react';
import { IViewProps } from './SharedTypes';
import { getWeekDays } from './util';
import WeekDay from './WeekDay';

const WeekView = (props: IViewProps) => {
  const { selectedDate, locale } = props;
  const weekDays = getWeekDays(selectedDate);
  console.log(locale);
  console.log(weekDays);
  return (
    <div>
      {weekDays.map(weekDay => (
        <WeekDay day={weekDay.toDate()} />
      ))}
    </div>
  );
};

export default WeekView;
