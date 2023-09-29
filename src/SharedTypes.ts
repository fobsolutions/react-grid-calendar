import { ReactElement } from 'react';

export interface IViewProps {
  selectedDate: Date;
  locale: string;
  columns?: Array<IGridColumn>;
  events?: Array<IDayEvents>;
  eventRenderer?: (event: IEvent) => ReactElement;
  mobileEventRenderer?: (event: IEvent, date?: string) => ReactElement;
  eventOnClick?: (event: IEvent) => void;
  cellOnClick?: (columnData: unknown, date: Date) => void;
  columnHeaderRenderer?: (column: IGridColumn) => ReactElement;
  mobileDayHeaderRenderer?: (
    dayEvents: IDayEvents,
    toggleDisplay?: () => void,
    isShowing?: boolean
  ) => ReactElement;
  editMode?: boolean;
  hideUnavailableTime?: boolean;
  gutterClassName?: string;
  scrollToEarliest?: boolean;
  scrollToToday?: boolean;
  collapseDays?: boolean;
  collapseAll?: boolean; // simply toggle the collapse
  collapseToggle?: (collapsed: boolean) => ReactElement;
  mobileDayCollapsable?: boolean;
}

// TODO: merge with above ^ IViewProps
export interface IGridDayProps {
  day: Date;
  columns?: Array<IGridColumn>;
  locale: string;
  eventRenderer?: (event: IEvent) => ReactElement;
  eventOnClick?: (event: IEvent) => void;
  cellOnClick?: (columnData: unknown, date: Date) => void;
  columnHeaderRenderer?: (column: IGridColumn) => ReactElement;
  mobileDayHeaderRenderer?: (
    dayEvents: IDayEvents,
    toggleDisplay?: () => void
  ) => ReactElement;
  editMode?: boolean;
  hideUnavailableTime?: boolean;
  weekMode?: boolean;
  gutterClassName?: string;
  scrollToEarliest?: boolean;
  classNames?: string;
  collapseDays?: boolean;
  collapseAll?: boolean; // simply toggle the collapse
  collapseToggle?: (collapsed: boolean) => ReactElement;
}

export interface IEvent {
  eventId: string;
  startDate: Date;
  endDate: Date;
  backgroundColor?: string;
  label?: string;
  body?: string;
  color?: string;
  labelClass?: string;
  columnId?: string;
  rect?: IEventRect;
  renderer?: (event: IEvent) => ReactElement;
  onClick?: (event: IEvent) => void;
  duration?: number; // duration in minutes
  overlapingEvents?: number; // how many evetnts are overlapping
  startTime?: string;
  endTime?: string;
}

export interface IGridColumn {
  label: string;
  events: Array<IEvent>;
  columnData?: unknown; // any object to be associated with the column
  id?: string;
  date?: Date;
  availability?: Array<IAvailabilityTime>;
}

export interface IAvailabilityTime {
  weekDay: number;
  startTime: string;
  endTime: string;
}

export interface IEventRect {
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface ITimeGap {
  from: Date;
  to: Date;
}

export interface IDayEvents {
  date: string;
  events: Array<IEvent>;
}
