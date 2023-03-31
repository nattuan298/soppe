import useTranslation from "next-translate/useTranslation";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { Button, ButtonMuiLight, Title } from "src/components";
import InputOnlyNumber from "src/components/input/only-number";
import { TimeResendOtp } from "src/constants/signup";
import { actionResetState, handleChangeField } from "src/feature/signin/sign-in-phone-number-slice";
import { fetchSigninPhoneOTP } from "src/feature/signin/sign-in.actions";
import { fetchPostPhoneNumber } from "src/feature/signup/action";
import useCounter from "src/hooks/conter";
import { RootState } from "src/state/store";
import { useRouter } from "next/router";
import { notifyToast } from "src/constants/toast";
import { convertTimeToMinute } from "src/utils/product";
import { setCookie } from "src/lib/cookie";
import { getOSType, updateToken } from "src/lib/common.lib";

const cookies = new Cookies();
export default function Otp() {
  const { t } = useTranslation("common");
  const [OSName, setOSName] = useState("Unknown OS");
  const dispatch = useDispatch();
  const { counter, setCounter } = useCounter(TimeResendOtp);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { otp, payload, errors } = useSelector((state: RootState) => state.signinPhoneNumber);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    setOSName(getOSType());
  }, []);

  const resaveCookie = useCallback(
    async (name: string, payload: string | number | object) => {
      try {
        await setCookie(name, payload);
        router.push("/");
      } catch (error) {}
    },
    [router],
  );

  useEffect(() => {
    const clearState = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const isReset = (await dispatch(actionResetState())) as {
        type?: string;
      };
    };
    return () => {
      clearState();
    };
  }, []);

  useEffect(() => {
    if (payload.status === 200) {
      const { accessToken, refreshToken, ...member } = payload.data;
      accessToken && updateToken(accessToken, refreshToken);
      cookies.set("member", member);
      cookies.remove("LocationBase");
      resaveCookie("member", member);
    } else if (payload.statusCode === 401) {
      setLoading(false);
      notifyToast("error", `${payload.message}`);
    } else if (payload.statusCode === 400) {
      setLoading(false);
      notifyToast("error", `${payload.message}`);
    }
  }, [payload, router, resaveCookie]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;

    if (newVal.length <= 6 && otp !== newVal) {
      dispatch(handleChangeField({ otp: newVal }));
    }
  };
  useEffect(() => {
    if (errors) {
      setLoading(false);
    }
  }, [errors]);
  const onclick = () => {
    dispatch(fetchPostPhoneNumber());
    setCounter(TimeResendOtp);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length < 6) {
      console.log("vao day");
      setErrorText(t`OTP_must_have_6_digits`);
    } else {
      setLoading(true);
      setErrorText(null);
      e.preventDefault();
      dispatch(fetchSigninPhoneOTP({ code: otp, OSName }));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Title title="OTP" />
        <div className="flex justify-between ">
          <div className="pr-3 mb-4" style={{ width: "calc(100% - 160px )" }}>
            <InputOnlyNumber
              placeholder={`6 ${t("digits-otp")}`}
              value={otp}
              onChange={handleChange}
              helperText={(errorText && errorText) || (errors.otp && errors.otp)}
              error={!!errorText || !!errors.otp}
            />
          </div>

          <div style={{ width: 160 }}>
            <ButtonMuiLight
              variant="outlined"
              textClassName="font-normal"
              disabled={counter > 0}
              onClick={onclick}
              fullWidth
            >
              {counter > 0 && t`resend-in` + ` ${convertTimeToMinute(counter)}s`}
              {counter === 0 && t`send-otp`}
            </ButtonMuiLight>
          </div>
        </div>
        <Button
          type="submit"
          loadingSize={30}
          colorClass="text-white"
          className="bg-orange hover:bg-lighterOrange focus:ring-0 h-12 w-full sm:w-21.5 rounded-md mb-6 text-white font-bold text-base"
          loading={loading}
        >{t`signin`}</Button>
      </form>
    </div>
  );
}
