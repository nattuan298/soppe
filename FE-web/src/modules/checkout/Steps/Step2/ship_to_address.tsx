import { Checkbox, FormControlLabel } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMui, Title } from "src/components";
import SelectAddress from "src/components/select/select-address";
import {
  makeUrlObjectFromRouteBase,
  routeCheckoutBase,
  routeCreateAddressFormBase,
} from "src/constants/routes";
import { handleChangeField } from "src/feature/checkout/thunkAction";
import { CheckoutState } from "src/feature/checkout/type";
import { changeRedirectUrl } from "src/feature/user/slice";
import { RootState } from "src/state/store";

export default function ShipToAddress() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();

  const { listAddress, address, billingAddress, realAddress } = useSelector(
    (state: RootState) => state.checkout,
  );

  const stateCheckout = useSelector((state: RootState) => state.checkout);

  const handleChangeSelect = (name: keyof CheckoutState) => (e: { value: string }) => {
    dispatch(handleChangeField({ [name]: e.value }));
  };

  const handleClickCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(handleChangeField({ billingAddress: address }));
    }
  };

  const changeToAddAddress = (name: string) => () => {
    dispatch(handleChangeField({ addAddressFrom: name }));
    localStorage.setItem(
      "stateCheckout",
      JSON.stringify({ ...stateCheckout, addAddressFrom: name }),
    );
    dispatch(changeRedirectUrl(routeCheckoutBase));
    setTimeout(() => {
      router.push(makeUrlObjectFromRouteBase(routeCreateAddressFormBase, { country: "Thailand" }));
    }, 150);
  };
  console.log(address);
  return (
    <div>
      <p className="font-medium">{t`address`}</p>
      <Title title={t`shipping_address`} isRequired className="mt-4" />

      {realAddress.length > 0 && (
        <SelectAddress
          options={listAddress}
          defaultValue={address}
          onChange={handleChangeSelect("address")}
        />
      )}

      <ButtonMui
        variant="outlined"
        textClassName="font-normal"
        className="mt-5"
        onClick={changeToAddAddress("shipping")}
      >
        <div className="flex items-end">
          <AddIcon className="mr-2" />
          {t`add_new_address`}
        </div>
      </ButtonMui>

      <Title title={t`billing_address`} isRequired className="mt-4 sm:mt-6" />
      <FormControlLabel
        control={
          <Checkbox
            name="gilad"
            color="primary"
            checked={address === billingAddress}
            onChange={handleClickCheckbox}
          />
        }
        label={t`billing_address_and_shipping_address_same`}
      />
      {realAddress.length > 0 && (
        <SelectAddress
          options={listAddress}
          defaultValue={billingAddress}
          onChange={handleChangeSelect("billingAddress")}
        />
      )}

      <ButtonMui
        variant="outlined"
        textClassName="font-normal"
        className="mt-5"
        onClick={changeToAddAddress("billing")}
      >
        <div className="flex items-end">
          <AddIcon className="mr-2" />
          {t`add_new_address`}
        </div>
      </ButtonMui>
    </div>
  );
}
