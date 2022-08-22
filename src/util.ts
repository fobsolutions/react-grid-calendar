import moment, { Moment } from 'moment';
import { random, sample, times, floor } from 'lodash';
import { IEvent } from './SharedTypes';

/**
 * Returns an array of days in the week of the provided day
 * @param sourceDate - the date to get the week for
 * @returns array containing the Moment date objects of the week days
 */
export const getWeekDays = (sourceDate: Date): Array<Moment> => {
  const weekStart = moment(sourceDate || moment())
    .clone()
    .startOf('isoWeek');

  return times(7, (i) => weekStart.clone().add(i, 'days'));
};

export const generateRandomEvents = (count?: number) => {
  const weekDays = getWeekDays(moment().toDate());
  return times(count || random(0, 8), () => {
    const startDate = moment(sample(weekDays)).hours(random(8, 18)).minutes(0);
    const endDate = moment(startDate).add(random(1, 3) * 30, 'minutes');

    return {
      eventId: `${random(999, 9999)}-${random(999, 9999)}-${random(999, 9999)}`,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      label: `Level ${random(1, 8)}`,
      backgroundColor: `#${floor(Math.random() * 16777215).toString(16)}`,
      labelClass: '',
    } as IEvent;
  });
};
