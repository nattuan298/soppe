import * as yup from "yup";

export const internalBanner = yup.object().shape({
  name: yup.string().trim().required("required_fields"),
  desktopBanner: yup.string().trim().required("upload_banner_image"),
  tabletBanner: yup.string().trim().required("upload_banner_image"),
  mobileBanner: yup.string().trim().required("upload_banner_image"),
});
