import * as yup from "yup";

export const internalUserSchema = yup.object().shape({
  name: yup.string().trim().required("required_fields"),
});
