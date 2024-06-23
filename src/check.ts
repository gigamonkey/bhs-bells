import { Temporal } from 'temporal-polyfill';
import { Year } from './index.ts';

const y = Year.current();

console.log(y.firstDay.toString());
console.log(y.startOfYear().toString());
console.log(y.startOfPeriodOn('Period 6', '2024-08-14')?.toString());

console.log(JSON.stringify(y.intervals('2024-08-14'), null, 2));

console.log(JSON.stringify(y.schoolDays(), null, 2));

console.log(y.untilStartOfYear(y.startOfYear().subtract({days: 10})).toString());
console.log(y.untilStartOfYear(y.startOfYear().subtract({days: 10})).total('day'));
console.log(y.untilStartOfYear(y.now()).toString());
