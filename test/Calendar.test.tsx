import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GridCalendar } from '../src';

describe('GridCalendar', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    render(<GridCalendar view="weekGrid" />);
  });

  it('renders with correct locale for week grid view', () => {
    const calendar = render(<GridCalendar view="weekGrid" locale="es" />);
    const weekdays = calendar.getAllByTestId('weekday');
    expect(weekdays[0]).toHaveTextContent('lunes');
  });
});
