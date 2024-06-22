import { calendars, Year, Period } from './calendars.ts';

// type Period = {
//   name: string;
//   start: string;
//   end: string;
//   teachers?: boolean;
//   nonSchool?: boolean;
// };

// type Breaks = {
//   [key: string]: string;
// };

// type SchoolCalendar = {
//   year: string;
//   firstDayTeachers: string;
//   firstDay: string;
//   lastDay: string;
//   schedules: {
//     NORMAL: Period[];
//     LATE_START: Period[];
//     [key: string]: Period[];
//   };
//   holidays: string[];
//   breakNames: Breaks;
// };

// type Calendars = SchoolCalendar[];

// const cs: Calendars = calendars as Calendars;

// From ChatGPT

// type ScheduleItem = {
//   name: string;
//   start: string;
//   end: string;
//   teachers?: boolean;
// };

// type Schedule = {
//   [key: string]: ScheduleItem[];
// };

// type BreakNames = {
//   [key: string]: string;
// };

// type SchoolCalendar = {
//   year: string;
//   firstDayTeachers: string;
//   firstDay: string;
//   lastDay: string;
//   schedules: {
//     default: {
//       NORMAL: ScheduleItem[];
//       LATE_START: ScheduleItem[];
//     };
//     [key: string]: ScheduleItem[] | {
//       NORMAL: ScheduleItem[];
//       LATE_START: ScheduleItem[];
//     };
//   };
//   holidays: string[];
//   breakNames: BreakNames;
// };


