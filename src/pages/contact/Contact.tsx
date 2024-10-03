import { Button } from "../../components/button/button";
import eventsEmitter from "../../events/EventEmitter";

const Contact = () => {
  return (
    <section
      style={{
        margin: 10,
      }}
    >
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, nobis
        minus corrupti illum provident similique iure quas at obcaecati aliquid
        sed. Dolores sequi quisquam illum est odit maxime consequatur velit?
      </p>

      <Button
        style={{
          padding: 10,
        }}
        onClick={() =>
          eventsEmitter.emit("APP-MODAL", {
            key:"123456"
          })
        }
      >
        Open App Modal
      </Button>
    </section>
  );
};

export default Contact;
