import React, {
  createRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { times } from 'lodash';
import moment, { Moment } from 'moment';
import { nanoid } from 'nanoid';

import { IGridDayProps, IGridColumn, IEventRect, IEvent } from './SharedTypes';

/**
 * Week Grid view day component
 */
const WeekGridDay = (props: IGridDayProps) => {
  const { day, columns } = props;
  const [gridColumns, setGridColumns] = useState<IGridColumn[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const gridWrapper = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const refMap = new Map<string, RefObject<unknown>>();
  const refDateFormat = 'yyyyMMDDHHmm'; // the moment.js format to use for formatting to find refs

  /**
   * Gets the position of the element in the grid inside of the absolute container
   * @param element to find the position for
   * @returns IPosition the position of the element
   */
  const getElementRect = (
    startElement: HTMLElement | null,
    endElement?: HTMLElement | null
  ): IEventRect => {
    return {
      top: startElement?.offsetTop,
      left: startElement?.offsetLeft,
      width: startElement?.clientWidth,
      height: endElement
        ? endElement?.offsetTop +
          endElement?.clientHeight -
          (startElement?.offsetTop || 0)
        : startElement?.clientHeight,
    } as IEventRect;
  };

  /**
   * Converts events dates and filters invalid ones
   * @param events
   * @param colId
   * @returns
   */
  const convertEvents = (events: IEvent[], colId: string) => {
    return events
      .map(
        (e: IEvent) =>
          ({
            ...e,
            startDate: moment(e.startDate).toDate(),
            endDate: moment(e.endDate).toDate(),
            columnId: colId,
          } as IEvent)
      )
      .filter((e: IEvent) => {
        const startMoment = moment(e.startDate);
        return (
          startMoment.isValid() &&
          moment(e.endDate).isValid() &&
          startMoment.isBetween(
            moment(day).startOf('day'),
            moment(day).endOf('day')
          )
        );
      });
  };

  useEffect(() => {
    if (columns?.length && !gridColumns?.length) {
      // process columns
      const cols: IGridColumn[] =
        columns?.map((col) => {
          const colId = nanoid(6); // create unique id for the column
          return {
            ...col,
            id: colId,
            events: convertEvents(col.events, colId),
          } as IGridColumn;
        }) || [];

      setGridColumns(cols);
    }
  }, []);

  useEffect(() => {
    const evs: IEvent[] = createEvents(gridColumns);
    setEvents(evs);
  }, [gridColumns]);

  useEffect(() => {
    if (events.length) {
      const sartDates: Moment[] = events.map((e: IEvent) =>
        moment(e.startDate)
      );
      // if earliest not found, scroll to 8 am
      const earliest = sartDates?.length
        ? moment.min(sartDates)
        : moment(day).hours(8).minutes(0);

      const firstEvent: RefObject<HTMLDivElement> = refMap.get(
        earliest.format(refDateFormat)
      ) as RefObject<HTMLDivElement>;

      const parentOffsetTop =
        gridWrapper?.current?.getBoundingClientRect().top || 0;
      const firstEventOffsetTop =
        firstEvent?.current?.getBoundingClientRect().top || 0;

      const firstElementTop: number = firstEventOffsetTop - parentOffsetTop;

      // scroll the grid to first event
      gridWrapper?.current?.scrollTo({
        top: firstElementTop,
      });
    }
  }, [events]);

  // display hours
  const dayGrid = times(24, (i) => {
    const h = moment(day).hour(i).minutes(0);
    const m = moment(day).hour(i).minutes(30); // TODO: use a step property instead of 30 minutes

    const hourRef: RefObject<HTMLDivElement> = createRef();
    refMap.set(h.format(refDateFormat), hourRef);
    const halfHourRef: RefObject<HTMLDivElement> = createRef();
    refMap.set(m.format(refDateFormat), halfHourRef);

    return (
      <div className="day-grid-row">
        <div
          key={`hour-cell-${i}`}
          className="day-grid-cell day-grid-gutter day-grid-hour"
        >
          <div ref={hourRef}>{h.format('H:mm')}</div>
          <div ref={halfHourRef}>{m.format('H:mm')}</div>
        </div>
        {gridColumns?.map((c: IGridColumn, i: number) => {
          const hourCellRef: RefObject<HTMLDivElement> = createRef();
          refMap.set(`${h.format(refDateFormat)}-${c.id}`, hourCellRef);
          const halfHourCellRef: RefObject<HTMLDivElement> = createRef();
          refMap.set(`${m.format(refDateFormat)}-${c.id}`, halfHourCellRef);
          return (
            <div className="day-grid-cell day-grid-col" key={`column-${i}`}>
              <div
                className="day-grid-half-hour"
                key={`column-hour-${i}`}
                ref={hourCellRef}
              ></div>
              <div
                className="day-grid-half-hour"
                key={`column-half-hour-${i}`}
                ref={halfHourCellRef}
              ></div>
            </div>
          );
        })}
      </div>
    );
  });

  /**
   * Creates IEvent objects to use for rendering events on the grid
   * @param cols
   * @returns
   */
  const createEvents = (cols: IGridColumn[]): IEvent[] => {
    const eventList: Array<IEvent> = new Array<IEvent>();
    if (!cols.length) {
      return [];
    }
    cols?.forEach((column) => {
      column.events.forEach((e: IEvent) => {
        eventList.push({
          ...e,
          startDate: moment(e.startDate).toDate(),
          endDate: moment(e.endDate).toDate(),
        } as IEvent);
      });
    });

    return eventList.map((e: IEvent) => {
      const gridElement = refMap.get(
        `${moment(e.startDate).format(refDateFormat)}-${e.columnId}`
      );
      const endGridElement = refMap.get(
        `${moment(e.endDate)
          .subtract(30, 'minutes') // TODO: use a step property instead of 30 minutes
          .format(refDateFormat)}-${e.columnId}`
      );

      return {
        ...e,
        rect: getElementRect(
          gridElement?.current as HTMLElement,
          endGridElement?.current as HTMLElement
        ),
      } as IEvent;
    });
  };

  return (
    <div className="day-wrapper">
      <div className="day-grid-row">
        <div>
          <div className="day-grid-cell day-grid-gutter">
            <p className="day-weekday" data-testid="weekday">
              {moment(day).format('dddd')}
            </p>
            <p className="day-date">{moment(day).format('MMMM-DD')}</p>
          </div>
        </div>
        {columns?.map((c: IGridColumn, i: number) => (
          <div key={`column-${i}`} className="day-grid-cell day-grid-col">
            {c.label}
          </div>
        ))}
      </div>
      <div className="day-container" ref={gridWrapper}>
        <div className="grid-container-events">
          {/* Events */}
          <div className="grid-events-wrapper">
            <div className="grid-events">
              <div>
                {events.map((e: IEvent, i: number) => (
                  <div
                    key={`event-${i}`}
                    className="calendar-event"
                    style={{
                      backgroundColor: e.backgroundColor || 'white',
                      position: 'absolute',
                      top: `${e.rect.top}px`,
                      left: `${e.rect.left}px`,
                      width: `calc(${e.rect.width}px - 20px)`,
                      height: `${e.rect.height}px`,
                    }}
                  >
                    <div className="calendar-event-body">
                      <span className={`${e.labelClass}`}>{e.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref={grid}>{dayGrid}</div>
        </div>
      </div>
    </div>
  );
};

export default WeekGridDay;
