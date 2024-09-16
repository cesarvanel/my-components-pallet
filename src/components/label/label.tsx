import React, { ComponentProps } from "react";

import styles from "./;abel.module.scss"

interface LabelFormProps extends ComponentProps<"label"> {
  label?: string;
}

export const LabelForm: React.FC<LabelFormProps> = ({ label, ...props }) => {
  return <label className={styles["Label"]} {...props} htmlFor="label component">{label}</label>;
};
