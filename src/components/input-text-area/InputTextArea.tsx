import React, { ComponentProps } from "react";
import styles from "./InputTextArea.module.scss";
import { AlertIcon } from "../icons/AlertIcon";
import { classNameModule } from "../../utils/class-name-module/classNameModule";

export interface TextAreaInputPros extends ComponentProps<"textarea"> {
  label?: string;
  errorMessage?: string;
}

const className = classNameModule(styles);

const InputTextArea: React.FC<TextAreaInputPros> = ({
  label,
  errorMessage,
  ...props
}) => {
  return (
    <div className={styles["InputTextAreaFrom"]}>
      <label htmlFor="">{label}</label>

      <div className={styles["area-container"]}>
        <textarea
          {...props}
          {...className({ error: !!errorMessage })}
          placeholder="placeholder ..."
        ></textarea>
      </div>
      {!!errorMessage && (
        <div id="error" className={styles["errormessage"]}>
          <AlertIcon />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default InputTextArea;
