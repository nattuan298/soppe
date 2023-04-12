import useTranslation from "next-translate/useTranslation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMui, Link } from "src/components";
import { routeSigninBase } from "src/constants/routes";
import {
  actionSetErrors,
  clearDataWhenChangeCountry,
  clearDataWhenCityzenChange,
  clickNext,
  skipPhoneNumber,
} from "src/feature/signup/slice";
import {
  fetchGetBank,
  fetchGetCity,
  fetchPostOtpSignup,
  fetchPostVerifyIDCard,
} from "src/feature/signup/action";
import { validateEmail } from "src/lib/validate";
import { RootState } from "src/state/store";
import LinkRouter from "next/link";

interface FooterPropsType {
  title?: string | boolean;
}

export function Footer({ title }: FooterPropsType) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const ref = useRef<HTMLButtonElement>(null);

  const {
    phoneNumber,
    mainStep,
    otp,
    showOtpPage,
    firstName,
    lastName,
    isSelectCountry,
    postalCode,
    address,
    city,
    district,
    subDistrict,
    idCardNumber,
    childStep4,
    loadingNextStep,

    email,
    isEdit,
    prePhoneNumber,
    preCountry,
    country,
    citizenship,
    preCitizen,
    listDistrict,
    litSubDistrict,
  } = useSelector((state: RootState) => state.signup);

  const onClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (mainStep === 0 && !showOtpPage) {
      if (!validateEmail(email) && email) {
        return dispatch(actionSetErrors({ email: "email_wrong_format" }));
      }
      if (isEdit && prePhoneNumber === phoneNumber) {
        return dispatch(clickNext());
      }
      // return dispatch(postphoneNumber({}));
      return dispatch(skipPhoneNumber());
    }
    if (mainStep === 0 && showOtpPage) {
      return dispatch(fetchPostOtpSignup(otp));
    }
    if (mainStep === 2 && isSelectCountry && preCountry !== country) {
      dispatch(fetchGetBank());
      dispatch(clearDataWhenChangeCountry());
      return dispatch(fetchGetCity());
    }
    if (mainStep === 1 && citizenship !== preCitizen) {
      dispatch(clearDataWhenCityzenChange());
    }
    if (mainStep === 3 && childStep4 === 0) {
      return dispatch(fetchPostVerifyIDCard());
    }
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(clickNext());
  };

  const disabledButtonStep1: boolean = useMemo(() => {
    if (mainStep === 0) {
      if (!phoneNumber || (otp?.length < 6 && showOtpPage)) {
        return true;
      }
    }

    return false;
  }, [phoneNumber, mainStep, otp, showOtpPage]);

  const disabledButtonStep2: boolean = useMemo(() => {
    if (mainStep === 1 && (!firstName.trim() || !lastName.trim())) {
      return true;
    }
    return false;
  }, [mainStep, firstName, lastName]);

  const disabledButtonStep3: boolean = useMemo(() => {
    if (mainStep === 2) {
      if (isSelectCountry) {
        return !postalCode;
      }
      return !(
        (city.title || city.titleEng) &&
        (district.title || district.titleEng || listDistrict?.length === 0) &&
        (subDistrict.title || subDistrict.titleEng || litSubDistrict?.length === 0) &&
        address.trim()
      );
    }
    return false;
  }, [
    mainStep,
    isSelectCountry,
    postalCode,
    city,
    district,
    subDistrict,
    address,
    listDistrict,
    litSubDistrict,
  ]);

  const disabledButtonStep4: boolean = useMemo(() => {
    if (mainStep === 3) {
      if (childStep4 === 0) {
        return !idCardNumber.trim();
      }

      // if (childStep4 === 1) {
      //   return !(bankCode && bankBranch.trim() && accountName.trim() && accountNumber);
      // }
    }

    return false;
  }, [mainStep, childStep4, idCardNumber]);

  const disabledButton =
    disabledButtonStep1 ||
    disabledButtonStep2 ||
    disabledButtonStep3 ||
    disabledButtonStep4 ||
    loadingNextStep;

  const buttonTitle = useMemo(() => {
    if (mainStep === 0 && showOtpPage) {
      return "submit";
    }

    if (mainStep === 4) {
      return "confirm";
    }

    return "next";
  }, [mainStep, showOtpPage]);

  const onKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter" && ref.current?.disabled === false) {
      ref.current?.click();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keypress", onKeyPress);

    return () => {
      window.removeEventListener("keypress", onKeyPress);
    };
  }, [onKeyPress]);

  return (
    <div className="mt-6">
      <ButtonMui onClick={onClick} disabled={disabledButton} ref={ref}>
        {t(`${buttonTitle}`)}
      </ButtonMui>
      {mainStep === 4 && (
        <div className="mt-4">
          <span className="text-lighterGray text-0.8125 ">{t`agree_platform`}</span>
          <div className="flex text-lighterGray text-0.8125">
            <LinkRouter href={""}>
              <a
                target={"_blank"}
                className="text-orange mr-1 hover:cursor-pointer hover:underline"
              >{t`privacy_policy`}</a>
            </LinkRouter>
            {t`and`}
            <LinkRouter href={""}>
              <a
                target={"_blank"}
                className="text-orange ml-1 hover:cursor-pointer hover:underline"
              >{t`usage_conditions`}</a>
            </LinkRouter>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <span className="text-lighterGray mr-2">{title || t`already-has-an-account`}</span>

        <Link
          href={routeSigninBase}
          className="text-orange lowercase hover:cursor-pointer hover:underline"
        >{t`sign-in`}</Link>
      </div>
    </div>
  );
}
