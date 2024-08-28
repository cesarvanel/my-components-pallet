import React from "react";
import { useClickOutSide } from "../../hooks/use-click-out-side";

import styles from "./drop-down.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";

const className = classNameModule(styles);

interface OwnProps {
  onClose: () => void;
  isOpen: boolean;
  customStyles?:React.CSSProperties
}

export const DropDown: React.FC<OwnProps> = ({ onClose, isOpen,customStyles }) => {
  const ref = useClickOutSide<HTMLDivElement>(() => onClose());

  return (
    <div ref={ref} style={customStyles} {...className("DropDown", { show: isOpen })}>
      <div className={styles["content"]}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo
        voluptatibus hic quia! Rem ea eius nostrum suscipit odio eum? Totam
        exercitationem provident incidunt vero alias at hic minima! Provident,
        velit?
      </div>
    </div>
  );
};
