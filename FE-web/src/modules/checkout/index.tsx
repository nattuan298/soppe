import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { StepHorizontal } from "src/components";
import { steps } from "src/constants/checkout";
import { handleChangeField, saveStore } from "src/feature/checkout/thunkAction";
import { fetchCheckoutGetListAddress, fetchCheckoutGetListCity } from "src/feature/checkout/action";
import { deleteMultyProduct } from "src/feature/shopping-cart/slice";
import { RootState } from "src/state/store";
import Footer from "./footer";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import NumberFormatCustome from "../../components/text/number-format";
import { useLocationBase } from "../../hooks";

const cookies = new Cookies();

export default function Checkout() {
  const { t, lang } = useTranslation("common");
  const dispatch = useDispatch();
  const { mainStep, totalPrice } = useSelector((state: RootState) => state.checkout);
  const router = useRouter();
  const { token, totalPrice: totalPriceParam, chargeId } = router.query;
  const [showStep3, setShowStep3] = useState(!!(totalPriceParam || token));
  const { symbol } = useLocationBase();

  useEffect(() => {
    if (totalPriceParam || token || chargeId || mainStep === 2) {
      return;
    }
    dispatch(fetchCheckoutGetListAddress());
    dispatch(fetchCheckoutGetListCity({ isFirstLoad: true }));
    const memberCookies = cookies.get("member");
    const locationBase = memberCookies?.locationBase;
    if (locationBase) {
      dispatch(handleChangeField({ locationBase }));
      if (memberCookies.locationBase !== "Thailand") {
        dispatch(handleChangeField({ shippingType: "Pickup" }));
        dispatch(handleChangeField({ paymentMethod: "SCM Point" }));
      }
    }
    dispatch(saveStore());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, lang]);

  useEffect(() => {
    setShowStep3(false);
  }, []);

  useEffect(() => {
    if (totalPriceParam || token || chargeId) {
      return;
    }

    const productsCodeString = localStorage.getItem("needToRemoveProduct");

    if (productsCodeString) {
      localStorage.removeItem("needToRemoveProduct");

      const productsCode = JSON.parse(productsCodeString);
      dispatch(deleteMultyProduct(productsCode));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const title = useMemo(() => {
    if (mainStep === 1) {
      return t`shipping_information`;
    }
    if (mainStep === 2) {
      return t`payment_method`;
    }
    return t`order_summary`;
  }, [mainStep, t]);
  const gridStep = useMemo(() => {
    if (mainStep === 0) {
      return "grid-rows-2";
    }
    return "grid-rows-1";
  }, [mainStep]);
  const renderStep = () => {
    if (showStep3) {
      return <Step3 />;
    }

    if (mainStep === 0) return <Step1 />;
    if (mainStep === 1) return <Step2 />;
    if (mainStep === 2) return <Step3 />;

    return null;
  };

  return (
    <div className="mx-[16px] sm:mx-auto w-auto sm:w-1216 relative mb-8">
      <div className="grid grid-cols-10 mt-4">
        <div className="col-span-10 sm:col-span-7">
          <div
            className={`grid grid-cols-12 ${gridStep}  ${
              mainStep === 0 && "grid-rows-3"
            } sm:grid-rows-1 items-center`}
          >
            <div
              className={`col-span-12 sm:col-span-3 row-span-1${
                (mainStep === 1 || mainStep === 2) && " hidden sm:block"
              }`}
            >
              <span className="text-base sm:text-lg font-medium">{title}</span>
            </div>
            <div className="col-span-12 row-start-1 sm:row-start-auto sm:col-span-9 row-span-2">
              <StepHorizontal steps={steps} activeStep={mainStep} />
            </div>
          </div>
          {renderStep()}
          <div className="fixed bottom-0 right-0 rounded-0.625 shadow-modal sm:shadow-none bg-white sm:bg-transparent z-10 sm:z-0 w-full sm:w-auto sm:static grid grid-cols-12 p-4 sm:p-0 sm:block items-center">
            <div className="block sm:hidden text-lg col-span-6">
              {t`total`}:&nbsp;&nbsp;
              <NumberFormatCustome value={totalPrice} prefix={symbol} />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
