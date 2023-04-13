import * as yup from "yup";

export const userSchema = yup.object().shape({
  // personal information
  firstName: yup.string().trim().required("required_fields"),
  lastName: yup.string().trim().required("required_fields"),
  email: yup
    .string()
    .trim()
    .matches(
      /^([^~!#$%&^<>()[\]\\.,;:\s@"]+(\.[^~!#$%&^<>()[\]\\.,;:\s@"]+)*)@[a-z0-9](([a-z\-0-9]+\.)+[a-zA-Z]{2,})$/,
      "please_fill_in_a_correct_email",
    ),
  phoneNumber: yup
    .string()
    .trim()
    .matches(/^[0-9]+$/, "please_fill_in_a_correct_phone_number")
    .max(15, "please_fill_in_a_correct_phone_number"),
  // shipping address
  shippingFirstName: yup.string().trim().required("required_fields"),
  shippingLastName: yup.string().trim().required("please_fill_in_a_correct_last_name"),
  shippingPhoneNumber: yup
    .string()
    .trim()
    .required("required_fields")
    .matches(/^[0-9]+$/, "please_fill_in_a_correct_phone_number")
    .max(15, "please_fill_in_a_correct_phone_number"),
  shippingPostalCode: yup.string().trim().required("required_fields"),
  shippingAddress: yup.string().trim().required("required_fields"),
  // billing address
  billingFirstName: yup.string().trim().required("required_fields"),
  billingLastName: yup.string().trim().required("required_fields"),
  billingPhoneNumber: yup
    .string()
    .trim()
    .required("required_fields")
    .matches(/^[0-9]+$/, "please_fill_in_a_correct_phone_number")
    .max(15, "please_fill_in_a_correct_phone_number"),
  billingPostalCode: yup.string().trim().required("required_fields"),
  billingAddress: yup.string().trim().required("required_fields"),
});
