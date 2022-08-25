import moment, { Moment } from 'moment';
import { random, sample, times, floor, some } from 'lodash';
import { IEvent, ITimeGap } from './SharedTypes';

/**
 * Returns an array of days in the week of the provided day
 * @param sourceDate - the date to get the week for
 * @returns array containing the Moment date objects of the week days
 */
export const getWeekDays = (
  sourceDate: Date,
  startOnMonday = true
): Array<Moment> => {
  const weekStart = moment(sourceDate || moment())
    .clone()
    .startOf(startOnMonday ? 'isoWeek' : 'week');

  return times(7, (i) => weekStart.clone().add(i, 'days'));
};

export const generateRandomEvents = (count?: number) => {
  const weekDays = getWeekDays(moment().toDate());
  return times(count || random(0, 8), () => {
    const startDate = moment(sample(weekDays)).hours(random(8, 18)).minutes(0);
    const endDate = moment(startDate).add(random(1, 6) * 30, 'minutes');

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

/**
 * see if hour is in the gap and needs to be collapsed
 * @param hour
 * @returns boolean
 */
export const isCollapsed = (hour: Moment, gaps: ITimeGap[]): boolean =>
  some(gaps, (gap: ITimeGap) => {
    return (
      hour.isBetween(moment(gap.from), moment(gap.to)) ||
      hour.isSame(moment(gap.from))
    );
  });

/**
 * Checks the hour for events (if there are any events that are in between hourStart and hourEnd)
 * @param sortedEvents
 * @param hourStart
 * @param hourEnd
 * @returns boolean
 */
export const checkForEvents = (
  sortedEvents: IEvent[],
  hourStart: Moment,
  hourEnd: Moment
): boolean => {
  return some(sortedEvents, (evt: IEvent) => {
    const eventStartMoment = moment(evt.startDate);
    const eventEndMoment = moment(evt.endDate);

    return (
      eventStartMoment.isBetween(hourStart, hourEnd) ||
      eventStartMoment.isSame(hourStart) ||
      hourStart.isBetween(eventStartMoment, eventEndMoment) ||
      hourEnd.isBetween(eventStartMoment, eventEndMoment)
    );
  });
};
