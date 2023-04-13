import * as yup from "yup";

export const internalBannerLoop = yup.object().shape({
  name: yup.string().trim().required("required_fields"),
  totalDuration: yup
    .number()
    .required("required_fields")
    .max(10, "Duration number must be from 1 to 10s")
    .min(0, "Duration number must be from 1 to 10s"),
});
