import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import dayjs from "dayjs";

import { getParams } from "src/store/router-params.slice";
import { ParamsType } from "src/types/params.model";
import { phoneNumberFormatter } from "src/lib/format";
import { fetchOrderDetailTrackingDetail } from "src/store/order.action";
import { CollapsibleBlock, CopyableInput, Label } from "src/components";
import kerryExpressLogo from "src/assets/img/kerry-express-logo.png";
import dhlLogo from "src/assets/img/dhl-logo.png";
import teleportLogo from "src/assets/img/teleport-logo.jpg";
import TrackStage from "./track-stage";
import { RootState } from "src/store";
import { Address } from "src/types/order.model";

export default function OrderTracking() {
  const { t, i18n } = useTranslation("common");
  const dispatch = useDispatch();
  const { id } = useParams<ParamsType>();
  const { orderTrackingDetail } = useSelector((state: RootState) => state.orders);
  const { language } = i18n;

  useEffect(() => {
    dispatch(getParams(id));
    dispatch(fetchOrderDetailTrackingDetail(id));
  }, [dispatch, id, language]);

  function getLogo(name: string) {
    if (name === "Kerry Express") return kerryExpressLogo;
    if (name === "DHL Express") return dhlLogo;
    if (name === "Teleport Express") return teleportLogo;
  }

  function getShippingAddress(shippingAddress: Address): string {
    if (shippingAddress) {
      if (language === "en" || !shippingAddress.province) {
        return `${shippingAddress.address}, ${shippingAddress.subDistrictEng}, ${shippingAddress.districtEng}, ${shippingAddress.provinceEng}, ${shippingAddress.postalCode} ${shippingAddress.country}`;
      }
      return `${shippingAddress.address}, ${shippingAddress.subDistrict}, ${shippingAddress.district}, ${shippingAddress.province}, ${shippingAddress.postalCode} ${shippingAddress.country}`;
    }
    return "";
  }

  return (
    <>
      <CollapsibleBlock className="mb-5" heading={t("order-information")}>
        <Grid container>
          <Grid item lg={5} md={5}>
            <p className="font-medium mb-4">
              {t("order-id")}:{" "}
              <span className="text-orange-light">{orderTrackingDetail.order?.orderNumber}</span>
            </p>
            {orderTrackingDetail.order.trackingNumber && (
              <Grid container direction="column" lg={6} md={6} className="mb-4">
                <Label>{t("tracking-number")}</Label>
                <CopyableInput
                  fullWidth
                  value={orderTrackingDetail.order.trackingNumber}
                  disabled
                />
              </Grid>
            )}

            <Grid container direction="column" lg={10} md={10} className="mb-4">
              <p className="font-medium">{t("ship-to")}:</p>
              {orderTrackingDetail.order.shippingAddress && (
                <>
                  <p className="font-medium">
                    {orderTrackingDetail.order.shippingAddress?.firstName}{" "}
                    {orderTrackingDetail.order.shippingAddress?.lastName} (
                    {phoneNumberFormatter(
                      orderTrackingDetail.order.shippingAddress?.phoneCode,
                      orderTrackingDetail.order.shippingAddress?.phoneNumber,
                    )}
                    )
                  </p>
                  <p className="text-gray-dark">
                    {getShippingAddress(orderTrackingDetail.order.shippingAddress)}
                  </p>
                </>
              )}
            </Grid>
          </Grid>

          {orderTrackingDetail.order.courierName && (
            <Grid item lg={7} md={7}>
              <img width="100" src={getLogo(orderTrackingDetail?.order?.courierName)} alt="logo" />
            </Grid>
          )}
        </Grid>
      </CollapsibleBlock>
      <CollapsibleBlock className="mb-5 tracking" heading={t("tracking")}>
        <p className="font-medium mb-9">{t("track-package")}</p>
        {orderTrackingDetail.trackingStatus.map((stage, index) => (
          <TrackStage
            key={stage.statusCode}
            current={index === 0}
            last={false}
            name={stage.statusDesc}
            description={stage.statusDesc}
            dateTime={dayjs(stage.updateDate).format("DD-MM-YYYY HH:mm")}
            documentLink={stage.lastMileSignature}
          />
        ))}
        <TrackStage
          current={orderTrackingDetail.trackingStatus.length === 0}
          last
          name={t("packed_by_seller_warehouse")}
          description={t("your_package_is_packed_and_will_be_handed_over_to_our_courier_partner")}
          dateTime={dayjs(orderTrackingDetail.order.createdAt).format("DD-MM-YYYY HH:mm")}
        />
      </CollapsibleBlock>
    </>
  );
}
