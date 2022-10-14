import React from 'react';
import { IViewProps } from './SharedTypes';
import { getWeekDays } from './util';
import WeekGridDay from './WeekGridDay';

/**
 * A weekly grid view
 */
const WeekGridView = (props: IViewProps) => {
  const {
    selectedDate,
    locale,
    columns,
    eventRenderer,
    eventOnClick,
    columnHeaderRenderer,
    editMode,
    gutterClassName,
  } = props;
  const weekDays = getWeekDays(selectedDate);
  return (
    <div>
      {weekDays.map((weekDay, i) => (
        <WeekGridDay
          key={`day-${i}`}
          day={weekDay.toDate()}
          columns={columns}
          locale={locale}
          editMode={editMode}
          eventRenderer={eventRenderer}
          eventOnClick={eventOnClick}
          columnHeaderRenderer={columnHeaderRenderer}
          gutterClassName={gutterClassName}
        />
      ))}
    </div>
  );
};

export default WeekGridView;
