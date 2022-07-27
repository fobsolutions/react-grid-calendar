export interface IViewProps {
  selectedDate: Date;
  locale: string;
  columns?: Array<IGridColumn>;
}

// TODO: merge with above ^ IViewProps
export interface IGridDayProps {
  day: Date;
  columns?: Array<IGridColumn>;
  locale: string;
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
