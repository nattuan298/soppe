import * as yup from "yup";

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .max(255)
    .required("please_fill_in_your_email")
    .matches(/^[\w-.]+@/, "email_is_wrong_format"),
});

export const verifyOtpSchema = yup.object().shape({
  otpCode: yup.string().trim().required("please_fill_OTP_code"),
});

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .max(255)
    .required("required_fields")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "validate_password",
    ),
  confirmPassword: yup
    .string()
    .min(8, "confirmPassword_must_be_at_least_8_characters")
    .when("password", {
      // eslint-disable-next-line no-unneeded-ternary
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "the_password_confirmation_does_not_match"),
    })
    .required("required_fields"),
});
