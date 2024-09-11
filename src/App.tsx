import { useState } from "react";
import { PopOver } from "./components/pop-over/pop-over";
import { DoubleDatePicker } from "./components/date-picker/double-date-picker/double-date-picker";
import { DateRangePreset } from "./components/date-picker/date-range-preset/date-range-preset";
import { SimpleDatePicker } from "./components/date-picker/simple-date-picker/simple-date-picker";
import { useDropDown } from "./components/drop-down/use-drop-down";
import { DropDown } from "./components/drop-down/drop-down";
import { Button } from "./components/button/button";
import NavBar from "./components/navbar/nav-bar";
import Tabs from "./components/tabs/tabs";
import TabsWithOwlet from "./components/tabs/tabs-with-oulet/tabs-with-oulet";
import { tabItems, tabItemsWithOWlet } from "./utils/helper/tabs-data-helper";
import { RadioGroup } from "./components/radio-group/radio-group";

const App = () => {
  const [showPopOver, setShowPopOver] = useState<boolean>(false);
  const [showDoubleCalendar, setShowDoubleCalendar] = useState<boolean>(false);

  const [showPresetRange, setShowPresetRange] = useState<boolean>(false);

  const dropDownBehavior = useDropDown();

  return (
    <div>
      <Button
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
      </Button>

      <Button
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
      </Button>

      <Button
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
      </Button>

      <Button
        onClick={dropDownBehavior.toggleDropdown}
        style={{
          margin: 20,
          padding: 10,
          pointerEvents: dropDownBehavior.isOpen ? "none" : undefined,
          position: "relative",
        }}
      >
        Dropdown
        <div>
          <DropDown
            isOpen={dropDownBehavior.isOpen}
            onClose={dropDownBehavior.onClose}
            customStyles={{
              width: 400,
              height: 200,
              borderRadius: 10,
              padding: 10,
              marginTop:10
            }}
          />
        </div>
      </Button>

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
        <DateRangePreset isOpen={showPresetRange} />
      </PopOver>

      <NavBar />

      {/* <Tabs
        tabItems={tabItems}
        customStyles={{
          marginBottom: 50,
        }}
      /> */}

      <RadioGroup />

      <TabsWithOwlet tabItemsWithOWlet={tabItemsWithOWlet} />
    </div>
  );
};

export default App;
