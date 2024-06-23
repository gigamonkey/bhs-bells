import { Temporal } from 'temporal-polyfill';
import { Year } from '../src';

test('first day is a school day', () => {
  const y = Year.current();
  expect(y.isSchoolDay(y.firstDay)).toBe(true);
});

test('last day is a school day', () => {
  const y = Year.current();
  expect(y.isSchoolDay(y.lastDay)).toBe(true);
});

test('first saturday not a school day', () => {
  const y = Year.current();
  expect(y.isSchoolDay(y.firstDay.add({ days: 4 }))).toBe(false);
});

test('christmas is not a school day', () => {
  const y = Year.current();
  expect(y.isSchoolDay('2024-12-25')).toBe(false);
});

test('knows the year', () => {
  expect(Year.current().year).toBe('2024-2025');
});

test('day of week of first day', () => {
  expect(Year.current().firstDay.dayOfWeek).toBe(3);
});

test('can get first day schedule', () => {
  const y = Year.current();
  expect(y.scheduleFor(y.firstDay)).not.toBeNull();
});

test('180 school days in whole year', () => {
  const y = Year.current();
  expect(y.daysLeft(y.firstDay)).toBe(180);
});

test('180 school days from before year', () => {
  const y = Year.current();
  expect(y.daysLeft(y.firstDay.subtract({ days: 1 }))).toBe(180);
});

test('1 school day on lastDay', () => {
  const y = Year.current();
  expect(y.daysLeft(y.lastDay)).toBe(1);
});

test('0 school days after year', () => {
  const y = Year.current();
  expect(y.daysLeft(y.lastDay.add({ days: 1 }))).toBe(0);
});
