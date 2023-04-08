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
      <div className="mt-6">
        <ShipToAddress />
        {/* {shippingType === "Ship to address" && locationBase === "Thailand" && } */}
        {/* {shippingType === "Pickup" && <PickupLocation />} */}
      </div>
    </div>
  );
}
