import React, { ComponentProps } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxInputProps extends ComponentProps<"input"> {
  label?: string;
}

const InputCheckbox: React.FC<CheckboxInputProps> = ({ label, ...props }) => {
  return (
    <div className={styles["Checkbox"]}>
      <input {...props} type="checkbox" id="checkbox1" />
      <label htmlFor="checkbox1">{label}</label>
    </div>
  );
};

export default InputCheckbox;
