import React, { useState } from "react";

export function useFormInput(initialText: string) {
  const initialError = {
    errorUserId: "",
    errorPassword: "",
    errorInvalid: "",
  };
  const [value, setValue] = useState(initialText);
  const [error, setError] = useState(initialError);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (error.errorUserId) {
      setValue(e.target.value);
      setError({ ...error, errorUserId: "" });
    }
    if (error.errorPassword) {
      setValue(e.target.value);
      setError({ ...error, errorPassword: "" });
    }
    setValue(e.target.value);
  }
  const handleChangeError = (errorText: string) => {
    if (errorText === "both empty") {
      const newError = {
        errorUserId: "required_fields",
        errorPassword: "required_fields",
        errorInvalid: "",
      };
      setError(newError);
    } else if (errorText === "user ID empty") {
      const newError = { ...error, errorUserId: "required_fields" };
      setError(newError);
    } else if (errorText === "password empty") {
      const newError = { ...error, errorPassword: "required_fields" };
      setError(newError);
    } else if (errorText === "Bad Request") {
      const newError = {
        errorUserId: "",
        errorPassword: "",
        errorInvalid:
          "Your member ID or password is invalid. Please try again or reset your password",
      };
      setError(newError);
    }
  };
  const handleBlur = () => {
    setValue(value.trim());
  };

  return {
    value,
    error,
    handleChange,
    handleChangeError,
    handleBlur,
  };
}
