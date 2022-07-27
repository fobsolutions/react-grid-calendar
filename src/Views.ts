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

export default Views;
