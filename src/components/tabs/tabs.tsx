import React, { useState } from "react";
import styles from "./tabs.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";
import { TabItem } from "../../utils/type/type";

const className = classNameModule(styles);

interface OwnProps {
  tabItems: TabItem[];
  customStyles?: React.CSSProperties;
}
const Tabs: React.FC<OwnProps> = ({ tabItems, customStyles }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div style={customStyles} className={styles["Tabs"]}>
      <ul className={styles["tab-list"]}>
        {tabItems.map((item, index) => (
          <li
            key={index}
            {...className("tab-item", { active: activeTab === index })}
            onClick={() => handleTabClick(index)}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <div className={styles["tab-content"]}>
        <div
          className={styles["tab-content-inner"]}
          style={{ transform: `translateX(-${activeTab * 100}%)` }}
        >
          {tabItems.map((item, index) => (
            <div key={index} className={styles["tab-panel"]}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
