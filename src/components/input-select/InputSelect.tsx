import React, { ComponentProps, useState } from "react";
import styles from "./inputSelect.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";
import { useClickOutSide } from "../../hooks/use-click-out-side";
import { OptionSelect } from "../../utils/type/type";
import { DownIcon } from "../icons/DownIcon";
import { CleanFieldIcon } from "../icons/CleanFieldIcon";
import SearchIcon from "../icons/SearchIcon";
import { AlertIcon } from "../icons/AlertIcon";

interface InputSelectFormProps extends ComponentProps<"input"> {
  options:OptionSelect[], 
  onChangeOption?: (option: OptionSelect) => void,
  label?: string;
  withSearchIcon?: boolean;
  errorMessage?: string;
  disabled?: boolean;

}
const className = classNameModule(styles);

export const InputSelectForm: React.FC<InputSelectFormProps> = ({
  options,
  label,
  withSearchIcon,
  errorMessage,
  disabled,
  onChangeOption,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const [selectedOption, setSelectedOption] = useState<OptionSelect>();

  const [activeOptionIndex, setActiveOptionIndex] = useState<number>();

  const ref = useClickOutSide<HTMLDivElement>(() => setIsOpen(false));

  const handleSelectOption = (option: OptionSelect, index: number) => {
    setSelectedOption(option);
    setActiveOptionIndex(index);
    onChangeOption?.(option)
    setIsOpen(false);
  };

  const handleCleanOptionSelect = () => {
    setSelectedOption(undefined);
    setSearchValue("");
    setActiveOptionIndex(undefined)
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

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
          setSelectedOption(options[activeOptionIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={ref} className={styles["InputSelectForm"]}>
      <label htmlFor="">{label}</label>
      <div
        tabIndex={0}
        {...className("customInputSelect", {
          open: isOpen,
          error: !!errorMessage,
          disabled: !!disabled,
        })}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <input
          type="text"
          value={selectedOption?.label || searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Select an option..."
          {...className("", { withSearchIcon: withSearchIcon ?? false })}
          disabled={disabled}
          {...props}
        />
        <span {...className("arrow", { open: isOpen })}>
          {(!!selectedOption || !!searchValue) && (
            <div onClick={handleCleanOptionSelect}>
              <CleanFieldIcon />
            </div>
          )}
          <DownIcon />
        </span>

        {withSearchIcon && (
          <span className={styles["search-icon"]}>
            <SearchIcon />
          </span>
        )}
      </div>

      {!!errorMessage && (
        <div id="error" className={styles["errormessage"]}>
          <AlertIcon />
          <span>{errorMessage}</span>
        </div>
      )}

      {isOpen && !disabled && (
        <div {...className("customSelectOptions")}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.id}
                {...className("option", {
                  active: index === activeOptionIndex,
                })}
                onClick={() => handleSelectOption(option, index)}
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
