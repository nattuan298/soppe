import { Divider } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "src/components";
import { CheckBoxWithText } from "src/components/checkbox/with-text";
import { handleChangeField } from "src/feature/checkout/thunkAction";
import { RootState } from "src/state/store";
import PickupLocation from "./pickup-location";
import ShipToAddress from "./ship_to_address";

export default function Step2() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { shippingType, locationBase } = useSelector((state: RootState) => state.checkout);

  const handleClickCheckbox = (params: { checked: boolean; name?: string }) => {
    const { name, checked } = params;
    if (shippingType !== name && checked) {
      if (name === "Ship to address") {
        dispatch(handleChangeField({ shippingType: name, country: "Thailand" }));
      } else {
        dispatch(handleChangeField({ shippingType: name, country: locationBase }));
      }
    }
  };

  return (
    <div>
      <div>
        <p className="font-medium">{t`shipping_type`}</p>
        <Title title={t`select_shipping_type`} className="mt-3 sm:mt-4" />
        <div className="flex items-center mt-4">
          {locationBase === "Thailand" && (
            <CheckBoxWithText
              text={t`ship_to_address`}
              className="mr-8"
              name="Ship to address"
              checked={shippingType === "Ship to address"}
              onChange={handleClickCheckbox}
            />
          )}
          <CheckBoxWithText
            text={t`pickup`}
            name="Pickup"
            checked={shippingType === "Pickup"}
            onChange={handleClickCheckbox}
          />
        </div>

        <Divider className="mt-6" />
      </div>

      <div className="mt-6">
        {shippingType === "Ship to address" && locationBase === "Thailand" && <ShipToAddress />}
        {shippingType === "Pickup" && <PickupLocation />}
      </div>
    </div>
  );
}
