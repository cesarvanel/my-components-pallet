import styles from "./Animation.module.scss";

const AnimationPage = () => {
  return (
    <div className={styles["Animation"]}>
      <p className={styles["hero"]}>
        La Chenille et Alice se considérèrent un instant en silence. Enfin la
        Chenille sortit le houka de sa bouche, et lui adressa la parole d’une
        voix endormie et traînante.
      </p>

      <div style={{display:"grid",}} >
        {[1, 2, 3, 4].map((_, index) => (
          <div className={styles["anim-test"]} key={index}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            hic nemo aut vel neque provident rem impedit sequi perferendis ipsa.
            Quaerat a totam doloribus labore, quas voluptatum fugit non
            perferendis?
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimationPage;
