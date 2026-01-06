import * as Yup from "yup";

export const signupSchemaValidation = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Pasword is required")
    .min(8, "Password must be atleast of 8 characters long"),
});
export const signInSchemaValidation = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Pasword is required")
    .min(8, "Password must be atleast of 8 characters long"),
});
