import React, { ComponentProps } from "react";
import styles from "./PrimaryButton.module.scss";

interface ButtonPrimaryProps extends ComponentProps<"button"> {
  label?: string;
}

const PrimaryButton: React.FC<ButtonPrimaryProps> = ({ label, ...props }) => {
  return (
    <button {...props} className={styles["PrimaryButton"]}>
      {label}
    </button>
  );
};

export default PrimaryButton;
