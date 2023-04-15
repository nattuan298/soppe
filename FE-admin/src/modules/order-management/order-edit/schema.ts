import * as yup from "yup";

export const orderSchema = yup.object().shape({
  // shipping address
  shippingFirstName: yup.string().trim().required("required_fields"),
  shippingLastName: yup.string().trim().required("required_fields"),
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
