import { useState } from "react";
import { classNameModule } from "../../utils/class-name-module/classNameModule";
import styles from "./ToggleSwitch.module.scss";

const className = classNameModule(styles);

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  console.log("isChecked", isChecked);
  return (
    <div className={styles["ToggleSwitch"]}>
      <input
        type="checkbox"
        id="switch"
        defaultChecked={isChecked}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label htmlFor="switch" {...className("slider", "switch")}></label>
    </div>
  );
};

export default ToggleSwitch;
