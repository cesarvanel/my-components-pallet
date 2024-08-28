import React from "react";
import { ComponentProps } from "react";
import styles from "./button.module.scss"

interface ButtonProps extends ComponentProps<"button"> {
  children: React.ReactNode;
  
}
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button className={styles["Button"]} {...props}>{children}</button>;
};
