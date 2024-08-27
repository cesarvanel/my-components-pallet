import { useState } from "react";
import { SimpleDatePicker } from "./components/date-picker/simple-date-picker/simple-date-picker";
import { PopOver } from "./components/pop-over/pop-over";
import { DoubleDatePicker } from "./components/date-picker/double-date-picker/double-date-picker";

const App = () => {
  const [showPopOver, setShowPopOver] = useState<boolean>(false);
  const [showDoubleCalendar, setShowDoubleCalendar] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={() => {
          setShowPopOver(!showPopOver);
        }}
        style={{
          margin: 50,
          padding: 10,
          pointerEvents: showPopOver ? "none" : undefined,
        }}
      >
        show calendar
      </button>

      <button
        onClick={() => {
          setShowDoubleCalendar(!showDoubleCalendar);
        }}
        style={{
          margin: 50,
          padding: 10,
          pointerEvents: showDoubleCalendar ? "none" : undefined,
        }}
      >
        Double Calendar View
      </button>

      {/* <PopOver isOpen={showPopOver} onClose={() => setShowPopOver(false)}>
        <SimpleDatePicker isOpen={showPopOver} rangeMode />
      </PopOver> */}

      <PopOver
        isOpen={showDoubleCalendar}
        onClose={() => setShowDoubleCalendar(false)}
      >
        <DoubleDatePicker
          isOpen={showDoubleCalendar}
          onRangeSelect={() => {}}
        ></DoubleDatePicker>
      </PopOver>
    </div>
  );
};

export default App;
