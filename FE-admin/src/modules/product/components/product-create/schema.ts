import * as yup from "yup";

export const product = yup.object().shape({
  productName: yup.string().trim().required("required_fields"),
  description: yup.string().trim().required("required_fields"),
  stock: yup.string().trim().required("required_fields"),
  price: yup.string().trim().required("required_fields"),
  categoryId: yup.string().trim().required("required_fields"),
});
