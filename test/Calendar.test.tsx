import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as GridCalendar } from '../stories/GridCalendar.stories';

describe('GridCalendar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GridCalendar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
