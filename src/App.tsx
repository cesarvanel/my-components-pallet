import { useState } from "react";
import { PopOver } from "./components/pop-over/pop-over";
import { DoubleDatePicker } from "./components/date-picker/double-date-picker/double-date-picker";
import { DateRangePreset } from "./components/date-picker/date-range-preset/date-range-preset";
import { SimpleDatePicker } from "./components/date-picker/simple-date-picker/simple-date-picker";

const App = () => {
  const [showPopOver, setShowPopOver] = useState<boolean>(false);
  const [showDoubleCalendar, setShowDoubleCalendar] = useState<boolean>(false);

  const [showPresetRange, setShowPresetRange] = useState<boolean>(false);
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

      <button
        onClick={() => {
          setShowPresetRange(!showPresetRange);
        }}
        style={{
          margin: 50,
          padding: 10,
          pointerEvents: showPresetRange ? "none" : undefined,
        }}
      >
        Date range presets
      </button>

      <PopOver isOpen={showPopOver} onClose={() => setShowPopOver(false)}>
        <SimpleDatePicker isOpen={showPopOver} rangeMode />
      </PopOver>
      <div
        style={{
          position: "relative",
          backgroundColor: "red",
        }}
      >
        <PopOver
          isOpen={showDoubleCalendar}
          onClose={() => setShowDoubleCalendar(false)}
        >
          <DoubleDatePicker
            isOpen={showDoubleCalendar}
            onRangeSelect={() => {}}
          />
        </PopOver>
      </div>

      <PopOver
        isOpen={showPresetRange}
        onClose={() => setShowPresetRange(false)}
      >
        <DateRangePreset
          isOpen={showPresetRange}
          rangeMode
        />
      </PopOver>
    </div>
  );
};

export default App;
