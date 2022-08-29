import { ReactElement } from 'react';

export interface IViewProps {
  selectedDate: Date;
  locale: string;
  columns?: Array<IGridColumn>;
  eventRenderer?: (event: IEvent) => ReactElement;
  eventOnClick?: (eventId: string) => void;
  columnHeaderRenderer?: (column: IGridColumn) => ReactElement;
  editMode: boolean;
}

// TODO: merge with above ^ IViewProps
export interface IGridDayProps {
  day: Date;
  columns?: Array<IGridColumn>;
  locale: string;
  eventRenderer?: (event: IEvent) => ReactElement;
  eventOnClick?: (eventId: string) => void;
  columnHeaderRenderer?: (column: IGridColumn) => ReactElement;
  editMode?: boolean;
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
  id?: string;
  label: string;
  events: Array<IEvent>;
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
