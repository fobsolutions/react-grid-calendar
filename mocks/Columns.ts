import { random, times } from 'lodash';
import moment from 'moment';
import { IGridColumn } from '../src/SharedTypes';
import {
  generateRandomEvents,
  generateRandomEventsSameDate,
  generateRandomEventsSameTime,
} from '../src/util';

export const columnsMock: Array<IGridColumn> = [
  {
    label: 'Court 1',
    events: [
      {
        eventId: '9797-8366-3031',
        startDate: moment('2022-12-12T06:00:00.000Z').toDate(),
        endDate: moment('2022-12-12T07:30:00.000Z').toDate(),
        label: 'Level 4',
        backgroundColor: '#a9a73f',
        labelClass: '',
        columnId: 'WE52r7',
      },
      {
        eventId: '7114-7209-7160',
        startDate: moment('2022-12-12T06:00:00.000Z').toDate(),
        endDate: moment('2022-12-12T09:00:00.000Z').toDate(),
        label: 'Level 1',
        backgroundColor: '#e23499',
        labelClass: '',
        columnId: 'WE52r7',
      },
      {
        eventId: '9813-5868-6732',
        startDate: moment('2022-12-12T06:00:00.000Z').toDate(),
        endDate: moment('2022-12-12T06:30:00.000Z').toDate(),
        label: 'Level 7',
        backgroundColor: '#26658a',
        labelClass: '',
        columnId: 'WE52r7',
      },
    ],
    columnData: { id: '0000-0000-0000', name: 'Court 1' },
    availability: [{ weekDay: 1, startTime: '06:00', endTime: '19:00' }],
  },
  {
    label: 'Court 2',
    events: generateRandomEventsSameTime(8),
    columnData: '0000-0000-0001',
    availability: [
      { weekDay: 1, startTime: '06:00', endTime: '11:30' },
      { weekDay: 4, startTime: '13:30', endTime: '18:00' },
    ],
  },
  {
    label: 'Court 3',
    events: [],
    columnData: 900,
    availability: [],
  },
  {
    label: 'Court 4',
    events: [],
    columnData: { id: '0000-0000-0002', name: 'Court 4' },
  },
  {
    label: 'Court 5',
    events: generateRandomEvents(),
    columnData: { id: '0000-0000-0003', name: 'Court 5' },
    availability: [
      { weekDay: 3, startTime: '08:00', endTime: '12:00' },
      { weekDay: 3, startTime: '13:30', endTime: '20:00' },
    ],
  },
  {
    label: 'Court 6',
    events: generateRandomEvents(),
    columnData: { id: '0000-0000-0004', name: 'Court 6' },
  },
  {
    label: 'Court 7',
    events: generateRandomEvents(),
    columnData: null,
  },

  {
    label: 'Court 8',
    events: generateRandomEvents(),
    columnData: { id: '0000-0000-0005', name: 'Court 8' },
  },

  {
    label: 'Court 9',
    events: generateRandomEvents(),
    columnData: null,
  },
];

export const weekEvents = () => {
  const monday = moment().startOf('isoWeek');
  return times(7, (indx) => {
    const d = monday.clone().add(indx, 'days');
    return {
      date: d.format('yyyy-MM-DD'),
      events: generateRandomEventsSameDate(d.toDate(), random(1, 5)),
    };
  });
};
