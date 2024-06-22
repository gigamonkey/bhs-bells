import { isSchoolDay } from '../src';

test('thinks every day is a school day', () => {
  const result = isSchoolDay(new Date());
  expect(result).toBe(true);
});
