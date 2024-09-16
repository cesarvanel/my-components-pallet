import React, { ComponentProps, useState } from "react";
import styles from "./inputSelect.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";
import { useClickOutSide } from "../../hooks/use-click-out-side";
import { OptionSelect } from "../../utils/type/type";
import { DownIcon } from "../icons/DownIcon";
import { CleanFieldIcon } from "../icons/CleanFieldIcon";

interface InputSelectFormProps extends ComponentProps<"input"> {
  label?: string;
  withSearchIcon?:boolean
}
const className = classNameModule(styles);

const options: OptionSelect[] = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
  { id: 4, label: "Option 4" },
];

export const InputSelectForm: React.FC<InputSelectFormProps> = ({
  label,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const [selectedOption, setSelectedOption] = useState<OptionSelect>();

  const ref = useClickOutSide<HTMLDivElement>(() => setIsOpen(false));

  const handleSelectOption = (option: OptionSelect) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleCleanOptionSelect = () => {
    setSelectedOption(undefined);
    setSearchValue("")
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div ref={ref} className={styles["InputSelectForm"]}>


      <label htmlFor="">{label}</label>
      <div
        {...className("customInputSelect", { open: isOpen })}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <input
          type="text"
          value={selectedOption?.label || searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Select an option..."
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
      </div>

      {isOpen && (
        <div {...className("customSelectOptions")}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className={styles["option"]}
                onClick={() => handleSelectOption(option)}
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
