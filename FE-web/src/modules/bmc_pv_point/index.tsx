import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LeftNavination } from "src/components";
import { removeSelectedProduct } from "src/feature/transfer-bmc/slice";
import { MyOrderType } from "../my-orders";
import OrderList from "./order_list";
import TransferForm from "./transfer_form";

export default function BMCPvPoint(
  props: MyOrderType & {
    showTransferForm: boolean;
    setshowTransferForm: Dispatch<SetStateAction<boolean>>;
  },
) {
  const dispatch = useDispatch();
  const { showTransferForm, setshowTransferForm } = props;

  useEffect(() => {
    dispatch(removeSelectedProduct());
  }, [dispatch]);

  const onClickTransferPV = () => {
    setshowTransferForm(true);
  };

  const handleCancelForm = () => {
    setshowTransferForm(false);
  };

  return (
    <div className="mx-4 sm:mx-auto w-auto sm:w-1216 relative mb-8 min-h-[647px] sm:min-h-0">
      <div className="flex mt-5 sm:mt-6">
        <div className="hidden sm:block col-span-2">
          <LeftNavination />
        </div>
        <div className="pl-0 sm:pl-20 flex-grow">
          {showTransferForm && <TransferForm onCancel={handleCancelForm} />}
          {!showTransferForm && <OrderList onClickTransferPV={onClickTransferPV} {...props} />}
        </div>
      </div>
    </div>
  );
}
