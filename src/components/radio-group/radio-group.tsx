import React, { useState } from "react";
import styles from "./radio-group.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";

const className = classNameModule(styles);

export const RadioGroup: React.FC = () => {
  const [selectedRadio, setSelectedRadio] = useState<Array<number>>([]);

  const isSelectedRadio = (index: number): boolean => {
    return selectedRadio.includes(index);
  };

  const handleSelected = (index: number) => {
    if (isSelectedRadio(index)) {
      return setSelectedRadio(selectedRadio.filter((pos) => pos !== index));
    }

    setSelectedRadio([...selectedRadio, index]);
  };
  return (
    <div className={styles["RadioGroup"]}>
      {[1, 2, 3, 4].map((x) => {
        return (
          <div
            role="button"
            onClick={() => handleSelected(x)}
            key={x}
            {...className("group-item", {selected: isSelectedRadio(x)})}
          >
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
