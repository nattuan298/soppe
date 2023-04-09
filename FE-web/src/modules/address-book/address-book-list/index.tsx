import useTranslation from "next-translate/useTranslation";
import { ButtonMuiLight, LeftNavination } from "src/components";
import AddIcon from "@material-ui/icons/Add";
import styles from "./style.module.css";
import { CircularProgress, Divider } from "@material-ui/core";
import { phoneNumberFormatter2 } from "src/lib/format";
import Link from "next/link";
import { routeCreateAddressFormBase } from "src/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/store";
import { AddressModel } from "src/feature/address-book/type";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { getAddressBookAction } from "src/feature/address-book/address-book.action";

// import AddressModel from "src/feature/address-book/type";

export function AddressBookList() {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const { listAddress, loading } = useSelector((state: RootState) => state.addressBook);
  useEffect(() => {
    dispatch(getAddressBookAction());
  }, [dispatch]);
  const handleEdit = (_id: string | undefined) => {
    router.push(`/edit-address-book/${_id}`);
  };
  console.log(listAddress);
  const addressLocation = useCallback(
    (address: AddressModel) => {
      const { sub_district: subDistrict, district, province } = address;

      return [subDistrict, district, province].filter((item) => item).join(", ");
    },
    [lang],
  );

  return (
    <div className="md:mx-auto md:w-1216 mb-8 mt-6 flex relative px-4 md:px-0">
      <div className="w-1/4 mr-6 hidden md:block">
        <LeftNavination />
      </div>

      <div className="md:w-3/4 w-full relative">
        <div className="md:w-2/5">
          <Link href={routeCreateAddressFormBase}>
            <ButtonMuiLight variant="outlined" textClassName="font-normal">
              <div className="flex items-end">
                <AddIcon className="mr-2" /> {t`add_new_address`}
              </div>
            </ButtonMuiLight>
          </Link>
        </div>

        {loading ? (
          <div className="md:absolute md:right-3/4 md:top-1/4 mt-4 md:mt-0 flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="mt-4">
            {listAddress?.data?.map((list: AddressModel) => (
              <div
                className="cursor-pointer hover:bg-orange hover:bg-opacity-5 pt-4"
                onClick={() => handleEdit(list._id)}
              >
                <div className={`w-full ${styles.address}`}>
                  <div className="flex">
                    <div className="text-sm mr-2 font-bold text-black-dark">
                      {list.firstName} {list.lastName}
                    </div>
                    <div className="text-textSearch text-sm">
                      {list.phoneNumber && list.phoneNumber}
                    </div>
                  </div>
                  <div
                    className={"text-sm font-light mt-1.5 text-black-dark mb-4"}
                  >
                    {list.address && `${list.address} - ${list.sub_district} - ${list.district} - ${list.province}  `}

                  </div>

                </div>
                <Divider />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
