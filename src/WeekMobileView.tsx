import React from 'react';
import { IViewProps } from './SharedTypes';

const WeekMobileView = (props: IViewProps) => {
  const { events, mobileEventRenderer } = props;
  return (
    <div className="week-sm-view">
      {events?.map((e) => {
        return (
          <div key={e.date}>
            <div className="mobile-header">
              <div className="mobile-header-divider">
                <hr />
              </div>
              <div className="mobile-header-title">{e.date}</div>
              <div className="mobile-header-divider">
                <hr />
              </div>
            </div>
            {e.events.map((event) => {
              return (
                <div key={event.eventId} className="calendar-event">
                  {mobileEventRenderer ? (
                    mobileEventRenderer(event)
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
