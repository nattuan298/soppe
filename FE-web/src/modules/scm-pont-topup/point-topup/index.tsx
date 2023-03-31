import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMui, ButtonMuiLight, LeftNavination, ModalConfirm, Title } from "src/components";
import InputOnlyNumber from "src/components/input/only-number";
import { routeAccountBase, routeCheckoutPointTopupBase } from "src/constants/routes";
import { resetOrder, resetStateCheckout, setTotalpoint } from "src/feature/scm-point-topup/slice";
import { fetchGetTotalSCMP } from "src/feature/scm-point-topup/action";
import { useLocationBase } from "src/hooks";
import { ModalSummaryInfo } from "./modal-summary-info";
import styles from "./style.module.css";
import { RootState } from "../../../state/store";
import NumberFormatCustome from "../../../components/text/number-format";

export function PointTopup() {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [total, setTotal] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [isOpenModalCancel, setIsOpenModalCancel] = useState<boolean>(false);
  const [confirmTypeCancel] = useState<"cancel">("cancel");
  const { locationBase } = useLocationBase();
  const { scmPoint } = useSelector((state: RootState) => state.user);

  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("OrderId");
    localStorage.removeItem("pointTopup");
    localStorage.removeItem("stateCheckoutPoint");
    dispatch(resetStateCheckout());
    dispatch(resetOrder());
    dispatch(fetchGetTotalSCMP());
  }, [dispatch]);
  const handleChangeTotal = (e: ChangeEvent<HTMLInputElement>) => {
    setTotal(e.target.value);
    setError("");
  };
  const handleConfirm = async () => {
    if (total === "") {
      setError("required_fields");
      return;
    }
    if (parseInt(total) > 1000000) {
      setError("topup_amount_validate");
      return;
    }
    if (!error) {
      const number = parseInt(total);
      localStorage.setItem("pointTopup", total);
      await dispatch(setTotalpoint(number));
      router.push(routeCheckoutPointTopupBase);
    }
  };
  const listCurrency = useMemo(() => {
    switch (locationBase) {
      case "Malaysia":
        return "MYR";
      case "Vietnam":
        return "VND";
      case "Thailand":
        return "THB";
      case "Singapore":
        return "SGD";
      case "Laos":
        return "LAK";
      case "Cambodia":
        return "USD";
      case "Myanmar":
        return "MMK";
    }
  }, [locationBase]);
  const handleConfirmCancel = async () => {
    setTotal("");
    router.push(routeAccountBase);
  };
  return (
    <div className="mx-auto w-full sm:w-1216 mb-8 mt-6 flex relative min-h-[647px] sm:min-h-0">
      <div className="sm:block hidden">
        <ModalSummaryInfo />
      </div>
      <div className="sm:block hidden w-1/4 mr-6">
        <LeftNavination />
      </div>
      <div className="w-full sm:w-3/4 flex">
        <div className="w-full sm:w-3/4">
          <div className="">
            <div className="w-auto sm:w-1/2 mx-4 sm:mx-0">
              <div className="block sm:hidden mb-[20px]">
                <div className="flex items-center">
                  <span className="text-sm mr-2">{t`your_current`}</span>
                  <div className="w-10 h-5 text-xs text-orange bg-opacity-10 bg-orange mr-2 flex justify-center items-center">
                    {t`SCMP`}
                  </div>
                  <span className="text-sm mr-1">
                    <NumberFormatCustome value={scmPoint} />
                  </span>
                  <div className="text-0.375 flex items-start h-5 flex-1">{t`points`}</div>
                </div>
              </div>
              <Title title={t`topup-amount`} isRequired />
              <InputOnlyNumber
                placeholder={t`topup-amount`}
                value={total.replace(/^0/g, "")}
                onChange={handleChangeTotal}
                error={!!error}
                helperText={error}
                t={t}
              />
              <div className="flex mb-6 mt-2.5">
                <div>{t`note`}:</div>
                <div className="font-light">
                  &nbsp;{t`text-change-point`}&nbsp;{listCurrency}
                </div>
              </div>
            </div>
            <div className="hidden sm:w-1/2"></div>
          </div>
          <div className="block sm:flex w-full p-4 sm:p-0">
            <div className={`w-full m-0 sm:w-1/2 ${styles.button_confirm}`}>
              <ButtonMui onClick={handleConfirm}>{t`confirm`}</ButtonMui>
            </div>
            <div className={"w-full sm:w-1/2 sm:ml-4 sm:mt-0 mt-4"}>
              <ButtonMuiLight
                variant="outlined"
                textClassName="font-normal"
                onClick={() => setIsOpenModalCancel(true)}
              >
                {t`cancel`}
              </ButtonMuiLight>
            </div>
          </div>
        </div>
        <div className="hidden sm:w-1/4"></div>
      </div>
      <ModalConfirm
        open={isOpenModalCancel}
        confirmType={confirmTypeCancel}
        onClose={() => setIsOpenModalCancel(false)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}
