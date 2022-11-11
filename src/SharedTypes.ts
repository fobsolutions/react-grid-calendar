import { ReactElement } from 'react';

export interface IViewProps {
  selectedDate: Date;
  locale: string;
  columns?: Array<IGridColumn>;
  events?: Array<IEvent>;
  eventRenderer?: (event: IEvent) => ReactElement;
  eventOnClick?: (eventId: string) => void;
  cellOnClick?: (columnId: string, date: string) => void;
  columnHeaderRenderer?: (column: IGridColumn) => ReactElement;
  editMode?: boolean;
  gutterClassName?: string;
}

// TODO: merge with above ^ IViewProps
export interface IGridDayProps {
  day: Date;
  columns?: Array<IGridColumn>;
  locale: string;
  eventRenderer?: (event: IEvent) => ReactElement;
  eventOnClick?: (eventId: string) => void;
  cellOnClick?: (columnId: string, date: string) => void;
  columnHeaderRenderer?: (column: IGridColumn) => ReactElement;
  editMode?: boolean;
  weekMode?: boolean;
  gutterClassName?: string;
}

export interface IEvent {
  eventId: string;
  startDate: Date;
  endDate: Date;
  backgroundColor: string;
  label: string;
  body: string;
  color: string;
  labelClass: string;
  columnId: string;
  rect: IEventRect;
  renderer: (event: IEvent) => ReactElement;
  onClick: (eventId: string) => void;
  duration: number; // duration in minutes
}

export interface IGridColumn {
  label: string;
  events: Array<IEvent>;
  id?: string;
  date?: Date;
}

export interface IEventRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ITimeGap {
  from: Date;
  to: Date;
}
