



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
 
 export const daysNameArray: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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

 export  const getStartOfMonthDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);