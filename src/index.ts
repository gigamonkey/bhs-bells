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

const during = (holiday: Holiday, date: Temporal.PlainDate) => {
  const cmp = Temporal.PlainDate.compare;
  return cmp(holiday.start, date) <= 0 && cmp(date, holiday.end) <= 0;
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

const asZDT = (t: Time) => {
  return t instanceof Temporal.Instant ? t.toZonedDateTimeISO(TZ) : t;
};

const zdtCmp = Temporal.ZonedDateTime.compare;

const between = (t1: Time, t2: Time, t3: Time): boolean => {
  t1 = asZDT(t1);
  t2 = asZDT(t2);
  t3 = asZDT(t3);
  return zdtCmp(t1, t2) <= 0 && zdtCmp(t2, t3) < 0;
};

type Opts = {
  teacher: boolean;
  extraPeriods: ExtraPeriods;
};

class Interval {
  name: String;
  start: Temporal.ZonedDateTime;
  end: Temporal.ZonedDateTime;

  constructor(name: String, start: Temporal.ZonedDateTime, end: Temporal.ZonedDateTime) {
    this.name = name;
    this.start = start;
    this.end = end;
  }

  contains(t: Temporal.ZonedDateTime) {
    return between(this.start, t, this.end);
  }
}
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

  isSchoolDay(date: DateDesignator): boolean {
    date = asDate(date);

    return (
      Temporal.PlainDate.compare(this.firstDay, date) <= 0 &&
      Temporal.PlainDate.compare(date, this.lastDay) <= 0 &&
      date.dayOfWeek < 6 &&
      !this.isHoliday(date)
    );
  }

  isHoliday(date: DateDesignator): boolean {
    date = asDate(date);
    return this.holidays.some((h) => during(h, date));
  }

  scheduleFor(date: DateDesignator): Period[] {
    date = asDate(date);

    if (!this.isSchoolDay(date)) {
      return [];
    } else {
      const s = date.toString();
      const day = numToDay(date.dayOfWeek);

      const sched =
        s in this.schedules
          ? this.schedules[s]
          : this.schedules[day === 'monday' ? 'LATE_START' : 'NORMAL'];

      return sched.filter((p) => this.#hasPeriod(p.name, day));
    }
  }

  #hasPeriod(name: string, day: Day): boolean {
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

  startOfPeriodOn(period: String, date: DateDesignator): Temporal.ZonedDateTime | undefined {
    date = asDate(date);
    const p = this.scheduleFor(date)?.find((p) => p.name === period);
    if (typeof p !== 'undefined') {
      return date.toZonedDateTime({ timeZone: TZ, plainTime: p.start });
    }
  }

  endOfPeriodOn(period: String, date: DateDesignator): Temporal.ZonedDateTime | undefined {
    date = asDate(date);
    const p = this.scheduleFor(date)?.find((p) => p.name === period);
    if (typeof p !== 'undefined') {
      return date.toZonedDateTime({ timeZone: TZ, plainTime: p.start });
    }
  }

  /*
   * List of intervals that cover the whole given day.
   */
  intervals(date: DateDesignator): Interval[] {
    date = asDate(date);

    const zdt = (plainTime: Temporal.PlainTime) =>
      date.toZonedDateTime({ timeZone: TZ, plainTime });

    const sched = this.scheduleFor(date);
    const startOfSchoolDay = zdt(sched[0].start);
    const startOfDay = startOfSchoolDay.startOfDay();

    const r = [];
    r.push(new Interval('Before school', startOfDay, startOfSchoolDay));

    for (let i = 0; i < sched.length; i++) {
      const p = sched[i];
      const periodEnd = zdt(p.end);
      r.push(new Interval(p.name, zdt(p.start), periodEnd));
      if (i + 1 < sched.length) {
        const n = sched[i + 1];
        const nextStart = zdt(n.start);
        if (!periodEnd.equals(nextStart)) {
          r.push(new Interval(`Passing to ${n.name}`, periodEnd, nextStart));
        }
      } else {
        r.push(new Interval('After school', periodEnd, startOfDay.add({ days: 1 })));
      }
    }
    return r;
  }

  daysLeft(date: DateDesignator) {
    date = asDate(date);

    if (Temporal.PlainDate.compare(date, this.firstDay) < 0) {
      date = this.firstDay;
    }

    let count = 0;
    while (Temporal.PlainDate.compare(date, this.lastDay) <= 0) {
      if (this.isSchoolDay(date)) {
        count++;
      }
      date = date.add({ days: 1 });
    }
    return count;
  }

  schoolDays() {
    const r = [];
    let date = this.firstDay;
    while (Temporal.PlainDate.compare(date, this.lastDay) <= 0) {
      if (this.isSchoolDay(date)) {
        r.push(date);
      }
      date = date.add({ days: 1 });
    }
    return r;
  }
}
