import React from 'react';
import CalendarNav from './CalendarNav';
import Views, { EViewType, getViews } from './Views';
import { head } from 'lodash';

export interface CalendarProps {
  views: Array<string>;
}

const Calendar = (props: CalendarProps) => {
  const views = getViews(props.views);
  const [selectedView, setView] = React.useState<EViewType>(
    head(views) || EViewType.week
  );
  const CalendarView = Views[selectedView];

  return (
    <div>
      <CalendarNav onSelectView={setView} />
      <CalendarView />
    </div>
  );
};

export default Calendar;
