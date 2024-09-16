import * as yup from "yup";

export const updateSchema = yup.object({
  email: yup.string().required("Email is required").email("Email is not valid"),
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  phone: yup.string(),
  address: yup.string(),
  age: yup.string(),
  job: yup.string(),
});

export const allUserSchema = yup.object({
  email2: yup.string().required("Email is required").email("Email is not valid"),
  name2: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  phone2: yup.string(),
  address2: yup.string(),
  age2: yup.string(),
  job2: yup.string(),
  _id: yup.string(),
});
