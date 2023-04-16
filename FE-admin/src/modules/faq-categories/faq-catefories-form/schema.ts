import * as yup from "yup";

export const internalUserSchema = yup.object().shape({
  category: yup.string().trim().required("required_fields"),
});
