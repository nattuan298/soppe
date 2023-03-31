import useTranslation from "next-translate/useTranslation";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMuiLight, Title } from "src/components";
import InputOnlyNumber from "src/components/input/only-number";
import { TimeResendOtp } from "src/constants/signup";
import { handleChangeField } from "src/feature/signup/slice";
import { fetchPostPhoneNumber } from "src/feature/signup/action";
import useCounter from "src/hooks/conter";
import { RootState } from "src/state/store";
import { convertTimeToMinute } from "src/utils/product";

export default function OTP() {
  const { t } = useTranslation("common");
  const { counter, setCounter } = useCounter(TimeResendOtp);
  const dispatch = useDispatch();
  const { otp, errors } = useSelector((state: RootState) => state.signup);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;

    if (newVal.length <= 6 && otp !== newVal) {
      dispatch(handleChangeField({ otp: newVal }));
    }
  };

  const onclick = () => {
    dispatch(fetchPostPhoneNumber());
    setCounter(TimeResendOtp);
  };

  return (
    <div>
      <Title title="OTP" />
      <div className="flex justify-between ">
        <div className="pr-3" style={{ width: "calc(100% - 160px )" }}>
          <InputOnlyNumber
            placeholder={`6 ${t("digits-otp")}`}
            value={otp}
            onChange={handleChange}
            helperText={errors.otp}
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
    </div>
  );
}
