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
    events: [],
    columnData: { id: '0000-0000-0000', name: 'Court 1' },
    availability: [
      { weekDay: 1, startTime: '06:00', endTime: '10:00' },
      { weekDay: 6, startTime: '06:00', endTime: '12:00' },
      { weekDay: 6, startTime: '13:00', endTime: '20:00' },
    ],
  },
  {
    label: 'Court 2',
    events: generateRandomEvents(5),
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
    availability: [
      { weekDay: 1, startTime: '05:00', endTime: '12:00' },
      { weekDay: 1, startTime: '13:00', endTime: '19:00' },
    ],
  },
  {
    label: 'Court 4',
    events: [],
    columnData: { id: '0000-0000-0002', name: 'Court 4' },
    availability: [
      { weekDay: 3, startTime: '08:00', endTime: '12:00' },
      { weekDay: 3, startTime: '13:30', endTime: '20:00' },
    ],
  },
  {
    label: 'Court 5',
    events: generateRandomEvents(3),
    columnData: { id: '0000-0000-0003', name: 'Court 5' },
    availability: [
      { weekDay: 6, startTime: '07:00', endTime: '12:00' },
      { weekDay: 6, startTime: '13:00', endTime: '21:00' },
    ],
  },
  // {
  //   label: 'Court 6',
  //   events: generateRandomEvents(),
  //   columnData: { id: '0000-0000-0004', name: 'Court 6' },
  // },
  // {
  //   label: 'Court 7',
  //   events: generateRandomEvents(),
  //   columnData: null,
  // },

  // {
  //   label: 'Court 8',
  //   events: generateRandomEvents(),
  //   columnData: { id: '0000-0000-0005', name: 'Court 8' },
  // },

  // {
  //   label: 'Court 9',
  //   events: generateRandomEvents(),
  //   columnData: null,
  // },
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
