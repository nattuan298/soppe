import * as yup from "yup";

export const notificationSchema = yup.object().shape({
  topic: yup.string().trim().max(255, "please_fill_in_a_correct_topic").required("required_fields"),
  hyperlink: yup.string().trim().max(255, "please_fill_in_a_correct_topic"),
  detail: yup
    .string()
    .trim()
    .max(2500, "Please fill in a correct details")
    .required("required_fields"),
  target: yup.string().trim().required("required_fields"),
  channel: yup.array().min(1, "required_fields"),
  publishDate: yup.string().trim().required("required_fields"),
  category: yup.string().trim().required("required_fields"),
  status: yup.string().trim().required("required_fields"),
});
