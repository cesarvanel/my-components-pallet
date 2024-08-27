import { useState, useEffect } from "react";
import { DayModel } from "../../../utils/type/type";
import { daysInMonth, getFirstDayOfMonth } from "../../../utils/helper/date-data-helper";



export interface useSimpleDatePickerBehavior {
   handleNextMonth: () => void;
   handlePrevMonth: () => void;
   isInRange: (date: DayModel) => boolean;
   handleGetSelectedDate: (date: DayModel) => boolean;
   handleDayClick: (
     e: React.MouseEvent<HTMLDivElement, MouseEvent>,
     date: DayModel
   ) => void;
   isRangeStartSelected: (date: DayModel) => boolean;
   handleGetSelectedTodayDay: (date: DayModel) => boolean;
   calendarDays: DayModel[];
   handleDisabledWithOrMaxDate: (date: DayModel) => boolean, 
   isRangeEndSelected: (date: DayModel) => boolean, 
   handleChangeCurrentMonth: (month: number) => void, 
   currentMonth: number, 
   currentYear: number; 
   rangeStart: Date | null; 
   rangeEnd: Date | null
 }
 
 interface OwnProps {
   isOpen: boolean;
   rangeMode?: boolean;
   onDateSelect?: (date: Date | null) => void;
   onRangeSelect?: (start: Date | null, end: Date | null) => void;
   minDate?: Date;
   maxDate?: Date;
 }
 
 export const useSimpleDatePicker = ({
   maxDate,
   minDate,
   isOpen,
   onDateSelect,
   onRangeSelect,
   rangeMode,
 }: OwnProps): useSimpleDatePickerBehavior => {
   const [currentMonth, setCurrentMonth] = useState<number>(
     new Date().getMonth()
   );
 
   const [currentYear, setCurrentYear] = useState<number>(
     new Date().getFullYear()
   );
 
   const [selectedDate, setSelectedDate] = useState<Date | null>();
 
   const [rangeStart, setRangeStart] = useState<Date | null>(null);
   const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
 
   const today = new Date();
   const todayDay = today.getDate();
   const todayMonth = today.getMonth();
   const todayYear = today.getFullYear();
 
   const handleNextMonth = () => {
     if (currentMonth < 11) {
       setCurrentMonth((prev) => prev + 1);
       return;
     }
     setCurrentMonth(0);
     setCurrentYear((prev) => prev + 1);
   };
 
   const handlePrevMonth = () => {
     if (currentMonth > 0) {
       setCurrentMonth((prev) => prev - 1);
       return;
     }
     setCurrentMonth(0);
     setCurrentYear((prev) => prev - 1);
   };
 
   const isInRange = (date: DayModel): boolean => {
     if (!rangeStart || !rangeEnd) return false;
     if (date.isNextDay || date.isPrevDay) return false;
 
     const currentDate = new Date(currentYear, currentMonth, date.day);
     return currentDate >= rangeStart && currentDate <= rangeEnd;
   };
 
   const handleDisabledWithOrMaxDate = (date: DayModel) => {
     const currentDate = new Date(currentYear, currentMonth, date.day);
     if (minDate && !maxDate) {
       return currentDate >= minDate;
     }
     if (maxDate && !minDate) {
       return currentDate <= maxDate;
     }
 
     if (maxDate && minDate) {
       return currentDate >= minDate && currentDate <= maxDate;
     }
 
     return true;
   };
 
   const handleDayClick = (
     e: React.MouseEvent<HTMLDivElement, MouseEvent>,
     date: DayModel
   ) => {
     e.stopPropagation();
     e.nativeEvent.stopImmediatePropagation();
     e.nativeEvent.stopPropagation();
     e.nativeEvent.preventDefault();
     e.preventDefault();
 
     const clickedDate = new Date(currentYear, currentMonth, date.day);
 
     if(!date.isMonthDay) return
 
     if (rangeMode) {
       if (!rangeStart || (rangeStart && rangeEnd)) {
         setRangeStart(clickedDate);
         setRangeEnd(null);
         onRangeSelect?.(clickedDate, null);
         return;
       }
       if (rangeStart && !rangeEnd) {
         if (clickedDate < rangeStart) {
           setRangeEnd(rangeStart);
           setRangeStart(clickedDate);
           onRangeSelect?.(clickedDate, rangeStart);
           return;
         }
         setRangeEnd(clickedDate);
         onRangeSelect?.(rangeStart, clickedDate);
         return;
       }
     }
     setSelectedDate(new Date(currentYear, currentMonth, date.day));
     onDateSelect?.(clickedDate);
   };
 
   const handleGetSelectedDate = (date: DayModel): boolean => {
     if(!date.isMonthDay) return false
     const isSelected =
       !!selectedDate &&
       selectedDate.getDate() === date.day &&
       selectedDate.getMonth() === currentMonth &&
       selectedDate.getFullYear() === currentYear;
 
     return isSelected;
   };
 
   const handleGetSelectedTodayDay = (date: DayModel): boolean => {
     return date.day === todayDay && date.isMonthDay;
   };
 
   const isRangeStartSelected = (date: DayModel): boolean => {
     return (
       !!rangeStart &&
       rangeStart.getDate() === date.day &&
       date.isMonthDay &&
       rangeStart.getMonth() === currentMonth &&
       rangeStart.getFullYear() === currentYear
     );
   };
 
   const isRangeEndSelected = (date: DayModel): boolean => {
     return (
       !!rangeEnd &&
       rangeEnd.getDate() === date.day &&
       date.isMonthDay &&
       rangeEnd.getMonth() === currentMonth &&
       rangeEnd.getFullYear() === currentYear
     );
   };
 
   const handleChangeCurrentMonth = (month:number) =>{
     setCurrentMonth(month)
   }
 
   const handleCleanRange = () => {
     setRangeEnd(null);
     setRangeStart(null);
     setSelectedDate(null);
     setCurrentMonth(todayMonth)
     setCurrentYear(todayYear)
   };
 
   const getCalendarDays = (): DayModel[] => {
     const daysModels: DayModel[] = [];
     const totalDays = daysInMonth(currentMonth, currentYear);
     const startDay = getFirstDayOfMonth(currentMonth, currentYear);
     const disabledDate = totalDays - startDay + 1;
 
     for (let day = disabledDate; day <= totalDays; day++) {
       const disabledDate: DayModel = {
         day: day,
         isNextDay: false,
         isPrevDay: true,
         isMonthDay: false,
       };
       daysModels.push(disabledDate);
     }
 
     for (let day = 1; day <= totalDays; day++) {
       const disabledDate: DayModel = {
         day: day,
         isNextDay: false,
         isPrevDay: false,
         isMonthDay: true,
       };
       daysModels.push(disabledDate);
     }
 
     const totalCells = startDay + totalDays;
     const nextMonthDays = 42 - totalCells;
     for (let day = 1; day <= nextMonthDays; day++) {
       const disabledDate: DayModel = {
         day: day,
         isNextDay: true,
         isPrevDay: false,
         isMonthDay: false,
       };
       daysModels.push(disabledDate);
     }
 
     return daysModels;
   };
 
   useEffect(() => {
     return () => {
       if (!isOpen) {
         handleCleanRange();
       }
     };
   }, [isOpen]);
 
   return {
     handleDayClick,
     handleGetSelectedDate,
     handleGetSelectedTodayDay,
     handleNextMonth,
     handlePrevMonth,
     isInRange,
     isRangeStartSelected,
     handleDisabledWithOrMaxDate, 
     isRangeEndSelected, 
     handleChangeCurrentMonth,
     calendarDays:getCalendarDays(), 
     currentMonth, 
     currentYear,
     rangeEnd,
     rangeStart
 
   };
 };
 