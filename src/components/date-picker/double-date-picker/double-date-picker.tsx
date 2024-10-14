import React from "react";
import { classNameModule } from "../../../utils/class-name-module/classNameModule";

import styles from "./double-date-picker.module.scss";
import RightIcon from "../../icons/RightIcon";
import LeftIcon from "../../icons/LeftIcon";
import {
  DoubleDatePickerProps,
  useDoubleDatePicker,
} from "./use-double-date-picker";
import {
  daysNameArray,
  monthsArray,
} from "../../../utils/helper/date-data-helper";
import RectangleIcon from "../../icons/RectangleIcon";
const className = classNameModule(styles);

export const DoubleDatePicker: React.FC<DoubleDatePickerProps> = (props) => {
  const {
    handleNextMonth,
    handlePrevMonth,
    handleDayClick,
    handleGetSelectedTodayDay,
    isRangeEndSelected,
    isRangeStartSelected,
    handleDisabledWithOrMaxDate,
    getCalendarDays,
    isInRange,
    currentMonth,
    currentYear,
  } = useDoubleDatePicker(props);

  const currentDate = new Date(currentYear, currentMonth);
  const daysCurrentMonth = getCalendarDays(currentDate);
  const nextMonth = new Date(currentYear, currentMonth + 1, 1);
  const daysNextMonth = getCalendarDays(nextMonth);
  return (
    <div {...className("DoubleDatePicker")}>
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
                    // "active-day": handleGetSelectedDate(date),
                    "today-day": isToday && date.isCurrentMonth,
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
      <div className={styles["grid-second"]}></div>
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
                    "active-range":isInRange(date),
                  })}
                  key={date.day.toString() + key}
                >
                  <div
                    onClick={(e) => handleDayClick(e, date)}
                    {...className("day-value", {
                      "prev-month": !date.isCurrentMonth,
                      "next-month": !date.isCurrentMonth,
                      "today-day": isToday && date.isCurrentMonth,
                      "in-range":isInRange(date),
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
