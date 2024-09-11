import React from "react";
import { InputForm } from "../../components/input-form/inputForm";

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
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:"red", 
          padding:20

        }}
      >
        <InputForm
          label="Email"
          placeholder="Email"
        />
      </div>
    </section>
  );
};
