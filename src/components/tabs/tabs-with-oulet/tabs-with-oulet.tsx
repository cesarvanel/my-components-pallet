import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import styles from "./tabs-with-oulet.module.scss";
import { classNameModule } from "../../../utils/class-name-module/classNameModule";
import { TabItemWithOwlet } from "../../../utils/type/type";

const className = classNameModule(styles);

interface OwnProps {
  tabItemsWithOWlet: TabItemWithOwlet[];
  customStyles?: React.CSSProperties;
}

const TabsWithOwlet: React.FC<OwnProps> = ({tabItemsWithOWlet,customStyles}) => {
  const location = useLocation();

  const navigate = useNavigate();

  const isActiveTab = (path: string) => location.pathname.includes(path);

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <div style={customStyles} className={styles["TabsWithOwlet"]}>
      <ul className={styles["tab-list"]}>
        {tabItemsWithOWlet.map((item, index) => (
          <li
            key={index}
            role="button"
            onClick={() => {
              handleNavigate(item.path);
            }}
            {...className("tab-item", { active: isActiveTab(item.path) })}
          >
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className={styles["tab-content"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default TabsWithOwlet;
