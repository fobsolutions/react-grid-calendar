import { IEvent, IGridColumn } from '../src/SharedTypes';
import { generateRandomEvents } from '../src/util';

export const columnsMock: Array<IGridColumn> = [
  {
    label: 'Court 1',
    events: generateRandomEvents(),
  },
  {
    label: 'Court 2',
    events: generateRandomEvents(),
  },
  {
    label: 'Court 3',
    events: generateRandomEvents(),
  },
  {
    label: 'Court 4',
    events: generateRandomEvents(),
  },
  {
    label: 'Court 5',
    events: generateRandomEvents(),
  },
];
