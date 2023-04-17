import * as yup from "yup";

export const internalBannerLoop = yup.object().shape({
  name: yup.string().trim().required("required_fields"),
});
