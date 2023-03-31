import { CircularProgress, IconButton } from "@material-ui/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import DownloadIcon from "src/components/svgs/download";
import { OrderDetailType } from "types/orders";
import PDFDocument from "./pdf-order";

interface OrderDetailTProps {
  order: OrderDetailType;
}

export default function OrderDetail({ order }: OrderDetailTProps) {
  const { t, lang } = useTranslation("common");
  const [isClient, setIsClient] = useState(false);

  const textServer = {
    order_detail: t`order_detail`,
    details: t`details`,
    order_number: t`order_number`,
    ship_to: t`ship_to`,
    pickup_location: t`pickup_location`,
    order_summary: t`order_summary`,
    total_product_price: t`total_product_price`,
    shipping_fees: t`shipping_fees`,
    total_shipping_fees: t`total_shipping_fees`,
    taxes: t`taxes`,
    more_about_taxes: t`more_about_taxes`,
    total: t`total`,
    total_received_PV: t`total_received_PV`,
    product: t`product`,
    quantity: t`quantity`,
    price: t`price`,
    received_PV: t`received_PV`,
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <PDFDownloadLink
      className="flex items-center"
      document={<PDFDocument lang={lang} order={order} text={textServer} />}
      fileName={`${order.orderNumber}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <div className="mr-6">
            <CircularProgress size={20} />
          </div>
        ) : (
          <IconButton>
            <DownloadIcon />
          </IconButton>
        )
      }
    </PDFDownloadLink>
  );
}
