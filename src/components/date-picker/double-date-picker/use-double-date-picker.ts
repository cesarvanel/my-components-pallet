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
  handleGetSelectedDate: (date: DoubleCalendarDayModel) => boolean;
  isRangeStartSelected: (date: DoubleCalendarDayModel) => boolean;
  handleDisabledWithOrMaxDate: (date: DoubleCalendarDayModel) => boolean;
  isInRange: (dayDate: DoubleCalendarDayModel) => boolean;
  currentMonth: number;
  currentYear: number;
}

export interface DoubleDatePickerProps {
  isOpen: boolean;
  onRangeSelect: (start: Date | null, end: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const useDoubleDatePicker = ({
  isOpen,
  onRangeSelect,
  maxDate,
  minDate,
}: DoubleDatePickerProps): useDoubleDatePickerBehavior => {
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
    
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(day.date);
      setRangeEnd(null);
      onRangeSelect(day.date, null);
      return;
    }
    if (rangeStart && !rangeEnd) {
      if (day.date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(day.date);
        onRangeSelect(day.date, rangeStart);
        return;
      }
      setRangeEnd(day.date);
      onRangeSelect(rangeStart, day.date);
    }
  };

  const handleGetSelectedDate = (date: DoubleCalendarDayModel): boolean => {
    const isSelected =
      !!selectedDate &&
      selectedDate.getDate() === date.day &&
      selectedDate.getFullYear() === currentYear;

    return isSelected;
  };

  const handleGetSelectedTodayDay = (
    date: DoubleCalendarDayModel,
    currentMonth: number
  ): boolean => {
    return date.day === todayDay && currentMonth === todayMonth;
  };

  const isRangeStartSelected = (date: DoubleCalendarDayModel): boolean => {
    return (
      !!rangeStart &&
      rangeStart.getDate() === date.day &&
      rangeStart.getMonth() === date.date.getMonth() &&
      rangeStart.getFullYear() === currentYear
    );
  };

  const isRangeEndSelected = (date: DoubleCalendarDayModel): boolean => {
    return (
      !!rangeEnd &&
      rangeEnd.getDate() === date.day && 
      rangeEnd.getMonth() === date.date.getMonth() &&
      rangeEnd.getFullYear() === currentYear
    );
  };

  const handleChangeCurrentMonth = (month: number) => {
    setCurrentMonth(month);
  };

  const isInRange = (dayDate: DoubleCalendarDayModel) => {
    return (
      !!rangeStart &&
      !!rangeEnd &&
      dayDate.date > rangeStart &&
      dayDate.date < rangeEnd
    );
  };

  const handleCleanRange = () => {
    setRangeEnd(null);
    setRangeStart(null);
    setSelectedDate(null);
    setCurrentMonth(todayMonth);
    setCurrentYear(todayYear);
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
    handleGetSelectedDate,
    isRangeEndSelected,
    isRangeStartSelected,
    handleDisabledWithOrMaxDate,
    isInRange,
    currentMonth,
    currentYear,
  };
};
