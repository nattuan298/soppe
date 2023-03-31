import { Divider, FormHelperText } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMui, Title } from "src/components";
import InputBasic from "src/components/input/input-basic";
import { apiRoute } from "src/constants/apiRoutes";
import { handleChangeField } from "src/feature/signup/slice";
import axios from "src/lib/client/request";
import { RootState } from "src/state/store";

export default function Promotion() {
  const [errorMess, setErrorMess] = useState("");
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { memberType, coupon, couponDraft } = useSelector((state: RootState) => state.signup);

  const onClickRemoveCoupon = () => {
    setErrorMess("");

    dispatch(handleChangeField({ coupon: "" }));
    dispatch(handleChangeField({ couponDraft: "" }));
    dispatch(handleChangeField({ couponRedeemAmount: 0 }));
    // dispatch(handleChangeField({ discountCategory: "" }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMess("");
    dispatch(handleChangeField({ couponDraft: e.target.value }));
  };

  const handleApplyCoupon = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiRoute.coupon.applyRegister}`, {
        memberType: memberType === "1" ? 1 : 2,
        code: couponDraft,
      });
      setErrorMess("");
      dispatch(handleChangeField({ coupon: couponDraft }));
      dispatch(handleChangeField({ couponRedeemAmount: response.data.couponRedeemAmount }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const messageError = e.response.data.message;
      if (messageError) {
        setErrorMess(messageError);
      }

      dispatch(handleChangeField({ coupon: "" }));
      dispatch(handleChangeField({ couponRedeemAmount: 0 }));
    }

    setLoading(false);
  };

  return (
    <div className="mt-6">
      <p className="font-medium">{t`promotion`}</p>
      <Title title={t`coupon_code`} className="mt-2" />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex justify-between items-center">
          <div className="flex-grow mr-2 relative">
            <InputBasic
              placeholder={t`coupon_code`}
              onChange={handleChange}
              value={couponDraft}
              maxlegth={20}
              disabled={!!coupon}
            />
          </div>
          <div style={{ width: 100 }}>
            {!coupon && (
              <ButtonMui
                fullWidth
                onClick={handleApplyCoupon}
                disabled={!couponDraft || loading}
                showCircle={loading}
              >{t`apply`}</ButtonMui>
            )}

            {coupon && (
              <ButtonMui
                className="bg-red"
                fullWidth
                onClick={onClickRemoveCoupon}
              >{t`delete`}</ButtonMui>
            )}
          </div>
        </div>
      </div>
      {errorMess && <FormHelperText error>{errorMess}</FormHelperText>}
      <Divider className="mt-6" />
    </div>
  );
}
