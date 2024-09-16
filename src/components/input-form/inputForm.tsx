import React, { ComponentProps, useState } from "react";
import { EyeIcon } from "../icons/EyeIcon";

import styles from "./inputForm.module.scss";
import { OpenEyeIcon } from "../icons/OpenEyeIcon";
import { AlertIcon } from "../icons/AlertIcon";
import { classNameModule } from "../../utils/class-name-module/classNameModule";

interface InputFormProps extends ComponentProps<"input"> {
  label?: string;
  customStyles?: React.CSSProperties;
  type?: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  description?: string;
}

const className = classNameModule(styles);

export const InputForm: React.FC<InputFormProps> = ({
  label,
  type,
  customStyles,
  errorMessage,
  description,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPasswordType = type === "password";

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={customStyles} className={styles["InputForm"]}>
      <div className={styles["text-container"]}>
        <label htmlFor={label}>{label}</label>

        <span>{description}</span>
      </div>

      {isPasswordType && (
        <div onClick={togglePassword} className={styles["svg-container"]}>
          {!showPassword ? <EyeIcon /> : <OpenEyeIcon />}
        </div>
      )}

      <input
        type={showPassword ? "password" : "text" ?? type}
        {...props}
        {...className("", { error: !!errorMessage })}
      />

      {!!errorMessage && (
        <div id="error" className={styles["errormessage"]}>
          <AlertIcon />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
