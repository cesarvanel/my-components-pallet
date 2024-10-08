import React, { useEffect, useState } from "react";

import styles from "./date-range-preset.module.scss";
import { classNameModule } from "../../../utils/class-name-module/classNameModule";
import { DoubleCalendarDayModel } from "../../../utils/type/type";
import {
  DatePresets,
  daysInMonth,
  daysNameArray,
  getFirstDayOfMonth,
  monthsArray,
} from "../../../utils/helper/date-data-helper";
import LeftIcon from "../../icons/LeftIcon";
import RectangleIcon from "../../icons/RectangleIcon";
import RightIcon from "../../icons/RightIcon";
const className = classNameModule(styles);

export interface OwnProps {
  isOpen: boolean;
  onRangeDateChange?: (startDate: Date | null, endDate: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}
export const DateRangePreset: React.FC<OwnProps> = (props) => {
  const { isOpen, onRangeDateChange, maxDate, minDate } = props;

  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );

  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>();

  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const applyPreset = (preset: keyof typeof DatePresets) => {
    const [startDate, endDate] = DatePresets[preset];
    setRangeStart(startDate);
    setRangeEnd(endDate);
  };

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

    if (!day.isCurrentMonth) return;

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(day.date);
      setRangeEnd(null);
      onRangeDateChange?.(day.date, null);
      return;
    }
    if (rangeStart && !rangeEnd) {
      if (day.date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(day.date);
        onRangeDateChange?.(day.date, rangeStart);
        return;
      }
      setRangeEnd(day.date);
      onRangeDateChange?.(rangeStart, day.date);
    }
  };

  const handleGetSelectedDate = (date: DoubleCalendarDayModel): boolean => {
    const isSelected =
      !!selectedDate &&
      selectedDate.getDate() === date.day &&
      date.isCurrentMonth &&
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
      date.isCurrentMonth &&
      rangeStart.getMonth() === date.date.getMonth()
    );
  };

  const isRangeEndSelected = (date: DoubleCalendarDayModel): boolean => {
    return (
      !!rangeEnd &&
      rangeEnd.getDate() === date.day &&
      date.isCurrentMonth &&
      rangeEnd.getMonth() === date.date.getMonth()
    );
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
      date.getFullYear()
    );
    const startDayOfTheMonth = getFirstDayOfMonth(
      date.getMonth(),
      date.getFullYear()
    );
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

  const handleChangeSelectedPreset = (
    index: number,
    preset: keyof typeof DatePresets
  ) => {
    setSelectedPreset(index);
    applyPreset(preset);
  };

  const currentDate = new Date(currentYear, currentMonth);
  const daysCurrentMonth = getCalendarDays(currentDate);
  const nextMonth = new Date(currentYear, currentMonth + 1, 1);
  const daysNextMonth = getCalendarDays(nextMonth);
  return (
    <div className={styles["DateRangePreset"]}>
      <div className={styles["preset"]}>
        {DatePresets &&
          Object.keys(DatePresets).map((x, index) => {
            const selected = selectedPreset === index;
            return (
              <div
                key={index}
                role="button"
                onClick={() => {
                  handleChangeSelectedPreset(
                    index,
                    x as keyof typeof DatePresets
                  );
                }}
                {...className("item", { selected: selected })}
              >
                {x}
              </div>
            );
          })}
      </div>
      <div className={styles["divider"]}></div>
      <div {...className("left-day")}>
        <div className={styles["header"]}>
          <button onClick={handlePrevMonth} className={styles["icon"]}>
            <LeftIcon />
          </button>

          <div className={styles["day-middle"]}>
            <div className={styles["item"]}>
              <span>{monthsArray[currentMonth]}</span>
              <RectangleIcon />
            </div>

            <div className={styles["item"]}>
              <span>{currentYear}</span>
              <RectangleIcon />
            </div>
          </div>
          <div></div>
        </div>

        <div>
          <div className={styles["container-name"]}>
            {daysNameArray.map((day) => {
              return (
                <div className={styles["day-name"]} key={day}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles["container-day"]}>
          {daysCurrentMonth.map((date, key) => {
            const isToday = handleGetSelectedTodayDay(date, currentMonth);
            return (
              <div
                {...className("day-content", {
                  "active-range": isInRange(date),
                })}
                key={date.day.toString() + key}
              >
                <div
                  onClick={(e) => handleDayClick(e, date)}
                  {...className("day-value", {
                    "prev-month": !date.isCurrentMonth,
                    "next-month": !date.isCurrentMonth,
                    "active-day": handleGetSelectedDate(date),
                    "today-day": isToday,
                    "in-range": isInRange(date),
                    "is-range-or-end-selected":
                      isRangeStartSelected(date) || isRangeEndSelected(date),
                    "is-min-or-max-day": !handleDisabledWithOrMaxDate(date),
                  })}
                >
                  {date.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles["divider"]}></div>
      <div>
        <div {...className("right-day")}>
          <div className={styles["header"]}>
            <div></div>
            <div className={styles["day-middle"]}>
              <div className={styles["item"]}>
                <span>{monthsArray[currentMonth + 1]}</span>
                <RectangleIcon />
              </div>
              <div className={styles["item"]}>
                <span>{currentYear}</span>
                <RectangleIcon />
              </div>
            </div>

            <button onClick={handleNextMonth} className={styles["icon"]}>
              <RightIcon />
            </button>
          </div>

          <div>
            <div className={styles["container-name"]}>
              {daysNameArray.map((day) => {
                return (
                  <div className={styles["day-name"]} key={day}>
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles["container-day"]}>
            {daysNextMonth.map((date, key) => {
              const isToday = handleGetSelectedTodayDay(date, currentMonth + 1);
              return (
                <div
                  {...className("day-content", {
                    "active-range": isInRange(date),
                  })}
                  key={date.day.toString() + key}
                >
                  <div
                    onClick={(e) => handleDayClick(e, date)}
                    {...className("day-value", {
                      "prev-month": !date.isCurrentMonth,
                      "next-month": !date.isCurrentMonth,
                      "active-day": handleGetSelectedDate(date),
                      "today-day": isToday,
                      "in-range": isInRange(date),
                      "is-range-or-end-selected":
                        isRangeStartSelected(date) || isRangeEndSelected(date),
                      "is-min-or-max-day": !handleDisabledWithOrMaxDate(date),
                    })}
                  >
                    {date.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
