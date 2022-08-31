import moment from 'moment';
import { getWeekDays, isCollapsed } from './../src/util';

describe('Util', () => {
  describe('getWeekDays', () => {
    it('returns week days for a given date starting from monday', () => {
      const result = getWeekDays(moment('2022-01-01').toDate());
      expect(result).toHaveLength(7);
      expect(result[0].format('yyyy-MM-DD')).toEqual('2021-12-27');
    });

    it('returns week days for a given date starting from sunday', () => {
      const result = getWeekDays(moment('2022-02-01').toDate(), false);
      expect(result).toHaveLength(7);
      expect(result[0].format('yyyy-MM-DD')).toEqual('2022-01-30');
    });
  });

  describe('isCollapsed', () => {
    const gaps = [
      {
        from: moment('2022-01-01 10:00:00').toDate(),
        to: moment('2022-01-01 12:00:00').toDate(),
      },
      {
        from: moment('2022-01-01 16:00:00').toDate(),
        to: moment('2022-01-01 18:00:00').toDate(),
      },
    ];

    it('returns true if hour is within the event', () => {
      const hourInside = moment('2022-01-01 11:00:00');
      expect(isCollapsed(hourInside, gaps)).toBeTruthy();
    });

    it('returns false if hour is outside of the event', () => {
      const hourOutside = moment('2022-01-01 15:00:00');
      expect(isCollapsed(hourOutside, gaps)).toBeFalsy();
    });
  });
});
