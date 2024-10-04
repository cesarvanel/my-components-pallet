import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar/sidebar";
import styles from "./app-layout.module.scss";

export const AppLayout = () => {
  return (
    <main className={styles["AppLayout"]}>
      <Sidebar />

      <section className={styles["wrapper"]}>
        <div>hello</div>

        <Outlet />
      </section>
    </main>
  );
};
