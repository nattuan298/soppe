import { CircularProgress } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef, useState } from "react";
import { LeftNavination, ModalConfirm } from "src/components";
import NoDataIcon from "src/components/svgs/no-data";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { OrderDetailType } from "types/orders";
import EachOrder from "./each-order";
import InfiniteScroll from "react-infinite-scroll-component";
import { ModalUserSummaryInfo } from "../../components/user-summary";
import { notifyToast } from "src/constants/toast";
import { deleteOrder, deleteOrderToPay } from "src/services/order.services";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

const tabs = ["all", "waiting_approve", "delivery", "receipted"];
const sendToAPI = {
  waiting_approve: "waiting_approve",
  delivery: "delivery",
  receipted: "receipted",
  to_review: "To Review",

};

export interface MyOrderType {
  orders: OrderDetailType[];
  total: number;
}

export default function MyOrders({ total: initialTotal, orders }: MyOrderType) {
  const [listOrders, setlistOrders] = useState(orders);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [idDeleteOrder, setIdDeleteOrder] = useState<string>("");
  const [total, setTotal] = useState(initialTotal);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const { t } = useTranslation("common");
  const [selectedTab, setselectedTab] = useState("all");
  const [page, setPage] = useState(1);
  const isMountedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [id, setID] = useState<string>("");
  const [isOpenModalTopay, setIsOpenModalTopay] = useState<boolean>(false);
  const width = useGetScreenWidth();

  const getOrders = async ({ newPage }: { newPage: number }) => {
    setLoadingAPI(true);
    try {
      let api = `${apiRoute.orders.listOrders}?page=${newPage}&pageSize=10`;
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
      getOrders({ newPage: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  const handleDeleteOrder = async () => {
    try {
      const res = await deleteOrder(id);
      if (res.status === 200) {
        window.location.reload();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notifyToast("error", error.response.data.message);
    }
  };

  const checkOrderExist = async (id: string) => {
    try {
      const res = await axios.get(`${apiRoute.orders.listOrders}/${id}`);
      if (res.status === 200) {
        return true;
      }
      return false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.statusCode === 404) {
        return false;
      }
    }
  };
  const handleDeleteToPayOrder = async (id: string) => {
    const isExist = await checkOrderExist(id);
    if (isExist) {
      setIsOpenModalDelete(true);
      setIdDeleteOrder(id);
    } else {
      setID(id);
      setIsOpenModalTopay(true);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  };

  async function handleDelete() {
    setIsOpenModalDelete(false);
    try {
      const res = await deleteOrderToPay(idDeleteOrder);
      if (res.status === 200) {
        window.location.reload();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.statusCode === 404) {
        setID(idDeleteOrder);
        setIsOpenModalTopay(true);
        return;
      }
      notifyToast("error", error.response.data.message);
    }
  }

  const handleReloadPage = () => {
    setlistOrders((orders) => orders.filter((item) => item._id !== id));
    setIsOpenModalTopay(false);
  };

  const handleCancelConfirm = async () => {
    setIsOpenModalDelete(false);
  };
  console.log(listOrders);
  return (
    <div className="w-auto sm:w-1216 relative mb-8 mx-4 sm:mx-auto">
      <div className="hidden sm:block">
        <ModalUserSummaryInfo />
      </div>
      <div className="flex mt-6">
        <div className="col-span-2">
          <LeftNavination />
        </div>
        <div className="pl-0 sm:pl-20 flex-grow">
          {/* Header */}
          {width === "Desktop" ? (
            <div className="grid grid-cols-10">
              <div className="col-span-6">
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
              </div>
            </div>
          ) : (
            <div className="">
              <div className="grid grid-cols-1">
                <div id="nav" className="overflow-auto whitespace-nowrap col-span-1">
                  {tabs.map((item) => (
                    <span
                      id={selectedTab === item ? "abchd" : "inactive"}
                      key={item}
                      className={`cursor-pointer inline-block p-2  ${
                        selectedTab === item ? "text-orange underline font-medium" : ""
                      }`}
                      onClick={() => {
                        setselectedTab(item);
                      }}
                    >
                      {t(`${item}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* List order */}
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
                    <EachOrder
                      order={order}
                      key={index}
                      handleCheckFail={(
                        err: number,
                        mess: string,
                        order?: OrderDetailType,
                        scmStatusErrorCode?: string,
                      ) => {
                        if (err === 404) {
                          order && setID(order._id);
                          setIsOpenModalTopay(true);
                          if (scmStatusErrorCode === "SCM_PRODUCTS_INSIDE_ORDER_NOT_FOUND") {
                            setMessage(mess);
                            setOpen(true);
                          }
                        }
                      }}
                      handleDeleteToPayOrder={handleDeleteToPayOrder}
                    />
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
      </div>

      <ModalConfirm
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        confirmType="checkProduct"
        message={message}
        onConfirm={handleDeleteOrder}
      />

      <ModalConfirm
        open={isOpenModalDelete}
        confirmType="delete-confirm"
        onClose={handleCancelConfirm}
        onConfirm={handleDelete}
      />
      <ModalConfirm
        open={isOpenModalTopay}
        confirmType="unable-delete"
        message={t`this_order_id_no_longer_exists`}
        onConfirm={handleReloadPage}
      />
    </div>
  );
}
