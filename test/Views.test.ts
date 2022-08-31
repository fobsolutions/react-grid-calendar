import { EViewType, getViewFromString } from './../src/Views';

describe('Views', () => {
  it.each([
    { viewStr: '', expectedView: 'week' },
    { viewStr: 'week', expectedView: 'week' },
    { viewStr: 'weekGrid', expectedView: 'weekgrid' },
    { viewStr: 'weekgrid', expectedView: 'weekgrid' },
    { viewStr: 'WEEKGRID', expectedView: 'weekgrid' },
    { viewStr: 'month', expectedView: 'month' },
    { viewStr: 'MOnth', expectedView: 'month' },
  ])('gets the correct view from string', ({ viewStr, expectedView }) => {
    const view: EViewType = getViewFromString(viewStr);
    expect(view).toEqual(expectedView);
  });
});
