/* eslint-disable @typescript-eslint/no-explicit-any */
import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMui, Title } from "src/components";
import InputOnlyNumber from "src/components/input/only-number";
import { changeQuantity } from "src/feature/transfer-bmc/slice";
import { RootState } from "src/state/store";
import EachProductForm from "./each_product_form";

import axios from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import { notifyToast } from "src/constants/toast";
import { useRouter } from "next/router";
import { routeTransferBmcPvPointHistoryBase } from "src/constants/routes";
import DialogCustome from "src/components/dialog";

interface TransferFormProps {
  onCancel: () => void;
}

export default function TransferForm({ onCancel }: TransferFormProps) {
  const { t } = useTranslation("common");
  const [targetMember, settargetMember] = useState("");
  const [calling, setCalling] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { selectedProduct, quantity, orderId } = useSelector(
    (state: RootState) => state.transferBMC,
  );

  const handleSubmit = async () => {
    setCalling(true);
    try {
      await axios.post(`${apiRoute.members.transferBmc}`, {
        memberId: targetMember,
        productCode: selectedProduct?.productCode,
        quantity,
        orderId,
      });

      router.push(routeTransferBmcPvPointHistoryBase);
    } catch (e: any) {
      const message = e.response?.data?.message || "";
      if (message) {
        notifyToast("error", message);
      }
    }
    setCalling(false);
  };

  const handleChangeTargetMember = (e: ChangeEvent<HTMLInputElement>) => {
    settargetMember(e.target.value);
  };

  const handleChangeQty = (val: number) => {
    dispatch(changeQuantity(val));
  };

  const handleClickCancel = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleConfirmModal = () => {
    handleCloseModal();
    onCancel();
  };

  return (
    <div>
      <div className="grid grid-cols-5 sm:mt-7">
        <div className="col-span-5 sm:col-span-4">
          {selectedProduct && (
            <EachProductForm
              product={selectedProduct}
              quantity={quantity}
              handleChangeQty={handleChangeQty}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 mt-4 sm:mt-7">
        <div className="col-span-5 sm:col-span-4 grid-cols-2 grid gap-8">
          <div className="col-span-2 sm:col-span-1">
            <Title title={t`target_member_id`} isRequired />
            <InputOnlyNumber
              placeholder={t`member_id`}
              value={targetMember}
              onChange={handleChangeTargetMember}
              maxlegth={15}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        {t`note`}:<span className="pl-2 font-light">{t`make_sure_target_user_corrected`}</span>
      </div>

      <div className="grid grid-cols-5 mt-5 sm:mt-7">
        <div className="col-span-5 sm:col-span-4 grid-cols-2 grid gap-[15px] sm:gap-8">
          <div className="col-span-4 sm:col-span-1">
            <ButtonMui
              onClick={handleSubmit}
              disabled={!targetMember || calling}
              showCircle={calling}
            >{t`submit`}</ButtonMui>
          </div>

          <div className="col-span-4 sm:col-span-1">
            <ButtonMui variant="outlined" onClick={handleClickCancel}>{t`cancel`}</ButtonMui>
          </div>
        </div>
      </div>

      <DialogCustome
        open={isOpenModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmModal}
      >
        <div
          className="text-center mb-8 mt-6 text-sm"
          style={{ maxWidth: 211 }}
        >{t`confirm_message_popup`}</div>
      </DialogCustome>
    </div>
  );
}
