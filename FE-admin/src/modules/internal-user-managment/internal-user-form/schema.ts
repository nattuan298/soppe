import * as yup from "yup";

export const internalUserSchema = yup.object().shape({
  firstName: yup.string().trim().required("required_fields"),
  lastName: yup.string().trim().required("required_fields"),
  jobTitle: yup.string().trim().required("required_fields"),
  email: yup
    .string()
    .trim()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please_fill_in_a_correct_email",
    )
    .required("required_fields"),
  phoneNumber: yup
    .string()
    .required("required_fields")
    .matches(/^[0-9]+$/, "please_fill_in_a_correct_phone_number")
    .max(15, "please_fill_in_a_correct_phone_number"),
});

export const passwordSchemaCreate = yup
  .string()
  .trim()
  .required("required_fields")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "please_fill_in_a_correct_password",
  );

export const passwordSchemaEdit = yup
  .string()
  .trim()
  .required("required_fields")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "please_fill_in_a_correct_password",
  );

export const signinFormSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .max(255)
    .required("required_fields")
    .matches(/^[\w-.]+@/, "email_is_wrong_format"),
  password: yup.string().required("required_fields"),
});
