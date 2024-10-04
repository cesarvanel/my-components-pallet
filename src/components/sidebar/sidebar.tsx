import { Link } from "react-router-dom";
import styles from "./sidebar.module.scss";

export const Sidebar = () => {
  return (
    <nav className={styles["Sidebar"]}>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};
