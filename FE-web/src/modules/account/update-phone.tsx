import useTranslation from "next-translate/useTranslation";
import { ButtonMui, ButtonMuiLight, Title } from "src/components";
import SelectPhoneCode from "src/components/select/phone_code";
import InputOnlyNumber from "src/components/input/only-number";
import { ChangeEvent, useState } from "react";
import useCounter from "src/hooks/conter";
import { TimeResendOtp } from "src/constants/signup";
import { updateScreen } from "src/feature/update-account-infor/slice";
import { useDispatch } from "react-redux";
import axios from "src/lib/client/request";
import { convertTimeToMinute } from "src/utils/product";
import { apiRoute } from "src/constants/apiRoutes";
import { changePhoneConnectStatus } from "src/feature/user/slice";

export default function UpdatePhone({ screen }: { screen: string }) {
  const { t } = useTranslation("common");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("66");
  const { counter, setCounter } = useCounter(0);
  const [otp, setOtp] = useState("");
  const [requestIdPhone, setRequestIdPhone] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    phoneNumber: "",
    otp: "",
  });

  const handleChangeScreen = (val: string) => {
    dispatch(updateScreen(val));
  };

  const handleChangePhoneCode = (val: string) => {
    setPhoneCode(val);
  };

  const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;

    if (newVal.length <= 15 && phoneNumber !== newVal) {
      setPhoneNumber(newVal);
    }
  };

  const reSendOTP = () => {
    // resend OTP
    handleSendPhoneNumber();
    setCounter(TimeResendOtp);
  };

  const handleClick = async () => {
    if (screen === "phone") {
      try {
        setloading(true);
        await handleSendPhoneNumber();
        setCounter(TimeResendOtp);
        handleChangeScreen("otp");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const message = e.response?.data?.message || "";
        setErrors((pre) => ({ ...pre, phoneNumber: message }));
      }
      setloading(false);
    } else {
      handleSendOtp();
      // sent OTP
    }
  };

  const handleSendPhoneNumber = async () => {
    let newPhoneNumber = phoneNumber;
    if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
      newPhoneNumber = phoneNumber.slice(1);
    }

    const res = await axios.post(apiRoute.signup.postPhoneNumber, {
      phoneNumber: newPhoneNumber,
      phoneCode,
    });

    setRequestIdPhone(res.data);
  };

  const handleSendOtp = async () => {
    try {
      setloading(true);
      let newPhoneNumber = phoneNumber;
      if (["66", "84"].includes(phoneCode) && phoneNumber.charAt(0) === "0") {
        newPhoneNumber = phoneNumber.slice(1);
      }
      await axios.post(apiRoute.signup.postOTP, {
        code: otp,
        phoneNumber: newPhoneNumber,
        requestId: requestIdPhone,
        phoneCode,
      });

      await axios.put(apiRoute.members.mobileConnection, {
        phoneCode,
        phoneNumber,
        smsAuth: true,
      });
      dispatch(changePhoneConnectStatus(true));
      handleChangeScreen("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message = e.response?.data?.message || "";
      setErrors((pre) => ({ ...pre, otp: message }));
    }
    setloading(false);
  };

  const handleChangeOtp = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;

    if (newVal.length <= 6 && otp !== newVal) {
      setOtp(newVal);
    }
  };

  const disabled = (screen === "phone" && !phoneNumber) || (screen === "otp" && otp?.length !== 6);

  return (
    <div className="grid md:grid-cols-5">
      <div className="md:col-span-4">
        {screen === "otp" && <Title title="OTP" className="mb-1" isRequired />}
        {screen === "phone" && <Title title={t`phone-number`} className="mb-1" />}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-0">
          <div className="col-span-1 row-span-1">
            {screen === "otp" && (
              <div className="flex justify-between ">
                <div className="pr-3 w-full md:w-[calc(100%-160px)]">
                  <InputOnlyNumber
                    placeholder={`6 ${t("digits-otp")}`}
                    value={otp}
                    onChange={handleChangeOtp}
                    helperText={errors.otp}
                    error={!!errors.otp}
                  />
                </div>

                <div className="w-[160px]">
                  <ButtonMuiLight
                    variant="outlined"
                    textClassName="font-normal"
                    disabled={counter > 0}
                    onClick={reSendOTP}
                    fullWidth
                  >
                    {counter > 0 && t`resend-in` + ` ${convertTimeToMinute(counter)}s`}
                    {counter === 0 && t`send-otp`}
                  </ButtonMuiLight>
                </div>
              </div>
            )}

            {screen === "phone" && (
              <SelectPhoneCode
                phoneCode={phoneCode}
                phoneNumber={phoneNumber}
                handleChangePhoneCode={handleChangePhoneCode}
                handleChangePhoneNumber={handleChangePhoneNumber}
                placeholderInput={t`phone-number`}
                phoneNumberError={errors.phoneNumber}
              />
            )}
          </div>

          <div className="col-span-1 row-span-1">
            <ButtonMui
              textClassName="font-normal"
              onClick={handleClick}
              disabled={disabled || loading}
              showCircle={loading}
            >{t`submit`}</ButtonMui>
          </div>
        </div>
      </div>
    </div>
  );
}
