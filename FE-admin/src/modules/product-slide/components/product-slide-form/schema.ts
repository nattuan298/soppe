import * as yup from "yup";

export const internalProductSlide = yup.object().shape({
  name: yup.string().trim().required("required_fields").min(3, "pls-enter-at-least-3-chars"),
});
