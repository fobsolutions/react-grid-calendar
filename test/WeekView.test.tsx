import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';
import WeekView from '../src/WeekView';
import { columnsMock } from '../mocks/Columns';

describe('WeekView', () => {
  afterEach(cleanup);
  it('renders without crashing with columns', () => {
    Element.prototype.scrollTo = () => {};
    render(
      <WeekView
        selectedDate={moment().toDate()}
        locale="en"
        editMode={false}
        columns={columnsMock}
      />
    );
  });

  it('renders without crashing with events', () => {
    render(
      <WeekView
        selectedDate={moment().toDate()}
        locale="en"
        editMode={false}
        events={[{ date: '2023-02-08', events: columnsMock[0].events }]}
      />
    );
  });
});
