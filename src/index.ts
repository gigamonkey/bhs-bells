import './monkeypatch-date.ts';
import { calendars, YearData, PeriodData } from './calendars.ts';
import { Temporal } from 'temporal-polyfill';

/*
 * Goal: make a Year class that is wrapped around the Year data from
 * calendars.ts but which provides methods that take times as Date, timestamp,
 * ISO-8601 strings, or Temporal objects when dates and times need to be
 * specified and returns Temporal objects (?) when dates, times, and durations
 * need to be returned.
 */


// Temporal.ZonedDateTime - for actual times when things happen, e.g. start of
// year, start of day, end of day, etc.

// Temporal.Instant - an instant in time without reference to a timezone

// Temporal.PlainDate - a date without reference to a timezone
// Temporal.PlainTime - a time without reference to a date or timezone
// Temporal.PlainDateTime - a date and time without reference to a timezone

// Methods that take a date/time argument should accept ZonedDateTimes, or
// PlainDate/PlainTime/PlainDateTime or strings that Temporal can parse (e.g.
// Temporal.PlainDate.from('2022-02-28')) or a javascript Date or a raw
// millisecond timestamp.


export class Year {

  static current() {
    // FIXME: use current time to figure out when the "current" year is. During
    // the summer should be the next year.
    return new Year(calendars[0]);
  }

  data: YearData;

  constructor(data: YearData) {
    this.data = data;
  }

  year() {
    return this.data.year;
  }

  isSchoolDay(date: Date): boolean {
    return true;
  }

}

export { calendars };
