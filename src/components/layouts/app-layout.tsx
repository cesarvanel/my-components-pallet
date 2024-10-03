import styles from "./app-layout.module.scss";

export const AppLayout = () => {
  return (
    <div className={styles["AppLayout"]}>
      <div
        style={{
          backgroundColor: "red",
        }}
      >
        sidebar
      </div>

      <main
        style={{
          backgroundColor: "black",
          position:"fixed", 
          marginLeft:250, 
          height:"100%",
          width:"100%"
        }}
      >
        <div>navBar</div>

        <div>main</div>
      </main>
    </div>
  );
};
