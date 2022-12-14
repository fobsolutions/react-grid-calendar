import React, {
  createRef,
  RefObject,
  UIEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { times, flatten, head, last, range, sortBy } from 'lodash';
import moment, { Moment } from 'moment';
import { nanoid } from 'nanoid';

import {
  IGridDayProps,
  IGridColumn,
  IEventRect,
  IEvent,
  ITimeGap,
} from './SharedTypes';
import { checkForEvents, isCollapsed } from './util';

/**
 * Week Grid view day component
 */
const WeekGridDay = (props: IGridDayProps) => {
  const {
    day,
    columns,
    eventRenderer,
    eventOnClick,
    cellOnClick,
    editMode,
    columnHeaderRenderer,
    weekMode,
    gutterClassName,
  } = props;
  const [gridColumns, setGridColumns] = useState<IGridColumn[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [gaps, setGaps] = useState<ITimeGap[]>([]);
  const gridWrapper = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const gridHeadrCols = useRef<HTMLDivElement>(null);
  const dayGridCols = useRef<HTMLDivElement>(null);
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
    const convertedEvents = events.map(
      (e: IEvent) =>
        ({
          ...e,
          startDate: moment(e.startDate).toDate(),
          endDate: moment(e.endDate).toDate(),
          columnId: colId,
          renderer: eventRenderer,
          onClick: eventOnClick,
        } as IEvent)
    );

    // only filter by day if it's not in the week mode
    return weekMode
      ? convertedEvents
      : convertedEvents.filter((e: IEvent) => {
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

  /**
   * Creates positions the events according to their hour/column cell
   * @param cols
   * @returns a list of IEvent-s with rect param
   */
  const positionEvents = (eventList: IEvent[]): IEvent[] => {
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
    const gaps: ITimeGap[] = [];
    const flatEvents = flatten(
      gridColumns.map((col: IGridColumn) => col.events)
    );
    const sortedEvents = sortBy(flatEvents, ['startDate']);

    // loop through hours and see if there are some events that end or start in that hour
    // start with earliest event
    const earliestHour = moment(head(sortedEvents)?.startDate).hour();
    const latestHour = moment(last(sortedEvents)?.endDate).hour();

    // see if event starts or ends in the range hour + 1
    range(earliestHour, latestHour).forEach((hour: number) => {
      // using evt.startDate simply to create a correct date
      const hourStart = moment(head(sortedEvents)?.startDate)
        .clone()
        .hours(hour);
      const hourEnd = hourStart.clone().hours(hour + 1);

      if (!checkForEvents(sortedEvents, hourStart, hourEnd)) {
        gaps.push({
          from: hourStart.toDate(),
          to: hourEnd.toDate(),
        });
      }
    });

    setGaps(gaps);
  }, [gridColumns]);

  useEffect(() => {
    const flatEvents = flatten(
      gridColumns.map((col: IGridColumn) => col.events)
    );
    const evs: IEvent[] = positionEvents(flatEvents);

    setEvents(evs);
  }, [gaps]);

  useEffect(() => {
    if (events.length) {
      const startDates: Moment[] = events.map((e: IEvent) =>
        weekMode
          ? moment()
              .hour(moment(e.startDate).hour())
              .minutes(moment(e.startDate).minutes())
              .seconds(0)
          : moment(e.startDate)
      );

      // if earliest not found, scroll to 8 am
      const earliest = startDates?.length
        ? moment.min(startDates)
        : moment(day).hours(8).minutes(0);

      const firstEvent: RefObject<HTMLDivElement> = refMap.get(
        earliest.format(refDateFormat)
      ) as RefObject<HTMLDivElement>;

      const parentOffsetTop =
        gridWrapper?.current?.getBoundingClientRect().top || 0;
      const firstEventOffsetTop =
        firstEvent?.current?.getBoundingClientRect().top || 0;

      const firstElementTop: number = firstEventOffsetTop - parentOffsetTop;

      if (firstElementTop !== 0) {
        gridWrapper?.current?.scrollTo({
          top: firstElementTop,
        });
      }
    }
  }, [events]);

  const scrollGrid = (event: UIEvent) => {
    dayGridCols?.current?.scrollTo({
      left: (event.target as Element).scrollLeft,
    });
  };

  const scrollHeader = (event: UIEvent) => {
    gridHeadrCols?.current?.scrollTo({
      left: (event.target as Element).scrollLeft,
    });
  };

  const dayGrid = () => {
    const hours = times(24, (i) => {
      const h = moment(day).hour(i).minutes(0);
      const m = moment(day).hour(i).minutes(30); // TODO: use a step property instead of 30 minutes

      const hourRef: RefObject<HTMLDivElement> = createRef();
      refMap.set(h.format(refDateFormat), hourRef);
      const halfHourRef: RefObject<HTMLDivElement> = createRef();
      refMap.set(m.format(refDateFormat), halfHourRef);

      return isCollapsed(h, gaps) && !editMode ? ( // if the hour needs to be collapsed
        <div
          key={`hour-row-${i}`}
          className={`${
            !isCollapsed(h.subtract(1, 'hour'), gaps) ? 'collapsed' : ''
          }`}
        >
          <div></div>
        </div>
      ) : (
        <div key={`hour-row-${i}`} className="day-grid-row">
          <div
            key={`hour-cell-${i}`}
            className={`${
              gutterClassName || ''
            } day-grid-cell day-grid-gutter day-grid-hour`}
          >
            <div ref={hourRef}>{h.format('H:mm')}</div>
            <div ref={halfHourRef}>{m.format('H:mm')}</div>
          </div>
        </div>
      );
    });
    return (
      <div className="day-grid">
        <div className="day-grid-hours">{hours}</div>
        <div
          className="day-grid-cols scroll-panel"
          ref={dayGridCols}
          onScroll={scrollHeader}
        >
          <div className="grid-events-wrapper">
            <div className="grid-events">
              <div>
                {events.map((e: IEvent, i: number) => (
                  <div
                    onClick={() => {
                      e.onClick ? e.onClick(e.eventId) : null;
                    }}
                    role="button"
                    key={`event-${i}`}
                    className="calendar-event"
                    style={{
                      backgroundColor: e.backgroundColor || 'transparent',
                      position: 'absolute',
                      top: `${e.rect.top}px`,
                      left: `${e.rect.left}px`,
                      width: `calc(${e.rect.width}px - 20px)`,
                      height: `${e.rect.height}px`,
                    }}
                  >
                    {e.renderer ? (
                      e.renderer(e)
                    ) : (
                      <div className="calendar-event-body">
                        <span className={`${e.labelClass}`}>{e.label}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {times(24, (indx) => {
            // create hours and minutes
            const h = moment(day).hour(indx).minutes(0);
            const m = moment(day).hour(indx).minutes(30); // TODO: use a step property instead of 30 minutes

            return isCollapsed(h, gaps) && !editMode ? ( // check if hour needs to be collapsed
              <div
                key={`collapsed-row-${indx}`}
                className={`${
                  !isCollapsed(h.subtract(1, 'hour'), gaps) ? 'collapsed' : ''
                }`}
              >
                <div></div>
              </div>
            ) : (
              <div className="day-grid" key={`grid-row-${indx}`}>
                {gridColumns?.map((c: IGridColumn, i: number) => {
                  const cellHour = c.date ? moment(c.date).hour(h.hour()) : h;
                  const cellHalfHour = c.date
                    ? moment(c.date).hour(m.hour()).minute(m.minute())
                    : m;

                  const hourCellRef: RefObject<HTMLDivElement> = createRef();
                  refMap.set(
                    `${cellHour.format(refDateFormat)}-${c.id}`,
                    hourCellRef
                  );
                  const halfHourCellRef: RefObject<HTMLDivElement> =
                    createRef();
                  refMap.set(
                    `${cellHalfHour.format(refDateFormat)}-${c.id}`,
                    halfHourCellRef
                  );
                  return (
                    <div
                      className="day-grid-cell day-grid-col"
                      key={`column-${i}`}
                    >
                      <div
                        className="day-grid-half-hour"
                        key={`column-hour-${i}`}
                        ref={hourCellRef}
                        onClick={() => {
                          if (cellOnClick) {
                            cellOnClick(c.columnData, cellHour.toDate());
                          }
                        }}
                      ></div>
                      <div
                        className="day-grid-half-hour"
                        key={`column-half-hour-${i}`}
                        ref={halfHourCellRef}
                        onClick={() => {
                          if (cellOnClick) {
                            cellOnClick(c.columnData, cellHalfHour.toDate());
                          }
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="day-wrapper">
      <div className="day-grid-row">
        <div>
          <div
            className={`${gutterClassName || ''} day-grid-cell day-grid-gutter`}
          >
            {!weekMode && (
              <>
                <p className="day-weekday" data-testid="weekday">
                  {moment(day).format('dddd')}
                </p>
                <p className="day-date" data-testid="cornerDate">
                  {moment(day).format('MMMM-DD')}
                </p>
              </>
            )}
          </div>
        </div>
        <div
          className="grid-header-cols scroll-panel"
          ref={gridHeadrCols}
          onScroll={scrollGrid}
        >
          {columns?.map((c: IGridColumn, i: number) => (
            <div key={`column-${i}`} className="day-grid-cell day-grid-col">
              {columnHeaderRenderer ? columnHeaderRenderer(c) : c.label}
            </div>
          ))}
        </div>
      </div>
      <div className="day-container scroll-panel" ref={gridWrapper}>
        <div className="grid-container-events">
          <div ref={grid}>{dayGrid()}</div>
        </div>
      </div>
    </div>
  );
};

export default WeekGridDay;
