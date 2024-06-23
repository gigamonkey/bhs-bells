export type YearData = {
  year: string;
  firstDayTeachers: string;
  firstDay: string;
  lastDay: string;
  schedules: SchedulesData;
  holidays: HolidayData[];
};

export type SchedulesData = {
  NORMAL: PeriodData[];
  LATE_START: PeriodData[];
  [key: string]: PeriodData[];
};

export type PeriodData = {
  name: string;
  start: string;
  end: string;
  teachers?: boolean;
  nonSchool?: boolean;
};

export type HolidayData = {
  name: string;
  start: string;
  end?: string;
};

export const calendar: YearData = {
  year: '2024-2025',
  firstDayTeachers: '2024-08-12',
  firstDay: '2024-08-14',
  lastDay: '2025-06-05',
  schedules: {
    NORMAL: [
      { name: 'Period 0', start: '7:26', end: '8:24' },
      { name: 'Period 1', start: '8:30', end: '9:28' },
      { name: 'Period 2', start: '9:34', end: '10:37' },
      { name: 'Period 3', start: '10:43', end: '11:41' },
      { name: 'Lunch', start: '11:41', end: '12:21' },
      { name: 'Period 4', start: '12:27', end: '13:25' },
      { name: 'Period 5', start: '13:31', end: '14:29' },
      { name: 'Period 6', start: '14:35', end: '15:33' },
      { name: 'Period 7', start: '15:39', end: '16:37' },
      { name: 'Period Ext', start: '15:39', end: '17:09' },
    ],
    LATE_START: [
      { name: 'Staff meeting', start: '8:03', end: '9:33', teachers: true },
      { name: 'Period 1', start: '10:00', end: '10:43' },
      { name: 'Period 2', start: '10:49', end: '11:37' },
      { name: 'Period 3', start: '11:43', end: '12:26' },
      { name: 'Lunch', start: '12:26', end: '13:06' },
      { name: 'Period 4', start: '13:12', end: '13:55' },
      { name: 'Period 5', start: '14:01', end: '14:44' },
      { name: 'Period 6', start: '14:50', end: '15:33' },
      { name: 'Period 7', start: '15:39', end: '16:22' },
      { name: 'Period Ext', start: '15:39', end: '17:09' },
    ],
    '2024-08-12': [{ name: 'PD', start: '8:03', end: '15:33', teachers: true }],
    '2024-08-13': [{ name: 'PD', start: '8:30', end: '15:33', teachers: true }],
  },

  holidays: [
    { name: 'Labor Day', start: '2024-09-02' },
    { name: 'District Staff PD', start: '2024-10-07' },
    { name: "Indigenous Peoples' Day", start: '2024-10-14' },
    { name: "Veterans' Day", start: '2024-11-11' },
    { name: 'Thanksgiving break', start: '2024-11-23', end: '2024-12-01' },
    { name: 'Winter break ', start: '2024-12-21', end: '2025-01-05' },
    { name: 'MLK Day', start: '2025-01-20' },
    { name: 'District Staff PD', start: '2025-01-27' },
    { name: "Presidents' Day Weekend", start: '2025-02-14', end: '2025-02-17' },
    { name: 'Day off', start: '2025-03-14' },
    { name: 'Spring break', start: '2025-03-31', end: '2025-04-06' },
    { name: "Malcom X's Birthday", start: '2025-05-16' },
    { name: 'Memorial Day', start: '2025-05-26' },
  ],
};
