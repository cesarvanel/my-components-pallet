import React from "react";
import { InputForm } from "../../components/input-form/inputForm";
import { InputSelectForm } from "../../components/input-select/InputSelect";
import PrimaryButton from "../../components/button/primary-button/PrimaryButton";
import { OptionSelect } from "../../utils/type/type";
import InputCheckbox from "../../components/checkbox/Checkbox";
import ToggleSwitch from "../../components/toggle-switch/ToggleSwitch";

const options: OptionSelect[] = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
  { id: 4, label: "Option 4" },
];

export const FormPage: React.FC = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: 480,
          height: 540,
          display: "flex",

          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          gap: 20,
        }}
      >
        <div
          style={{
            color: "#1F81B9",
            fontFamily: "Bold",
            fontSize: 24,
          }}
        >
          Create your Account
        </div>

        <div style={{ color: "#333333" }}>
          create your account in a second to receive our latest new
        </div>
        <InputForm
          onChange={(e) => {
            console.log("e", e.target.value);
          }}
          label="Email"
          placeholder="Email"
        />

        <InputForm
          description="At least 8 characters"
          label="Password"
          type="password"
          placeholder="Password"
        />

        <InputSelectForm options={options} label="Year of experience  " />

        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <InputCheckbox label="Remember Me" />
        </div>

        <PrimaryButton type="button" label="Create Account" />

        <ToggleSwitch />
      </div>
    </section>
  );
};
