import { IGridColumn } from '../src/SharedTypes';
import { generateRandomEvents } from '../src/util';

export const columnsMock: Array<IGridColumn> = [
  {
    label: 'Court 1',
    events: generateRandomEvents(),
    columnData: { id: '0000-0000-0000', name: 'Court 1' },
  },
  {
    label: 'Court 2',
    events: generateRandomEvents(),
    columnData: '0000-0000-0001',
  },
  {
    label: 'Court 3',
    events: generateRandomEvents(),
    columnData: 900,
  },
  {
    label: 'Court 4',
    events: generateRandomEvents(),
    columnData: { id: '0000-0000-0002', name: 'Court 4' },
  },
  {
    label: 'Court 5',
    events: generateRandomEvents(),
    columnData: { id: '0000-0000-0003', name: 'Court 5' },
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
