import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { IViewProps } from './SharedTypes';
import MobileDayRenderer from './MobileDayRenderer';

const WeekMobileView = (props: IViewProps) => {
  const {
    events,
    mobileEventRenderer,
    mobileDayHeaderRenderer,
    eventOnClick,
    scrollToToday,
    mobileDayCollapsable,
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
            <MobileDayRenderer
              eventsDay={e}
              mobileEventRenderer={mobileEventRenderer}
              mobileDayHeaderRenderer={mobileDayHeaderRenderer}
              eventOnClick={eventOnClick}
              hidden={moment(e.date).isBefore(new Date(), 'day')}
              isCollapsable={mobileDayCollapsable}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WeekMobileView;
