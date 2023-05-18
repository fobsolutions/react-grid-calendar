import React, { ReactElement, useState } from 'react';
import { IDayEvents, IEvent } from './SharedTypes';
import moment from 'moment';

export interface IMobileDayRendererProps {
  eventsDay: IDayEvents;
  mobileEventRenderer?: (event: IEvent, date?: string) => ReactElement;
  mobileDayHeaderRenderer?: (
    dayEvents: IDayEvents,
    toggleDisplay?: () => void,
    isShowing?: boolean
  ) => ReactElement;
  eventOnClick?: (event: IEvent) => void;
  hidden?: boolean; // this is only used for initial rendering
  isCollapsable?: boolean;
}

const MobileDayRenderer = (props: IMobileDayRendererProps) => {
  const {
    eventsDay,
    mobileEventRenderer,
    mobileDayHeaderRenderer,
    eventOnClick,
    hidden,
    isCollapsable = true,
  } = props;

  const [show, setShow] = useState<boolean>(isCollapsable ? !hidden : true);

  const toggleDisplay = () => {
    isCollapsable && setShow(!show);
  };

  return (
    <>
      {mobileDayHeaderRenderer ? (
        mobileDayHeaderRenderer(eventsDay, toggleDisplay, show)
      ) : (
        <div className="mobile-header">
          <div className="mobile-header-divider">
            <hr />
          </div>
          <div className="mobile-header-title">
            <a
              role="button"
              onClick={() => {
                toggleDisplay && isCollapsable && toggleDisplay();
              }}
            >
              {moment(eventsDay.date).format('dddd D.MM')}
            </a>
          </div>
          <div className="mobile-header-divider">
            <hr />
          </div>
        </div>
      )}
      {show ? (
        eventsDay.events.map((event) => {
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
                mobileEventRenderer(event, eventsDay.date)
              ) : (
                <div className="calendar-event-body">
                  <span className={`${event.labelClass}`}>{event.label}</span>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default MobileDayRenderer;
