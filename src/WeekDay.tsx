import React from 'react';
import { IDayProps } from './SharedTypes';
import './Day.css';
import moment from 'moment';

const WeekDay = (props: IDayProps) => {
  const { day } = props;
  console.log(day);
  return (
    <div className="day">
      <div>
        <div className="day-col">
          <p className="day-weekday">{moment(day).format('dddd')}</p>
          <p className="day-date">{moment(day).format('MMMM-DD')}</p>
        </div>
        <div>8:00</div>
        <div>8:00</div>
        <div>8:00</div>
        <div>8:00</div>
        <div>8:00</div>
      </div>
      <div>Court 1</div>
      <div>Court 2</div>
      <div>Court 3</div>
      <div>Court 4</div>
      <div>Court 5</div>
    </div>
  );
};

export default WeekDay;
