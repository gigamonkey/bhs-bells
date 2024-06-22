import { Year } from '../src';

test('thinks every day is a school day', () => {
  const result = Year.current().isSchoolDay(new Date());
  expect(result).toBe(true);
});

test('knows the year', () => {
  expect(Year.current().year()).toBe("2024-2025");
});
