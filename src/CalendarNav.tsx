import React from 'react';
import { EViewType } from './Views';

interface calendarNavProps {
  onSelectView?: (view: EViewType) => void;
  views: Array<EViewType>;
}

const CalendarNav = (_props: calendarNavProps) => {
  return <div>NAV</div>;
};

export default CalendarNav;
