import { CircularProgress } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { LeftNavination } from "src/components";
import { OrderDetailType } from "types/orders";
import { ModalUserSummaryInfo } from "../../components/user-summary";
import OrderDetailView from "./order-detail-view";

interface OrderDetailTProps {
  isOrderDetail?: boolean;
  order?: OrderDetailType;
}

export default function OrderDetail({ isOrderDetail, order }: OrderDetailTProps) {
  const [orderDetailRef, setorderDetailRef] = useState<HTMLDivElement | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setorderDetailRef(ref.current);
    }
  }, [ref, order]);

  return (
    <div className="w-auto sm:w-1216 relative mb-8 mx-4 sm:mx-auto">
      <div className="hidden sm:block">
        <ModalUserSummaryInfo />
      </div>
      <div className="flex mt-6">
        <div className="col-span-2">
          <LeftNavination />
        </div>
        <div className="pl-0 sm:pl-10 flex-grow">
          {order && (
            <OrderDetailView
              order={order}
              isOrderDetail={isOrderDetail}
              orderDetailRef={orderDetailRef}
            />
          )}

          {order && (
            <div className="hidden">
              <div ref={ref} className="pl-0 sm:pl-10 pr-10">
                <OrderDetailView
                  order={order}
                  isOrderDetail={isOrderDetail}
                  orderDetailRef={null}
                  hideButton
                />
              </div>
            </div>
          )}

          {!order && (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
