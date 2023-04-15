import * as yup from "yup";

export const roleSchema = yup.object().shape({
  roleName: yup.string().trim().required("required_fields"),
});
