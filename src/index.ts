import './monkeypatch-date.ts';
import { calendars, YearData, PeriodData, HolidayData } from './calendars.ts';
import { Temporal } from 'temporal-polyfill';

const TZ = 'America/Los_Angeles';

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


type Schedules = {
  NORMAL: Period[];
  LATE_START: Period[];
  [key: string]: Period[];
};

export type Period = {
  name: string;
  start: Temporal.PlainTime;
  end: Temporal.PlainTime;
  teachersOnly: boolean;
  nonSchool: boolean;
};

export type Holiday = {
  name: String;
  start: Temporal.PlainDate;
  end: Temporal.PlainDate;
};

// Maybe want to support classic Date? and timestamps? Not sure.
type DateDesignator = string | Temporal.PlainDate;

const period = (data: PeriodData): Period => {
  return {
    name: data.name,
    start: time(data.start),
    end: time(data.end),
    teachersOnly: data?.teachers ?? false,
    nonSchool: data?.nonSchool ?? false,
  };
};

const time = (s: string): Temporal.PlainTime => {
  const [ h, m ] = s.split(':').map(Number);
  return new Temporal.PlainTime(h, m);
};

const holiday = (d: HolidayData): Holiday => {
  return {
    name: d.name,
    start: Temporal.PlainDate.from(d.start),
    end: Temporal.PlainDate.from(d.end ?? d.start),
  };
};

const asDate = (date: DateDesignator): Temporal.PlainDate => {
  return typeof date === 'string' ? Temporal.PlainDate.from(date) : date;
}


export class Year {

  year: string;
  firstDayTeachers: Temporal.PlainDate;
  firstDay: Temporal.PlainDate;
  lastDay: Temporal.PlainDate;

  schedules: Schedules;

  holidays: Holiday[];

  static current() {
    // the summer should be the next year.
    return new Year(calendars[0]);
  }

  constructor(data: YearData) {
    this.year = data.year;
    this.firstDayTeachers = Temporal.PlainDate.from(data.firstDayTeachers);
    this.firstDay = Temporal.PlainDate.from(data.firstDay);
    this.lastDay = Temporal.PlainDate.from(data.lastDay);
    this.schedules = Object.fromEntries(
      Object.entries(data.schedules).map(([label, data]) => {
        return [ label, data.map((d: PeriodData) => period(d)) ];
      })
    ) as Schedules;

    this.holidays = data.holidays.map(holiday);
  }

  isSchoolDay(date: Date): boolean {
    return true;
  }

  scheduleFor(date: DateDesignator): Period[] {
    const d = asDate(date)
    const s = d.toString();
    if (s in this.schedules) {
      return this.schedules[s];
    } else {
      return this.schedules[d.dayOfWeek === 1 ? 'LATE_START' : 'NORMAL'];
    }
  }

  startOfYear(): Temporal.ZonedDateTime {
    // FIXME: deal with teacher start of year
    const plainTime = this.scheduleFor(this.firstDay)[0].start;
    return this.firstDay.toZonedDateTime({ timeZone: TZ, plainTime })
  }
}

export { calendars };
