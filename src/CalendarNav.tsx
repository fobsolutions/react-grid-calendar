import React from 'react';
import { EViewType } from './Views';

interface calendarNavProps {
  onSelectView?: (view: EViewType) => void;
}

const CalendarNav = (_props: calendarNavProps) => {
  //console.log(props.onSelectView);
  //props.onSelectView(EViewType.week);
  return <div>NAV</div>;
};

export default CalendarNav;
