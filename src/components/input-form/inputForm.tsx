import React, { ComponentProps } from "react";

import styles from "./inputForm.module.scss";

interface InputFormProps extends ComponentProps<"input"> {
  label?: string;
  customStyles?:React.CSSProperties
}

export const InputForm: React.FC<InputFormProps> = ({ label, customStyles, ...props }) => {
  return (
    <div style={customStyles} className={styles["InputForm"]}>
      <label htmlFor={label}>{label}</label>

      <input type="text" {...props} />
    </div>
  );
};
