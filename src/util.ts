import moment, { Moment } from 'moment';

/**
 * Returns an array of days in the week of the provided day
 * @param sourceDate - the date to get the week for
 * @returns array containing the Moment date objects of the week days
 */
export const getWeekDays = (sourceDate: Date): Array<Moment> => {
  var weekStart = moment(sourceDate || moment())
    .clone()
    .startOf('isoWeek');

  return Array(7)
    .fill(0)
    .map((_, i) => weekStart.clone().add(i, 'days'));
};
