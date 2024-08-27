


import React from "react";
import styles from "./pop-over.module.scss"
import { classNameModule } from "../../utils/class-name-module/classNameModule";
import { useClickOutSide } from "../../hooks/use-click-out-side";

const className = classNameModule(styles);

interface OwnProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const PopOver: React.FC<OwnProps> = ({ children, isOpen, onClose }) => {
  const ref = useClickOutSide<HTMLDivElement>(() => onClose());

  return (
    <div ref={ref} {...className("PopOver", { open: isOpen })}>
      <div>{children}</div>
    </div>
  );
};