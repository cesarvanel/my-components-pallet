import React from "react";
import styles from "./radio-group.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";

const className = classNameModule(styles);

export const RadioGroup: React.FC = () => {
  return (
    <div className={styles["RadioGroup"]}>
      {[1, 2, 3, 4].map((x) => {
        return (
          <div key={x} {...className("group-item")}>
            <div>
              <div className={styles["text"]}>
                <div>Standard</div>

                <div className={styles["circle"]}></div>
              </div>

              <div className={styles["business"]}>
                <span>4-10 business delivery day</span>
              </div>

              <div className={styles["money"]}>$0.00</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
