import React, { ComponentProps, useState } from "react";
import { EyeIcon } from "../icons/EyeIcon";

import styles from "./inputForm.module.scss";
import { OpenEyeIcon } from "../icons/OpenEyeIcon";

interface InputFormProps extends ComponentProps<"input"> {
  label?: string;
  customStyles?: React.CSSProperties;
  type?: React.HTMLInputTypeAttribute;

}

export const InputForm: React.FC<InputFormProps> = ({
  label,
  type,
  customStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPasswordType = type === "password";

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={customStyles} className={styles["InputForm"]}>
      <label htmlFor={label}>{label}</label>

      {isPasswordType && (
        <div onClick={togglePassword}>
          {showPassword ? <EyeIcon /> : <OpenEyeIcon />}
        </div>
      )}

      <input
        type={showPassword ? "password" : "text" ?? type}
        {...props}
      />
    </div>
  );
};
