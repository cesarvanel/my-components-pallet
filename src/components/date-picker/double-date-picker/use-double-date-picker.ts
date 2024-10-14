import { useEffect, useState } from "react";
import { DoubleCalendarDayModel } from "../../../utils/type/type";
import {
  daysInMonth,
  getFirstDayOfMonth,
} from "../../../utils/helper/date-data-helper";

export interface useDoubleDatePickerBehavior {
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  handleCleanRange: () => void;
  getCalendarDays: (date: Date) => DoubleCalendarDayModel[];
  handleDayClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    day: DoubleCalendarDayModel
  ) => void;
  handleGetSelectedTodayDay: (
    date: DoubleCalendarDayModel,
    currentMonth: number
  ) => boolean;
  handleChangeCurrentMonth: (month: number) => void;
  isRangeEndSelected: (date: DoubleCalendarDayModel) => boolean;
  isRangeStartSelected: (date: DoubleCalendarDayModel) => boolean;
  handleDisabledWithOrMaxDate: (date: DoubleCalendarDayModel) => boolean;
  isInRange: (dayDate: DoubleCalendarDayModel) => boolean;
  currentMonth: number;
  currentYear: number;
}

export interface DoubleDatePickerProps {
  isOpen: boolean;
  onChange: (start: Date | null, end: Date | null) => void;
  value:{rangeStart:Date | null ; rangeEnd:Date | null}
  minDate?: Date;
  maxDate?: Date;
}

export const useDoubleDatePicker = ({
  isOpen,
  onChange,
  value,
  maxDate,
  minDate,
}: DoubleDatePickerProps): useDoubleDatePickerBehavior => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );

  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
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

  const handleDisabledWithOrMaxDate = (date: DoubleCalendarDayModel) => {
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
    day: DoubleCalendarDayModel
  ) => {
    e.stopPropagation();

    if(!day.isCurrentMonth) return

    const {rangeStart, rangeEnd} = value
    
    if (!rangeStart || (rangeStart && rangeEnd)) {
  
      onChange(day.date, null);
      return;
    }
    if (rangeStart && !rangeEnd) {
      if (day.date < rangeStart) {
        onChange(day.date, rangeStart);
        return;
      }
      onChange(rangeStart, day.date);
    }
  };

  const handleGetSelectedTodayDay = (
    date: DoubleCalendarDayModel,
    currentMonth: number
  ): boolean => {
    return date.day === todayDay && currentMonth === todayMonth;
  };

  const isRangeStartSelected = (date: DoubleCalendarDayModel): boolean => {

    const {rangeStart}  = value
    return (
      !!rangeStart &&
      rangeStart.getDate() === date.day &&date.isCurrentMonth && 
      rangeStart.getMonth() === date.date.getMonth()
    );
  };

  const isRangeEndSelected = (date: DoubleCalendarDayModel): boolean => {
    const {rangeEnd}  = value
    return (
      !!rangeEnd &&
      rangeEnd.getDate() === date.day && date.isCurrentMonth && 
      rangeEnd.getMonth() === date.date.getMonth()
    );
  };

  const handleChangeCurrentMonth = (month: number) => {
    setCurrentMonth(month);
  };

  const isInRange = (dayDate: DoubleCalendarDayModel) => {
    const {rangeStart, rangeEnd}  = value
    return (
      !!rangeStart &&
      !!rangeEnd &&
      dayDate.date > rangeStart &&
      dayDate.date < rangeEnd
    );
  };

  const handleCleanRange = () => {
    setCurrentMonth(todayMonth);
    setCurrentYear(todayYear);
    onChange(null, null)
  };

  const getCalendarDays = (date: Date): DoubleCalendarDayModel[] => {
    const daysModels: DoubleCalendarDayModel[] = [];
    const totalDaysInTheMonth = daysInMonth(
      date.getMonth(),
      date.getFullYear(),
  
    );
    const startDayOfTheMonth = getFirstDayOfMonth(date.getMonth(), date.getFullYear())
    const disabledDate = totalDaysInTheMonth - startDayOfTheMonth + 1;

    for (let day = disabledDate; day <= totalDaysInTheMonth; day++) {
      const prevDate = new Date(currentYear, currentMonth - 1, day);
      const disabledDate: DoubleCalendarDayModel = {
        day: day,
        date: prevDate,
        isCurrentMonth: false,
      };
      daysModels.push(disabledDate);
    }

    for (let day = 1; day <= totalDaysInTheMonth; day++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
      const currentDayDate: DoubleCalendarDayModel = {
        day: day,
        date: dayDate,
        isCurrentMonth: true,
      };
      daysModels.push(currentDayDate);
    }

    const nextMonthDays = 42 - daysModels.length;
    for (let day = 1; day <= nextMonthDays; day++) {
      const nextDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        totalDaysInTheMonth
      );
      nextDate.setDate(nextDate.getDate() + day);
      const disabledDate: DoubleCalendarDayModel = {
        day: day,
        date: nextDate,
        isCurrentMonth: false,
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
    getCalendarDays,
    handleCleanRange,
    handleNextMonth,
    handlePrevMonth,
    handleDayClick,
    handleGetSelectedTodayDay,
    handleChangeCurrentMonth,
    isRangeEndSelected,
    isRangeStartSelected,
    handleDisabledWithOrMaxDate,
    isInRange,
    currentMonth,
    currentYear,
  };
};
