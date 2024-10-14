import React, { useState } from "react";
import { useSimpleDatePicker } from "./use-simple-date-picker";
import { classNameModule } from "../../../utils/class-name-module/classNameModule";
import styles from "./simple-date-picker.module.scss";
import RectangleIcon from "../../icons/RectangleIcon";
import RightIcon from "../../icons/RightIcon";
import LeftIcon from "../../icons/LeftIcon";
import {
  daysNameArray,
  monthsArray,
} from "../../../utils/helper/date-data-helper";
import { PopOver } from "../../pop-over/pop-over";

const className = classNameModule(styles);


type SingleRangePropsType = {
  rangeMode?: false;
  onChange:(date?:Date) => void, 
  value?:Date
 }
 export type MultipleDateType = {rangeStart:  Date | null , rangeEnd:  Date | null}


type MultipleRangePropsType = {
  rangeMode: true;
  onChange:(startDate: Date | null, endDate: Date | null) => void, 
  value:MultipleDateType
 }
export  type  SimpleDatePickerProps =  {
   isOpen: boolean;
   minDate?: Date;
   maxDate?: Date;
   leftIcon?: React.ReactElement;
   rightIcon?: React.ReactElement;
   styles?: React.CSSProperties;
 } & (SingleRangePropsType | MultipleRangePropsType )
 
export const SimpleDatePicker: React.FC<SimpleDatePickerProps> = (props) => {
  const { leftIcon, rightIcon } = props;
  const {
    handleNextMonth,
    handleDayClick,
    handleDisabledWithOrMaxDate,
    handleGetSelectedDate,
    handleGetSelectedTodayDay,
    handlePrevMonth,
    isInRange,
    isRangeEndSelected,
    isRangeStartSelected,
    handleChangeCurrentMonth,
    calendarDays,
    currentMonth,
    currentYear,
  } = useSimpleDatePicker(props);

  const [dropDownIsOpen, setDropDownIsOpen] = useState<boolean>(false);

  const handleSelectMonth = (month: number) => {
    setDropDownIsOpen(false);
    handleChangeCurrentMonth(month);
  };

  const handleCloseDropDown = () => {
    setDropDownIsOpen(false);
  };

  return (
    <div {...className("SimpleDatePicker")}>
      <div role="button" {...className("content")}>
        <div className={styles["grid-one"]}>
          <button onClick={handlePrevMonth} className={styles["icon"]}>
            {leftIcon ?? <LeftIcon />}
          </button>

          <div className={styles["middle"]}>
            <div>
              <div
                role="button"
                onClick={() => setDropDownIsOpen(!dropDownIsOpen)}
                className={styles["item"]}
                style={{ pointerEvents: dropDownIsOpen ? "none" : undefined }}
              >
                <span>{monthsArray[currentMonth]}</span>
                <RectangleIcon />
              </div>

              <PopOver isOpen={dropDownIsOpen} onClose={handleCloseDropDown}>
                <div className={styles["dropdown"]}>
                  {monthsArray.map((month, index) => {
                    return (
                      <div
                        {...className("every-month", {
                          "selected-month": index === currentMonth,
                        })}
                        key={month}
                        role="button"
                        onClick={() => {
                          handleSelectMonth(index);
                        }}
                      >
                        {month}
                      </div>
                    );
                  })}
                </div>
              </PopOver>
            </div>

            <div className={styles["item"]}>
              <span>{currentYear}</span>
              <RectangleIcon />
            </div>
          </div>

          <button onClick={handleNextMonth} className={styles["icon"]}>
            {rightIcon ?? <RightIcon />}
          </button>
        </div>

        <div className={styles["grid-two"]}>
          <div className={styles["container-name"]}>
            {daysNameArray.map((day) => {
              return (
                <div className={styles["day-name"]} key={day}>
                  {day}
                </div>
              );
            })}
          </div>

          <div className={styles["container-day"]}>
            {calendarDays.map((date, key) => {
              const isToday = handleGetSelectedTodayDay(date);
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
                      "prev-month": date.isPrevDay,
                      "next-month": date.isNextDay,
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
