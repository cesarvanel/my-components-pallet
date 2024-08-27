export const presetData = [
  "Today",
  "Yesterday",
  "ThisWeek",
  "LastWeek",
  "ThisMonth",
  "LastMonth",
  "Last 90 days",
  "2021",
  "2020",
  "2019",
];

export const monthsArray: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const daysNameArray: string[] = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
];

export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const daysInMonth = (month: number, year: number): number => {
  switch (month) {
    case 1: // February
      return isLeapYear(year) ? 29 : 28;
    case 3:
    case 5:
    case 8:
    case 10: // April, June, September, November
      return 30;
    default:
      return 31;
  }
};

export const getFirstDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay();
};

export const getStartOfMonthDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const getStartOfWeek = (date: Date) => {
  const day = date.getDay();
  return new Date(date.setDate(date.getDate() - day));
};

const getEndOfWeek = (date: Date) => {
  const startOfWeek = getStartOfWeek(date);
  return new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
};

const getStartOfMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getEndOfMonth = () => {
  const startOfNextMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
  );
  return new Date(startOfNextMonth.getTime() - 1);
};

const getStartOfLastMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

const getEndOfLastMonth = () => {
  const startOfThisMonth = getStartOfMonth();
  return new Date(startOfThisMonth.getTime() - 1);
};

export const DatePresets = {
  today: [new Date(), new Date()],
  yesterday: [
    new Date(new Date().setDate(new Date().getDate() - 1)),
    new Date(new Date().setDate(new Date().getDate() - 1)),
  ],
  thisWeek: [getStartOfWeek(new Date()), getEndOfWeek(new Date())],
  lastWeek: [
    getStartOfWeek(new Date(new Date().setDate(new Date().getDate() - 7))),
    getEndOfWeek(new Date(new Date().setDate(new Date().getDate() - 7))),
  ],
  thisMonth: [getStartOfMonth(), getEndOfMonth()],
  lastMonth: [getStartOfLastMonth(), getEndOfLastMonth()],
  last7Days: [
    new Date(new Date().setDate(new Date().getDate() - 6)),
    new Date(),
  ],
  last30Days: [
    new Date(new Date().setDate(new Date().getDate() - 29)),
    new Date(),
  ],
};
