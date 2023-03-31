/* eslint-disable indent */
import useTranslation from "next-translate/useTranslation";
// import { ReactChild  } from "react";
import { useSelector } from "react-redux";
import { StepHorizontal } from "src/components";
import { ImageDelivery } from "src/components/image-delivery";
import { steps } from "src/constants/signup";
import { RootState } from "src/state/store";
import { Footer } from "./footer";
import { Step1 } from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";
import SignupCheckout from "../sign-up-checkout";
import SignUpSuccess from "./signup-success";
import SignUpPending from "./signup-pending";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useLoggedIn from "src/hooks/useLoggedIn";
import { GetAppFooter } from "src/components/GetAppFooter";
import { notifyToast } from "src/constants/toast";

export function SignUpForm() {
  const { t } = useTranslation("common");
  const { isLoggedIn } = useLoggedIn();
  const router = useRouter();
  const mainStep = useSelector((state: RootState) => state.signup.mainStep);
  const { totalPrice: totalPriceParam } = router.query;
  const [payment, setpayment] = useState(!!totalPriceParam);
  // const dispatch = useDispatch();
  useEffect(() => {
    setpayment(!!totalPriceParam);
  }, [totalPriceParam]);
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);
  useEffect(() => {
    if (mainStep === 6) {
      notifyToast("default", "common:payment_successfully", t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainStep]);
  const classStepSuccess = useMemo(() => {
    if (mainStep === (6 || 7)) {
      return true;
    }
    return false;
  }, [mainStep]);
  return (
    <div>
      {mainStep !== 5 && (
        <div className={`${classStepSuccess && "min-h-[40rem]"} sm:min-h-62.5 block`}>
          <div className="sm:w-1216 relative mx-auto w-full">
            <div className={`${!classStepSuccess && "hidden sm:block"}`}>
              <ImageDelivery />
            </div>
            <div
              className={`
               ${
                 classStepSuccess
                   ? "relative left-0 top-7 rounded-0.625 w-[355px] mx-auto sm:z-0 z-10 shadow-full py-[30px] px-3 sm:py-2 sm:px-2"
                   : " sm:p-paddingLogin sm:shadow-full w-full rounded-lg p-2 mt-3"
               } sm:absolute sm:w-signIn Sm:left-10 h-auto sm:top-24 bg-white`}
            >
              <div
                className={`text-xl mb-4 font-medium ${!classStepSuccess && "hidden sm:block"}`}
              >{t`sign-up`}</div>
              {mainStep < 5 && (
                <div className="pl-2 pr-2">
                  <StepHorizontal steps={steps} activeStep={mainStep} />
                  <div className="mt-6 mb-6">
                    {payment && <Step5 />}
                    {!payment && (
                      <>
                        {mainStep === 0 && <Step1 />}
                        {mainStep === 1 && <Step2 />}
                        {mainStep === 2 && <Step3 />}
                        {mainStep === 3 && <Step4 />}
                        {mainStep === 4 && <Step5 />}
                      </>
                    )}
                  </div>
                  <Footer />
                </div>
              )}
              {mainStep === 6 && (
                <div className="w-full">
                  <SignUpSuccess />
                  <div className="flex my-7 items-center">
                    <div className="w-1/2 h-[1px] bg-[#F4F5FA]"></div>
                    <span className="mx-2 text-[#BCBCBC] text-[13px]">Or</span>
                    <div className="w-1/2 h-[1px] bg-[#F4F5FA]"></div>
                  </div>
                  <div className="text-[#231F20] text-[18px] font-medium m-auto w-max mb-10">
                    Download the mobile app
                  </div>
                  <GetAppFooter className="sm:space-x-9" />
                </div>
              )}
              {mainStep === 7 && (
                <div className="w-full">
                  <SignUpPending />
                  <div className="flex my-7 items-center">
                    <div className="w-1/2 h-[1px] bg-[#F4F5FA]"></div>
                    <span className="mx-2 text-[#BCBCBC] text-[13px]">Or</span>
                    <div className="w-1/2 h-[1px] bg-[#F4F5FA]"></div>
                  </div>
                  <div className="text-[#231F20] text-[18px] font-medium m-auto w-max mb-10">
                    Download the mobile app
                  </div>
                  <GetAppFooter className="sm:space-x-9" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: mainStep === 5 ? "block" : "none" }}>
        <SignupCheckout />
      </div>
    </div>
  );
}
