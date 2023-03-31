import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonMui } from "src/components";
import NumberFormatCustome from "src/components/text/number-format";
import styles from "./style.module.css";
import EachOrder from "./cart/index";
import { MyOrderType } from "../my-orders";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@material-ui/core";
import axios from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import NoDataIcon from "src/components/svgs/no-data";
import { RootState } from "src/state/store";
import { useSelector } from "react-redux";

const tabs = ["all", "to_ship", "to_receive", "to_review", "complete"];
export const sendToAPI = {
  to_ship: "To Ship",
  to_receive: "To Receive",
  to_review: "To Review",
  complete: "Complete",
};

interface OrderListProps {
  onClickTransferPV: () => void;
}

export default function OrderList({
  onClickTransferPV,
  total: initialTotal,
  orders,
}: OrderListProps & MyOrderType) {
  const { t } = useTranslation("common");
  const [selectedTab, setselectedTab] = useState("all");
  const [listOrders, setlistOrders] = useState(orders);
  const [total, setTotal] = useState(initialTotal);
  const isMountedRef = useRef(false);
  const [page, setPage] = useState(1);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const { selectedProduct } = useSelector((state: RootState) => state.transferBMC);

  const getOrders = async ({ newPage }: { newPage: number }) => {
    try {
      let api = `${apiRoute.orders.listOrders}?transferBMC=true&page=${newPage}&pageSize=10`;
      if (selectedTab !== "all") {
        api += `&status=${sendToAPI[selectedTab as keyof typeof sendToAPI]}`;
      }
      const res = await axios.get(api);

      setlistOrders((preState) =>
        newPage === 1 ? res.data.data : [...preState, ...res.data.data],
      );
      setTotal(res.data.total);
    } catch (e) {
      console.error("Fetch list orders Error", e);
    }

    setLoadingAPI(false);
  };

  const getMore = async () => {
    const newPage = page + 1;
    setPage(newPage);
    await getOrders({ newPage });
  };

  useEffect(() => {
    if (isMountedRef.current) {
      setPage(1);
      setLoadingAPI(true);
      getOrders({ newPage: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  const disableTransferPV = useMemo(() => {
    if (!selectedProduct) {
      return true;
    }
    const pv = selectedProduct.quantity * selectedProduct.pv;
    return !pv;
  }, [selectedProduct]);

  return (
    <div className="flex">
      <div className="flex-grow pr-0 sm:pr-6">
        <div className="flex justify-between">
          {tabs.map((item) => (
            <span
              key={item}
              className={`cursor-pointer  ${
                selectedTab === item ? "text-orange underline font-medium" : ""
              }`}
              onClick={() => setselectedTab(item)}
            >
              {t(`${item}`)}
            </span>
          ))}
        </div>

        <div>
          {listOrders.length === 0 && (
            <div className="mt-12 mb-5 flex flex-col justify-center items-center">
              <div>
                <NoDataIcon />
              </div>
              <span className="mt-4">{t`no_data`}</span>
              {loadingAPI && (
                <div className="flex items-center justify-center w-full h-full">
                  <CircularProgress />
                </div>
              )}
            </div>
          )}

          {listOrders.length > 0 && (
            <div className="relative">
              <InfiniteScroll
                dataLength={listOrders.length}
                next={getMore}
                hasMore={listOrders.length < total}
                loader={
                  <div className="flex items-center justify-center w-full h-16">
                    <CircularProgress />
                  </div>
                }
              >
                {listOrders.map((order, index) => (
                  <EachOrder order={order} key={index} />
                ))}
              </InfiniteScroll>

              {loadingAPI && (
                <div className="absolute top-0 left-0 flex items-center justify-center w-full h-80">
                  <CircularProgress />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-grow-0 relative w-auto sm:w-[290px]">
        <div className="fixed sm:sticky bottom-0 right-0 sm:top-48 bg-white w-full sm:w-auto">
          <div
            className={`${styles.transfer_item_container} absolute right-0 bottom-0 sm:bottom-auto sm:-top-24 w-full flex items-center sm:items-start justify-center sm:flex-col`}
          >
            <p className="font-medium text-lg hidden sm:block">{t`transfer_item`}</p>
            <p className="sm:mt-6 flex-1">
              <span>{t`selected`}: </span>
              <NumberFormatCustome className="pl-3" value={selectedProduct ? 1 : 0} suffix=" SKU" />
            </p>

            <ButtonMui
              height={45}
              className="sm:mt-6 flex-1"
              onClick={onClickTransferPV}
              disabled={disableTransferPV}
            >
              {t`transfer_pv`}
            </ButtonMui>
          </div>
        </div>
      </div>
    </div>
  );
}
