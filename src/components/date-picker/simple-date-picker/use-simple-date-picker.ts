import { useState, useEffect } from "react";
import { DayModel } from "../../../utils/type/type";
import {
  daysInMonth,
  getFirstDayOfMonth,
} from "../../../utils/helper/date-data-helper";
import { SimpleDatePickerProps } from "./simple-date-picker";

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
  handleDisabledWithOrMaxDate: (date: DayModel) => boolean;
  isRangeEndSelected: (date: DayModel) => boolean;
  handleChangeCurrentMonth: (month: number) => void;
  currentMonth: number;
  currentYear: number;
}

export const useSimpleDatePicker = ({
  maxDate,
  minDate,
  isOpen,
  rangeMode,
  value,
  onChange,
}: SimpleDatePickerProps): useSimpleDatePickerBehavior => {
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

  const isInRange = (date: DayModel): boolean => {
    if (!value || !rangeMode) return false;
    if(!value.rangeEnd || !value.rangeStart) return false
    if (date.isNextDay || date.isPrevDay) return false;

    const currentDate = new Date(currentYear, currentMonth, date.day);
    return currentDate >= value.rangeStart  && currentDate <= value.rangeEnd;
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

    if (!date.isMonthDay) return;

    if (rangeMode) {
      const {rangeStart,rangeEnd} = value
      if (!rangeStart || (rangeStart && rangeEnd)) {
        onChange(clickedDate, null);
        return;
      }

      if (rangeStart && !rangeEnd) {
        if (clickedDate < rangeStart) {

          onChange(clickedDate, rangeStart);
          return;
        }
        onChange(rangeStart, clickedDate);
        return;
      }
    } else {
      onChange(clickedDate);
    }
  };

  const handleGetSelectedDate = (date: DayModel): boolean => {
    if (!date.isMonthDay) return false;
    if(rangeMode) return false
    const isSelected =
      !!value &&
      value.getDate() === date.day &&
      value.getMonth() === currentMonth &&
      value.getFullYear() === currentYear;

    return isSelected;
  };

  const handleGetSelectedTodayDay = (date: DayModel): boolean => {
    return date.day === todayDay && date.isMonthDay;
  };

  const isRangeStartSelected = (date: DayModel): boolean => {

    if(!rangeMode) return false

    const {rangeStart} = value
    return (
      !!rangeStart &&
      rangeStart.getDate() === date.day &&
      date.isMonthDay &&
      rangeStart.getMonth() === currentMonth &&
      rangeStart.getFullYear() === currentYear
    );
  };

  const isRangeEndSelected = (date: DayModel): boolean => {

    if(!rangeMode) return false

    const {rangeEnd} = value
    return (
      !!rangeEnd &&
      rangeEnd.getDate() === date.day &&
      date.isMonthDay &&
      rangeEnd.getMonth() === currentMonth &&
      rangeEnd.getFullYear() === currentYear
    );
  };

  const handleChangeCurrentMonth = (month: number) => {
    setCurrentMonth(month);
  };

  const handleCleanRange = () => {
    setCurrentMonth(todayMonth);
    setCurrentYear(todayYear);
    rangeMode? onChange(null, null) : onChange(undefined)
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
    calendarDays: getCalendarDays(),
    currentMonth,
    currentYear,
  };
};
