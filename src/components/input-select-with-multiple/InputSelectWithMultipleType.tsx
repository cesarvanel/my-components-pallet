import React, { useState } from "react";

import styles from "./InputSelectWithMultipleType.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";
import { CleanFieldIcon } from "../icons/CleanFieldIcon";
import { DownIcon } from "../icons/DownIcon";
import { useClickOutSide } from "../../hooks/use-click-out-side";

export type SelectOption = {
  label: string;
  value: string;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
  disabled?: boolean;
  errorMessage?: string;
  withSearchIcon?: boolean;
  label?: string;
} & (SingleSelectProps | MultipleSelectProps);

const className = classNameModule(styles);

export const InputSelectWithMultipleType: React.FC<SelectProps> = ({
  multiple,
  value,
  options,
  onChange,
  disabled,
  errorMessage,
  withSearchIcon,
  label,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const [activeOptionIndex, setActiveOptionIndex] = useState<number>();

  const ref = useClickOutSide<HTMLDivElement>(() => setIsOpen(false));

  const handleCleanOptionSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSearchValue("");
    setActiveOptionIndex(undefined);
    multiple ? onChange([]) : onChange(undefined);
  };
  const handleSelectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((val) => val !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) {
        onChange(option);
      }
    }
  };

  const handleChangeOption = (option: SelectOption, index: number) => {
    handleSelectOption(option), setActiveOptionIndex(index);
    setIsOpen(false);
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveOptionIndex((prevIndex) =>
          prevIndex === undefined || prevIndex === options.length - 1
            ? 0
            : prevIndex + 1
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveOptionIndex((prevIndex) =>
          prevIndex === undefined || prevIndex === 0
            ? options.length - 1
            : prevIndex - 1
        );
        break;
      case "Enter":
        if (activeOptionIndex !== undefined) {
          handleSelectOption(options[activeOptionIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div ref={ref} className={styles["InputSelectWithMultipleType"]}>
      <label htmlFor="">{label}</label>
      <div
        {...className("customInput", {
          open: isOpen,
          error: !!errorMessage,
          disabled: !!disabled,
        })}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <input
          type="text"
          placeholder="Select an option"
          onChange={(e) => setSearchValue(e.target.value)}
          value={multiple ? "" : value?.label || searchValue}
          disabled={disabled}
          {...className("", { withSearchIcon: withSearchIcon ?? false })}
        />

        <span {...className("arrow", { open: isOpen })}>
          {(!!value || !!searchValue) && (
            <div onClick={(e) => handleCleanOptionSelect(e)}>
              <CleanFieldIcon />
            </div>
          )}
          <DownIcon />
        </span>
      </div>

      {isOpen && (
        <div className={styles["customOptions"]}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                {...className("option", {
                  active: isOptionSelected(option) || index === activeOptionIndex ,
                })}
                onClick={() => handleChangeOption(option, index)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className={styles["no-options"]}>No options found</div>
          )}
        </div>
      )}
    </div>
  );
};
