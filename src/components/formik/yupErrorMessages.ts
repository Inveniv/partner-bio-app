import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "Field is required",
  },

  array: {
    min: ({ min }) => {
      return `Field must have at least ${min} item${min === 1 ? "" : "s"}`;
    },
    max: ({ max }) => {
      return `Field must have at most ${max} item${max === 1 ? "" : "s"}`;
    },
  },

  string: {
    email: "Field must be a valid email",
    url: "Field must be a valid URL",
    length: ({ length }) => {
      return `Field must be exactly ${length} characters`;
    },
    min: ({ min }) => {
      return `Field must be at least ${min} character${min === 1 ? "" : "s"}`;
    },
    max: ({ max }) => {
      return `Field must be at most ${max} character${max === 1 ? "" : "s"}`;
    },
    uuid: "Field must be a valid UUID",
  },

  number: {
    min: ({ min }) => {
      return `Field must be greater than or equal to ${min}`;
    },
    max: ({ max }) => {
      return `Field must be less than or equal to ${max}`;
    },
  },
  // number: {
  //   min: ({ min, label }) => ({
  //     key: "FORMS.ERROR.FIELD_MIN",
  //     values: { label, min },
  //   }),
  //   max: ({ max, label }) => ({
  //     key: "FORMS.ERROR.FIELD_MAX",
  //     values: { label, max },
  //   }),
  // },
});
