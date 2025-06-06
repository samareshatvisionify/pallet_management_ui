export interface ShiftData {
  time: string;
  value: number;
  shift: 'morning' | 'afternoon' | 'night';
}

export interface WeeklyTrendData {
  day: string;
  count: number;
  label: string;
}

export interface HourlyActivityData {
  hour: string;
  count: number;
}

export const shiftData: ShiftData[] = [
  { time: '06:00', value: 45, shift: 'morning' },
  { time: '07:00', value: 45, shift: 'morning' },
  { time: '08:00', value: 78, shift: 'morning' },
  { time: '09:00', value: 78, shift: 'morning' },
  { time: '10:00', value: 95, shift: 'morning' },
  { time: '11:00', value: 95, shift: 'morning' },
  { time: '12:00', value: 65, shift: 'morning' },
  { time: '13:00', value: 65, shift: 'afternoon' },
  { time: '14:00', value: 88, shift: 'afternoon' },
  { time: '15:00', value: 88, shift: 'afternoon' },
  { time: '16:00', value: 92, shift: 'afternoon' },
  { time: '17:00', value: 92, shift: 'afternoon' },
  { time: '18:00', value: 68, shift: 'afternoon' },
  { time: '19:00', value: 55, shift: 'afternoon' },
  { time: '20:00', value: 40, shift: 'night' },
  { time: '21:00', value: 35, shift: 'night' },
  { time: '22:00', value: 28, shift: 'night' },
  { time: '23:00', value: 28, shift: 'night' },
  { time: '00:00', value: 28, shift: 'night' },
  { time: '01:00', value: 28, shift: 'night' },
  { time: '02:00', value: 28, shift: 'night' },
  { time: '03:00', value: 32, shift: 'night' },
  { time: '04:00', value: 32, shift: 'night' },
  { time: '05:00', value: 32, shift: 'night' },
];

export const weeklyData: WeeklyTrendData[] = [
  { day: 'Mon', count: 140, label: 'Mon' },
  { day: 'Tue', count: 165, label: 'Tue' },
  { day: 'Wed', count: 135, label: 'Wed' },
  { day: 'Thu', count: 180, label: 'Thu' },
  { day: 'Fri', count: 155, label: 'Fri' },
  { day: 'Sat', count: 135, label: 'Sat' },
  { day: 'Sun', count: 150, label: 'Sun' },
];

export const hourlyDataMap = {
  Making: [
    { hour: '06:00', count: 22 },
    { hour: '07:00', count: 38 },
    { hour: '08:00', count: 30 },
    { hour: '09:00', count: 7 },
    { hour: '10:00', count: 15 },
    { hour: '11:00', count: 47 },
    { hour: '12:00', count: 20 },
    { hour: '13:00', count: 40 },
    { hour: '14:00', count: 30 },
    { hour: '15:00', count: 8 },
    { hour: '16:00', count: 16 },
    { hour: '17:00', count: 50 },
    { hour: '18:00', count: 10 },
  ],
  Dismantling: [
    { hour: '06:00', count: 12 },
    { hour: '07:00', count: 18 },
    { hour: '08:00', count: 25 },
    { hour: '09:00', count: 30 },
    { hour: '10:00', count: 0 },
    { hour: '11:00', count: 35 },
    { hour: '12:00', count: 0 },
    { hour: '13:00', count: 28 },
    { hour: '14:00', count: 20 },
    { hour: '15:00', count: 15 },
    { hour: '16:00', count: 8 },
    { hour: '17:00', count: 0 },
    { hour: '18:00', count: 5 },
  ],
  Repair: [
    { hour: '06:00', count: 5 },
    { hour: '07:00', count: 8 },
    { hour: '08:00', count: 12 },
    { hour: '09:00', count: 15 },
    { hour: '10:00', count: 18 },
    { hour: '11:00', count: 0 },
    { hour: '12:00', count: 0 },
    { hour: '13:00', count: 22 },
    { hour: '14:00', count: 16 },
    { hour: '15:00', count: 10 },
    { hour: '16:00', count: 6 },
    { hour: '17:00', count: 3 },
    { hour: '18:00', count: 0 },
  ],
  Board: [
    { hour: '06:00', count: 45 },
    { hour: '07:00', count: 52 },
    { hour: '08:00', count: 48 },
    { hour: '09:00', count: 35 },
    { hour: '10:00', count: 40 },
    { hour: '11:00', count: 0 },
    { hour: '12:00', count: 0 },
    { hour: '13:00', count: 55 },
    { hour: '14:00', count: 42 },
    { hour: '15:00', count: 38 },
    { hour: '16:00', count: 25 },
    { hour: '17:00', count: 15 },
    { hour: '18:00', count: 8 },
  ],
  Trimsaw: [
    { hour: '06:00', count: 18 },
    { hour: '07:00', count: 25 },
    { hour: '08:00', count: 32 },
    { hour: '09:00', count: 28 },
    { hour: '10:00', count: 35 },
    { hour: '11:00', count: 30 },
    { hour: '12:00', count: 0 },
    { hour: '13:00', count: 38 },
    { hour: '14:00', count: 40 },
    { hour: '15:00', count: 33 },
    { hour: '16:00', count: 20 },
    { hour: '17:00', count: 12 },
    { hour: '18:00', count: 6 },
  ]
}; 