import MonthView from './MonthView';
import WeekGridView from './WeekGridView';
import WeekView from './WeekView';

export enum EViewType {
  month = 'month',
  week = 'week',
  weekgrid = 'weekgrid',
}

const Views: { [key in EViewType]: React.ElementType } = {
  month: MonthView,
  week: WeekView,
  weekgrid: WeekGridView,
};

/**
 * Gets the current view from string (default is week view)
 * @param viewStr
 * @returns EViewType with the selected view
 */
export const getViewFromString = (viewStr: string) => {
  return viewStr.toLowerCase() in EViewType
    ? (viewStr.toLowerCase() as EViewType)
    : EViewType.week;
};

export default Views;
