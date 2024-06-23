import './monkeypatch-date.ts';
import { calendar, YearData, PeriodData, HolidayData } from './calendars.ts';
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

type Time = Temporal.Instant | Temporal.ZonedDateTime;

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
  const [h, m] = s.split(':').map(Number);
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
};

type ExtraPeriods = typeof NO_EXTRA;

type Day = keyof ExtraPeriods;

const NO_EXTRA = {
  monday: { zero: false, seventh: false, ext: false },
  tuesday: { zero: false, seventh: false, ext: false },
  wednesday: { zero: false, seventh: false, ext: false },
  thursday: { zero: false, seventh: false, ext: false },
  friday: { zero: false, seventh: false, ext: false },
};

const numToDay = (n: number): Day => {
  switch (n) {
    case 1:
      return 'monday';
    case 2:
      return 'tuesday';
    case 3:
      return 'wednesday';
    case 4:
      return 'thursday';
    case 5:
      return 'friday';
    default:
      throw new Error(`Illegal day number: ${n}`);
  }
};

type Opts = {
  teacher: boolean;
  extraPeriods: ExtraPeriods;
};

/*
 * A school year. Knows about when we have school and what the scedule is on
 * each day. Constructed with some options that control whether you care about
 * the teacher view and also any extra periods you care about.
 */
export class Year {
  year: string;
  firstDay: Temporal.PlainDate;
  lastDay: Temporal.PlainDate;
  extraPeriods: ExtraPeriods;

  schedules: Schedules;

  holidays: Holiday[];

  // For the moment we'll just keep things simple and only support one current calendar.
  static current(opts?: Opts): Year {
    return new Year(calendar, opts);
  }

  constructor(data: YearData, opts?: Opts) {
    this.year = data.year;

    if (opts?.teacher) {
      this.firstDay = Temporal.PlainDate.from(data.firstDayTeachers);
    } else {
      this.firstDay = Temporal.PlainDate.from(data.firstDay);
    }

    this.extraPeriods = opts?.extraPeriods ?? NO_EXTRA;

    this.lastDay = Temporal.PlainDate.from(data.lastDay);
    this.schedules = Object.fromEntries(
      Object.entries(data.schedules).map(([label, data]) => {
        return [label, data.map((d: PeriodData) => period(d))];
      }),
    ) as Schedules;

    this.holidays = data.holidays.map(holiday);
  }

  isSchoolDay(date: Date): boolean {
    return true;
  }

  scheduleFor(date: DateDesignator): Period[] {
    const d = asDate(date);
    const s = d.toString();
    const day = numToDay(d.dayOfWeek);

    const sched =
      s in this.schedules
        ? this.schedules[s]
        : this.schedules[day === 'monday' ? 'LATE_START' : 'NORMAL'];

    return sched.filter((p) => this.hasPeriod(p.name, day));
  }

  hasPeriod(name: string, day: Day): boolean {
    if (name === 'Period 0') {
      return this.extraPeriods[day].zero;
    } else if (name === 'Period 7') {
      return this.extraPeriods[day].seventh;
    } else if (name === 'Period Ext') {
      return this.extraPeriods[day].ext;
    } else {
      return true;
    }
  }

  startOfYear(): Temporal.ZonedDateTime {
    const plainTime = this.scheduleFor(this.firstDay)[0].start;
    return this.firstDay.toZonedDateTime({ timeZone: TZ, plainTime });
  }

  endOfYear(): Temporal.ZonedDateTime {
    const plainTime = this.scheduleFor(this.firstDay)[0].start;
    return this.lastDay.toZonedDateTime({ timeZone: TZ, plainTime });
  }

  contains(t: Time): boolean {
    if (t instanceof Temporal.Instant) {
      t = t.toZonedDateTimeISO(TZ);
    }
    const cmp = Temporal.ZonedDateTime.compare;
    const start = this.startOfYear();
    const end = this.endOfYear();
    return cmp(start, t) <= 0 && cmp(t, end) < 0;
  }
}
