import { calendars, Year, Period } from './calendars.ts';
import { Temporal } from 'temporal-polyfill';

console.log(Temporal.Now.zonedDateTimeISO().toString());

export const isSchoolDay = (date: Date) => true;

export { calendars, Year, Period };
