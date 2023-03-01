import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { IViewProps } from './SharedTypes';

const WeekMobileView = (props: IViewProps) => {
  const {
    events,
    mobileEventRenderer,
    mobileDayHeaderRenderer,
    eventOnClick,
    scrollToToday,
  } = props;

  const todayElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToToday) {
      todayElement?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [todayElement, events]);

  return (
    <div className="week-sm-view">
      {events?.map((e) => {
        return (
          <div
            key={e.date}
            ref={moment(e.date).isSame(new Date(), 'day') ? todayElement : null}
          >
            {mobileDayHeaderRenderer ? (
              mobileDayHeaderRenderer(e)
            ) : (
              <div className="mobile-header">
                <div className="mobile-header-divider">
                  <hr />
                </div>
                <div className="mobile-header-title">{e.date}</div>
                <div className="mobile-header-divider">
                  <hr />
                </div>
              </div>
            )}
            {e.events.map((event) => {
              return (
                <div
                  key={event.eventId}
                  className="calendar-event"
                  onClick={() => {
                    eventOnClick ? eventOnClick(event) : null;
                  }}
                  role="button"
                >
                  {mobileEventRenderer ? (
                    mobileEventRenderer(event, e.date)
                  ) : (
                    <div className="calendar-event-body">
                      <span className={`${event.labelClass}`}>
                        {event.label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WeekMobileView;
