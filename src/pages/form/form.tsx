import React from "react";
import { InputForm } from "../../components/input-form/inputForm";
import { InputSelectForm } from "../../components/input-select/InputSelect";

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

        <div>create your account in a second to receive our latest new</div>
        <InputForm
          onChange={(e) => {
            console.log("e", e.target.value);
          }}
          label="Email"
          placeholder="Email"
        />

        <InputForm label="Password" type="password" placeholder="password" />

        <InputSelectForm label="Hello les amis " />
      </div>
    </section>
  );
};
