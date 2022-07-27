import MonthView from './MonthView';
import WeekView from './WeekView';
import { lowerCase, values, reverse } from 'lodash';

export enum EViewType {
  month = 'month',
  week = 'week',
}

const Views: { [key in EViewType]: React.ElementType } = {
  month: MonthView,
  week: WeekView,
};

/**
 * Converts the views passed in props to enums, if the array is empty returns all available views
 * @param views
 */
export const getViews = (views: Array<string>): Array<EViewType> => {
  return views.length
    ? views
        .filter((viewStr: string) => lowerCase(viewStr) in EViewType)
        .map((viewStr: string) => {
          return lowerCase(viewStr) as EViewType;
        })
    : reverse(values(EViewType));
};

/**
 * Gets the current view from string (default is week view)
 * @param viewStr
 * @returns EViewType with the selected view
 */
export const getViewFromString = (viewStr: string) => {
  return lowerCase(viewStr) in EViewType
    ? (lowerCase(viewStr) as EViewType)
    : EViewType.week;
};

export default Views;
