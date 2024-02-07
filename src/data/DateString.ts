const years = [
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
] as const;

type YearString = (typeof years)[number];

const leapYears = ["2024", "2028", "2032"] as const;

type LeapYearString = (typeof leapYears)[number];

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
] as const;

type MonthString = (typeof months)[number];

const days = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
] as const;

type DayString = (typeof days)[number];

type MonthDayString = Exclude<
  `${MonthString}-${DayString}`,
  "02-30" | "02-31" | "04-31" | "06-31" | "09-31" | "11-31"
>;

type DateString = Exclude<
  `${YearString}-${MonthDayString}`,
  `${Exclude<YearString, LeapYearString>}-02-29`
>;

export type {
  YearString,
  LeapYearString,
  MonthString,
  MonthDayString,
  DayString,
  DateString,
  DateString as default,
};
