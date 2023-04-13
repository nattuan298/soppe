import * as yup from "yup";

export const internalBannerLoop = yup.object().shape({
  name: yup.string().trim().required("required_fields"),
  totalDuration: yup
    .number()
    .required("required_fields")
    .max(10, "banner_duration_number_must_be_from_1_to_10s")
    .min(0, "banner_duration_number_must_be_from_1_to_10s"),
});
