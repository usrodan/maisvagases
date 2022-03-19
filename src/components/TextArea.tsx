import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function TextArea({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue = "", registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <textarea
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        rows={15}
        {...rest}
      />

      {error && <span style={{ color: "#f00" }}>{error}</span>}
    </>
  );
}
