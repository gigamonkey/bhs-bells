import { Year } from '../src';

test('thinks every day is a school day', () => {
  const result = Year.current().isSchoolDay(new Date());
  expect(result).toBe(true);
});

test('knows the year', () => {
  expect(Year.current().year).toBe("2024-2025");
});

test('day of week of first day', () => {
  expect(Year.current().firstDay.dayOfWeek).toBe(3);
});

test('can get first day schedule', () => {
  const y = Year.current();
  console.log(y.scheduleFor(y.firstDay));
  expect(y.scheduleFor(y.firstDay)).not.toBeNull();
});
