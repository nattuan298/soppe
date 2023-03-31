import { useSelector } from "react-redux";
import { RootState } from "src/state/store";
import Main from "./main";
import OTP from "./OTP";

export function Step1() {
  const showOtpPage = useSelector((state: RootState) => state.signup.showOtpPage);

  return (
    <div>
      {!showOtpPage && <Main />}
      {showOtpPage && <OTP />}
    </div>
  );
}
