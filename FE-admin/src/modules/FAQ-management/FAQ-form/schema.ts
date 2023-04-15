import * as yup from "yup";

export const internalUserSchema = yup.object().shape(
  {
    questionTh: yup.string().when(["questionEn", "answerTh"], {
      is: (questionEn: string | any[], answerTh: string | any[]) => {
        return !questionEn || answerTh;
      },
      then: yup.string().trim().required("required_fields"),
    }),
    questionEn: yup.string().when(["questionTh", "answerEn"], {
      is: (questionTh: string | any[], answerEn: string | any[]) => {
        return !questionTh || answerEn;
      },
      then: yup.string().trim().required("required_fields"),
    }),
    answerTh: yup.string().when("questionTh", {
      is: (questionTh: string | any[]) => questionTh,
      then: yup.string().trim().required("required_fields"),
    }),
    answerEn: yup.string().when("questionEn", {
      is: (questionEn: string | any[]) => questionEn,
      then: yup.string().trim().required("required_fields"),
    }),
  },
  [
    ["questionEn", "questionTh"],
    ["questionEn", "answerEn"],
    ["questionTh", "answerTh"],
  ],
);