// const cs: SchoolCalendar[] = [
//   {
//     "year": "2024-2025",
//     "firstDayTeachers": "2024-08-12",
//     "firstDay": "2024-08-14",
//     "lastDay": "2025-06-05",
//     "schedules": {
//         "NORMAL": [
//           { "name": "Period 0", "start": "7:26", "end": "8:24" },
//           { "name": "Period 1", "start": "8:30", "end": "9:28" },
//           { "name": "Period 2", "start": "9:34", "end": "10:37" },
//           { "name": "Period 3", "start": "10:43", "end": "11:41" },
//           { "name": "Lunch", "start": "11:41", "end": "12:21" },
//           { "name": "Period 4", "start": "12:27", "end": "13:25" },
//           { "name": "Period 5", "start": "13:31", "end": "14:29" },
//           { "name": "Period 6", "start": "14:35", "end": "15:33" },
//           { "name": "Period 7", "start": "15:39", "end": "16:37" },
//           { "name": "Period Ext", "start": "15:39", "end": "17:09" }
//         ],
//         "LATE_START": [
//           { "name": "Staff meeting", "start": "8:03", "end": "9:33", "teachers": true },
//           { "name": "Period 1", "start": "10:00", "end": "10:43" },
//           { "name": "Period 2", "start": "10:49", "end": "11:37" },
//           { "name": "Period 3", "start": "11:43", "end": "12:26" },
//           { "name": "Lunch", "start": "12:26", "end": "13:06" },
//           { "name": "Period 4", "start": "13:12", "end": "13:55" },
//           { "name": "Period 5", "start": "14:01", "end": "14:44" },
//           { "name": "Period 6", "start": "14:50", "end": "15:33" },
//           { "name": "Period 7", "start": "15:39", "end": "16:22" },
//           { "name": "Period Ext", "start": "15:39", "end": "17:09" }
//         ],
//       "2024-08-12": [{ "name": "PD", "start": "8:03", "end": "15:33", "teachers": true }],
//       "2024-08-13": [{ "name": "PD", "start": "8:30", "end": "15:33", "teachers": true }]
//     },
//     "holidays": [
//       "2024-09-02",
//       "2024-10-07",
//       "2024-10-14",
//       "2024-11-11",
//       "2024-11-25",
//       "2024-11-26",
//       "2024-11-27",
//       "2024-11-28",
//       "2024-11-29",
//       "2024-12-23",
//       "2024-12-24",
//       "2024-12-25",
//       "2024-12-26",
//       "2024-12-27",
//       "2024-12-30",
//       "2024-12-31",
//       "2025-01-01",
//       "2025-01-02",
//       "2025-01-03",
//       "2025-01-20",
//       "2025-01-27",
//       "2025-02-14",
//       "2025-02-17",
//       "2025-03-14",
//       "2025-03-31",
//       "2025-04-01",
//       "2025-04-02",
//       "2025-04-03",
//       "2025-04-04",
//       "2025-05-16",
//       "2025-05-26"
//     ],
//     "breakNames": {
//       "2024-11-25": "Thanksgiving break",
//       "2024-12-23": "Winter break",
//       "2025-02-14": "Presidents’ Day Weekend",
//       "2025-03-31": "Spring break"
//     }
//   },
//   {
//     "year": "2023-2024",
//     "firstDayTeachers": "2023-08-14",
//     "firstDay": "2023-08-16",
//     "lastDay": "2024-06-04",
//     "schedules": {
//         "NORMAL": [
//           { "name": "Period 0", "start": "7:26", "end": "8:24" },
//           { "name": "Period 1", "start": "8:30", "end": "9:28" },
//           { "name": "Period 2", "start": "9:34", "end": "10:37" },
//           { "name": "Period 3", "start": "10:43", "end": "11:41" },
//           { "name": "Lunch", "start": "11:41", "end": "12:21" },
//           { "name": "Period 4", "start": "12:27", "end": "13:25" },
//           { "name": "Period 5", "start": "13:31", "end": "14:29" },
//           { "name": "Period 6", "start": "14:35", "end": "15:33" },
//           { "name": "Period 7", "start": "15:39", "end": "16:37" },
//           { "name": "Period Ext", "start": "15:39", "end": "17:09" }
//         ],
//         "LATE_START": [
//           { "name": "Staff meeting", "start": "8:03", "end": "9:33", "teachers": true },
//           { "name": "Period 1", "start": "10:00", "end": "10:43" },
//           { "name": "Period 2", "start": "10:49", "end": "11:37" },
//           { "name": "Period 3", "start": "11:43", "end": "12:26" },
//           { "name": "Lunch", "start": "12:26", "end": "13:06" },
//           { "name": "Period 4", "start": "13:12", "end": "13:55" },
//           { "name": "Period 5", "start": "14:01", "end": "14:44" },
//           { "name": "Period 6", "start": "14:50", "end": "15:33" },
//           { "name": "Period 7", "start": "15:39", "end": "16:22" },
//           { "name": "Period Ext", "start": "15:39", "end": "17:09" }
//         ],
//       "2023-08-14": [
//         { "name": "Coffee & Treats in Library", "start": "8:03", "end": "8:20", "teachers": true },
//         { "name": "Welcome Back", "start": "8:20", "end": "9:25", "teachers": true },
//         { "name": "Rotation Block #1", "start": "9:30", "end": "10:50", "teachers": true },
//         { "name": "Photos", "start": "11:00", "end": "11:35", "teachers": true },
//         { "name": "Lunch", "start": "11:35", "end": "12:30", "teachers": true },
//         { "name": "Rotation Block #2", "start": "12:38", "end": "14:08", "teachers": true },
//         { "name": "Rotation Block #3", "start": "14:13", "end": "15:33", "teachers": true }
//       ],
//       "2023-08-30": [
//         { "name": "Period 0", "start": "7:26", "end": "8:24" },
//         { "name": "Period 1", "start": "8:30", "end": "9:12" },
//         { "name": "Period 2A", "start": "9:18", "end": "10:26" },
//         { "name": "Period 2B", "start": "10:32", "end": "11:40" },
//         { "name": "Period 3", "start": "11:46", "end": "12:28" },
//         { "name": "Lunch", "start": "12:28", "end": "13:08" },
//         { "name": "Period 4", "start": "13:14", "end": "13:56" },
//         { "name": "Period 5", "start": "14:02", "end": "14:44" },
//         { "name": "Period 6", "start": "14:50", "end": "15:33" },
//         { "name": "Period 7", "start": "15:39", "end": "16:37" }
//       ],
//       "2023-09-21": [
//         { "name": "Period 0", "start": "7:26", "end": "8:24" },
//         { "name": "Period 1", "start": "8:30", "end": "9:28" },
//         { "name": "Period 2", "start": "9:34", "end": "10:37" },
//         { "name": "Period 3", "start": "10:43", "end": "11:41" },
//         { "name": "Lunch", "start": "11:41", "end": "12:21" },
//         { "name": "Period 4", "start": "12:27", "end": "13:25" },
//         { "name": "Period 5", "start": "13:31", "end": "14:29" },
//         { "name": "Period 6", "start": "14:35", "end": "15:33" },
//         { "name": "Period 7", "start": "15:39", "end": "16:37" },
//         { "name": "Period Ext", "start": "15:39", "end": "17:09" },
//         { "name": "Back to School Period 0", "start": "18:15", "end": "18:25", "teachers": true },
//         { "name": "Back to School Period 1", "start": "18:30", "end": "18:40", "teachers": true },
//         { "name": "Principal's announcement", "start": "18:45", "end": "18:50", "teachers": true },
//         { "name": "Back to School Period 2", "start": "18:50", "end": "19:00", "teachers": true },
//         { "name": "Back to School Period 3", "start": "19:05", "end": "19:15", "teachers": true },
//         { "name": "Back to School Period 4", "start": "19:20", "end": "19:30", "teachers": true },
//         { "name": "Back to School Period 5", "start": "19:35", "end": "19:45", "teachers": true },
//         { "name": "Back to School Period 6", "start": "19:50", "end": "20:00", "teachers": true },
//         { "name": "Back to School Period 7", "start": "20:05", "end": "20:15", "teachers": true }
//       ],
//       "2023-12-20": [
//         { "name": "Period 1 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 2 Final", "start": "10:40", "end": "12:40" },
//         { "name": "Lunch", "start": "12:40", "end": "13:20", "nonSchool": true },
//         { "name": "Finals Prep / Make Up", "start": "13:26", "end": "14:32", "teachers": true }
//       ],
//       "2023-12-21": [
//         { "name": "Period 3 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 4 Final", "start": "10:40", "end": "12:40" },
//         { "name": "Lunch", "start": "12:40", "end": "13:20", "nonSchool": true },
//         { "name": "Finals Prep / Make Up", "start": "13:26", "end": "14:32", "teachers": true }
//       ],
//       "2023-12-22": [
//         { "name": "Period 5 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 6 Final", "start": "10:40", "end": "12:40" },
//         { "name": "Lunch", "start": "12:40", "end": "13:20", "nonSchool": true },
//         { "name": "Finals Prep / Make Up", "start": "13:26", "end": "14:32", "teachers": true }
//       ],
//       "2024-05-20": [
//         { "name": "Pastries in cafeteria", "start": "8:03", "end": "8:33", "teachers": true },
//         { "name": "Staff meeting in Library", "start": "8:35", "end": "9:33", "teachers": true },
//         { "name": "Period 1", "start": "10:00", "end": "10:43" },
//         { "name": "Period 2", "start": "10:49", "end": "11:37" },
//         { "name": "Period 3", "start": "11:43", "end": "12:26" },
//         { "name": "Lunch", "start": "12:26", "end": "13:06" },
//         { "name": "Period 4", "start": "13:12", "end": "13:55" },
//         { "name": "Period 5", "start": "14:01", "end": "14:44" },
//         { "name": "Period 6", "start": "14:50", "end": "15:33" },
//         { "name": "Period 7", "start": "15:39", "end": "16:22" },
//         { "name": "Period Ext", "start": "15:39", "end": "17:09" }
//       ],
//       "2024-05-24": [
//         { "name": "Period 0", "start": "7:26", "end": "8:24" },
//         { "name": "Period 1", "start": "8:30", "end": "9:12" },
//         { "name": "Period 2", "start": "9:18", "end": "10:00" },
//         { "name": "Period 3", "start": "10:06", "end": "10:48" },
//         { "name": "Period 4", "start": "10:54", "end": "11:36" },
//         { "name": "Lunch", "start": "11:36", "end": "12:16" },
//         { "name": "Period 5", "start": "12:22", "end": "13:04" },
//         { "name": "Period 6", "start": "13:10", "end": "13:49" },
//         { "name": "M building release", "start": "13:49", "end": "13:51" },
//         { "name": "C building release", "start": "13:51", "end": "13:53" },
//         { "name": "G building release", "start": "13:53", "end": "13:55" },
//         { "name": "H building release", "start": "13:55", "end": "13:57" },
//         { "name": "Remaining buildings release", "start": "13:57", "end": "13:59" },
//         { "name": "Carnival", "start": "13:59", "end": "15:42" },
//         { "name": "Period 7", "start": "15:48", "end": "16:30" },
//         { "name": "Period Ext", "start": "15:48", "end": "17:09" }
//       ],
//       "2024-05-29": [
//         { "name": "Period 1 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 2 Final", "start": "10:40", "end": "12:40" },
//         { "name": "Lunch", "start": "12:40", "end": "13:20", "nonSchool": true },
//         { "name": "Finals Prep / Make Up", "start": "13:26", "end": "14:32", "teachers": true }
//       ],
//       "2024-05-30": [
//         { "name": "Period 3 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 4 Final", "start": "10:40", "end": "12:40" },
//         { "name": "Lunch", "start": "12:40", "end": "13:20", "nonSchool": true },
//         { "name": "Finals Prep / Make Up", "start": "13:26", "end": "14:32", "teachers": true }
//       ],
//       "2024-05-31": [
//         { "name": "Period 5 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 6 Final", "start": "10:40", "end": "13:00" },
//         { "name": "Lunch", "start": "13:00", "end": "13:40", "nonSchool": true },
//         { "name": "Finals Prep / Make Up", "start": "13:40", "end": "14:25", "teachers": true },
//         { "name": "Teacher common prep", "start": "12:25", "end": "15:33", "teachers": true }
//       ],
//       "2024-06-03": [
//         { "name": "Period 1", "start": "8:30", "end": "9:50" },
//         { "name": "Period 3", "start": "9:56", "end": "11:16" },
//         { "name": "Period 5", "start": "11:22", "end": "12:42" },
//         { "name": "Lunch", "start": "12:42", "end": "13:22", "nonSchool": true },
//         { "name": "Teacher Common Prep", "start": "13:22", "end": "15:33", "teachers": true }
//       ],
//       "2024-06-04": [
//         { "name": "Period 2", "start": "8:30", "end": "9:50" },
//         { "name": "Period 4", "start": "9:56", "end": "11:16" },
//         { "name": "Period 6", "start": "11:22", "end": "12:42" },
//         { "name": "Lunch", "start": "12:42", "end": "13:22", "nonSchool": true },
//         { "name": "Teacher Check Out", "start": "13:22", "end": "15:33", "teachers": true }
//       ]
//     },
//     "holidays": [
//       "2023-09-04",
//       "2023-10-09",
//       "2023-10-27",
//       "2023-11-10",
//       "2023-11-20",
//       "2023-11-21",
//       "2023-11-22",
//       "2023-11-23",
//       "2023-11-24",
//       "2023-12-25",
//       "2023-12-26",
//       "2023-12-27",
//       "2023-12-28",
//       "2023-12-29",
//       "2024-01-01",
//       "2024-01-02",
//       "2024-01-03",
//       "2024-01-04",
//       "2024-01-05",
//       "2024-01-15",
//       "2024-01-29",
//       "2024-02-16",
//       "2024-02-19",
//       "2024-04-01",
//       "2024-04-02",
//       "2024-04-03",
//       "2024-04-04",
//       "2024-04-05",
//       "2024-05-17",
//       "2024-05-27"
//     ],
//     "breakNames": {
//       "2023-11-20": "Thanksgiving break",
//       "2023-12-25": "Winter break",
//       "2024-02-16": "Presidents’ Day Weekend",
//       "2024-04-01": "Spring break"
//     }
//   },
//   {
//     "year": "2022-2023",
//     "firstDayTeachers": "2022-08-13",
//     "firstDay": "2022-08-15",
//     "lastDay": "2023-06-02",
//     "schedules": {
//         "NORMAL": [
//           { "name": "Period 0", "start": "7:26", "end": "8:24" },
//           { "name": "Period 1", "start": "8:30", "end": "9:28" },
//           { "name": "Period 2", "start": "9:34", "end": "10:37" },
//           { "name": "Period 3", "start": "10:43", "end": "11:41" },
//           { "name": "Lunch", "start": "11:41", "end": "12:21" },
//           { "name": "Period 4", "start": "12:27", "end": "13:25" },
//           { "name": "Period 5", "start": "13:31", "end": "14:29" },
//           { "name": "Period 6", "start": "14:35", "end": "15:33" },
//           { "name": "Period 7", "start": "15:39", "end": "16:37" }
//         ],
//       "LATE_START": [
//           { "name": "Staff meeting", "start": "8:03", "end": "9:33" },
//           { "name": "Period 1", "start": "10:00", "end": "10:43" },
//           { "name": "Period 2", "start": "10:49", "end": "11:37" },
//           { "name": "Period 3", "start": "11:43", "end": "12:26" },
//           { "name": "Lunch", "start": "12:26", "end": "13:06" },
//           { "name": "Period 4", "start": "13:12", "end": "13:55" },
//           { "name": "Period 5", "start": "14:01", "end": "14:44" },
//           { "name": "Period 6", "start": "14:50", "end": "15:33" },
//           { "name": "Period 7", "start": "15:39", "end": "16:22" }
//       ],
//       "2022-09-01": [
//         { "name": "Period 0", "start": "7:26", "end": "8:24" },
//         { "name": "Period 1", "start": "8:30", "end": "9:12" },
//         { "name": "Period 2A", "start": "9:18", "end": "10:26" },
//         { "name": "Period 2B", "start": "10:32", "end": "11:40" },
//         { "name": "Period 3", "start": "11:46", "end": "12:28" },
//         { "name": "Lunch", "start": "12:28", "end": "13:08" },
//         { "name": "Period 4", "start": "13:14", "end": "13:56" },
//         { "name": "Period 5", "start": "14:02", "end": "14:44" },
//         { "name": "Period 6", "start": "14:50", "end": "15:33" },
//         { "name": "Period 7", "start": "15:39", "end": "16:37" }
//       ],
//       "2022-09-22": [
//         { "name": "Period 0", "start": "7:26", "end": "8:24" },
//         { "name": "Period 1", "start": "8:30", "end": "9:28" },
//         { "name": "Period 2", "start": "9:34", "end": "10:37" },
//         { "name": "Period 3", "start": "10:43", "end": "11:41" },
//         { "name": "Lunch", "start": "11:41", "end": "12:21" },
//         { "name": "Period 4", "start": "12:27", "end": "13:25" },
//         { "name": "Period 5", "start": "13:31", "end": "14:29" },
//         { "name": "Period 6", "start": "14:35", "end": "15:33" },
//         { "name": "Period 7", "start": "15:39", "end": "16:37" },
//         { "name": "Back to School Period 0", "start": "18:15", "end": "18:25" },
//         { "name": "Back to School Period 1", "start": "18:30", "end": "18:40" },
//         { "name": "Principal's announcement", "start": "18:45", "end": "18:50" },
//         { "name": "Back to School Period 2", "start": "18:50", "end": "19:00" },
//         { "name": "Back to School Period 3", "start": "19:05", "end": "19:15" },
//         { "name": "Back to School Period 4", "start": "19:20", "end": "19:30" },
//         { "name": "Back to School Period 5", "start": "19:35", "end": "19:45" },
//         { "name": "Back to School Period 6", "start": "19:50", "end": "20:00" },
//         { "name": "Back to School Period 7", "start": "20:05", "end": "20:15" }
//       ],
//       "2022-12-14": [
//         { "name": "Period 1 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 2 Final", "start": "10:40", "end": "12:40" },
//         { "name": "Lunch", "start": "12:40", "end": "13:20" },
//         { "name": "Finals Prep / Make Up", "start": "13:26", "end": "14:32" }
//       ],
//       "2022-12-15": [
//         { "name": "Period 3 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 4 Final", "start": "10:40", "end": "12:40" },
//         { "name": "Lunch", "start": "12:40", "end": "13:20" },
//         { "name": "Finals Prep / Make Up", "start": "13:26", "end": "14:32" }
//       ],
//       "2022-12-16": [
//         { "name": "Period 5 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 6 Final", "start": "10:40", "end": "12:40" },
//         { "name": "Lunch", "start": "12:40", "end": "13:20" },
//         { "name": "Finals Prep / Make Up", "start": "13:26", "end": "14:32" }
//       ],
//       "2023-01-26": [
//         { "name": "Period 0", "start": "7:26", "end": "8:24" },
//         { "name": "Period 1", "start": "8:30", "end": "9:28" },
//         { "name": "Period 2", "start": "9:34", "end": "10:37" },
//         { "name": "Period 3", "start": "10:43", "end": "11:41" },
//         { "name": "Lunch", "start": "11:41", "end": "12:21" },
//         { "name": "Period 4", "start": "12:27", "end": "13:25" },
//         { "name": "Period 5", "start": "13:31", "end": "14:29" },
//         { "name": "Period 6", "start": "14:35", "end": "15:33" },
//         { "name": "Period 7", "start": "15:39", "end": "16:37" },
//         { "name": "Open House Community Time", "start": "17:30", "end": "18:30" },
//         { "name": "Open House Rotation 1", "start": "18:30", "end": "18:55" },
//         { "name": "Open House Rotation 2", "start": "19:00", "end": "19:25" },
//         { "name": "Open House Rotation 3", "start": "19:30", "end": "19:55" }
//       ],
//       "2023-05-18": [
//         { "name": "Period 0", "start": "7:23", "end": "8:21" },
//         { "name": "Period 1", "start": "8:30", "end": "9:10" },
//         { "name": "Period 2", "start": "9:16", "end": "9:56" },
//         { "name": "Period 3", "start": "10:02", "end": "10:42" },
//         { "name": "Period 4", "start": "10:48", "end": "11:28" },
//         { "name": "Lunch", "start": "11:28", "end": "12:08" },
//         { "name": "Period 5", "start": "12:14", "end": "12:54" },
//         { "name": "Period 6", "start": "13:00", "end": "13:40" },
//         { "name": "Carnival", "start": "13:40", "end": "15:33" },
//         { "name": "Period 7", "start": "15:39", "end": "16:34" }
//       ],
//       "2023-05-30": [
//         { "name": "Period 1 Final", "start": "8:30", "end": "10:45" },
//         { "name": "Period 2 Final", "start": "10:55", "end": "12:55" },
//         { "name": "Lunch", "start": "12:55", "end": "13:35" },
//         { "name": "Finals Prep / Make Up", "start": "13:35", "end": "14:40" }
//       ],
//       "2023-05-31": [
//         { "name": "Period 3 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 4 Final", "start": "10:40", "end": "12:40" },
//         { "name": "Lunch", "start": "12:40", "end": "13:20" },
//         { "name": "Finals Prep / Make Up", "start": "13:20", "end": "14:25" }
//       ],
//       "2023-06-01": [
//         { "name": "Period 5 Final", "start": "8:30", "end": "10:30" },
//         { "name": "Period 6 Final", "start": "10:40", "end": "12:40" },
//         { "name": "Lunch", "start": "12:40", "end": "13:20" },
//         { "name": "Finals Prep / Make Up", "start": "13:20", "end": "14:25" }
//       ],
//       "2023-06-02": [
//         { "name": "Period 1", "start": "8:30", "end": "9:05" },
//         { "name": "Period 2", "start": "9:11", "end": "9:46" },
//         { "name": "Period 3", "start": "9:52", "end": "10:27" },
//         { "name": "Period 4", "start": "10:33", "end": "11:08" },
//         { "name": "Period 5", "start": "11:14", "end": "11:49" },
//         { "name": "Period 6", "start": "11:55", "end": "12:30" }
//       ]
//     },
//     "holidays": [
//       "2022-09-05",
//       "2022-10-10",
//       "2022-10-28",
//       "2022-11-11",
//       "2022-11-21",
//       "2022-11-22",
//       "2022-11-23",
//       "2022-11-24",
//       "2022-11-25",
//       "2022-12-19",
//       "2022-12-20",
//       "2022-12-21",
//       "2022-12-22",
//       "2022-12-23",
//       "2022-12-26",
//       "2022-12-27",
//       "2022-12-28",
//       "2022-12-29",
//       "2022-12-30",
//       "2023-01-02",
//       "2023-01-16",
//       "2023-02-17",
//       "2023-02-20",
//       "2023-04-03",
//       "2023-04-04",
//       "2023-04-05",
//       "2023-04-06",
//       "2023-04-07",
//       "2023-05-15",
//       "2023-05-29"
//     ],
//     "breakNames": {
//       "2022-11-21": "Thanksgiving break",
//       "2022-12-19": "Winter break",
//       "2023-02-17": "Presidents’ Day Weekend",
//       "2023-04-03": "Spring break"
//     }
//   }
// ];



export const isSchoolDay = (date: Date) => true;

export { calendars, Year, Period };
