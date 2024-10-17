import React, { FormEvent, useState } from "react";
import { InputForm } from "../../components/input-form/inputForm";

import PrimaryButton from "../../components/button/primary-button/PrimaryButton";
import InputCheckbox from "../../components/checkbox/Checkbox";
import {
  InputSelectWithMultipleType,
  SelectOption,
} from "../../components/input-select-with-multiple/InputSelectWithMultipleType";


const optionsWithMultiple = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

export const FormPage: React.FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };


  const [multipleOption, setMultipleOption] = useState<SelectOption[]>([]);

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 480,
          display: "flex",
          justifyContent: "center",
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

        <div style={{ color: "#333333", textAlign: "center" }}>
          create your account in a second to receive our latest new
        </div>
        <InputForm
          onChange={(e) => {
            console.log("e", e.target.value);
          }}
          label="Email"
          placeholder="Email"
          name="email"
        />

        <InputForm
          description="At least 8 characters"
          label=""
          type="password"
          placeholder="Password"
          name="password"
        />

        <InputSelectWithMultipleType
          label="Year of experience"
          multiple
          options={optionsWithMultiple}
          value={multipleOption}
          onChange={(option) => {
            setMultipleOption(option);
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <InputCheckbox label="Remember Me" name="remember" />
        </div>

        <PrimaryButton type="submit" label="Create Account" />
      </form>
    </section>
  );
};
