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
    cellOnClick,
    columnHeaderRenderer,
    editMode,
    hideUnavailableTime,
    gutterClassName,
    scrollToEarliest,
    collapseDays,
    collapseToggle,
    collapseAll,
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
          hideUnavailableTime={hideUnavailableTime}
          eventRenderer={eventRenderer}
          eventOnClick={eventOnClick}
          cellOnClick={cellOnClick}
          columnHeaderRenderer={columnHeaderRenderer}
          gutterClassName={gutterClassName}
          scrollToEarliest={scrollToEarliest}
          collapseDays={collapseDays}
          collapseToggle={collapseToggle}
          collapseAll={collapseAll}
        />
      ))}
    </div>
  );
};

export default WeekGridView;
