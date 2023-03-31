import { CircularProgress, Divider } from "@material-ui/core";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LeftNavination } from "src/components";
import NoDataIcon from "src/components/svgs/no-data";
import NumberFormatCustome from "src/components/text/number-format";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { TransferBMCHistory } from "types/api-response-type";

export const EachHistory = ({
  memberID,
  value,
  isTransferred,
  date,
}: {
  memberID: string;
  value: number;
  isTransferred: boolean;
  date: string;
}) => {
  const { t } = useTranslation("common");
  return (
    <div className="pb-4">
      <p>
        <span className="mr-2">{isTransferred ? t`transferred` : t`received`}</span>
        <NumberFormatCustome value={value} suffix=" PV" className="mr-2 text-blue" />
        {isTransferred ? t`to_member_ID` : t`from_member_ID`}:
        <span className="text-orange pl-2">{memberID}</span>
      </p>
      {/* <p className="text-brown">29-04-2021 17:25 PM</p> */}
      <p className="text-brown mt-3">{dayjs(date).format("DD-MM-YYYY hh:mm A")}</p>
      <Divider className="mt-4" />
    </div>
  );
};

export default function History({ keySearch }: { keySearch: string }) {
  const [listHistory, setListHistory] = useState<TransferBMCHistory[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const { t } = useTranslation("common");

  const getListHistory = async ({ newPage }: { newPage: number }) => {
    try {
      let api = `${apiRoute.members.transferBmcHistory}?page=${newPage}&pageSize=10`;
      if (keySearch) {
        api += `&keyword=${keySearch}`;
      }
      const res = await axios.get(api);

      setListHistory((preState) =>
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
    await getListHistory({ newPage });
  };

  useEffect(() => {
    setLoadingAPI(true);
    setPage(1);
    getListHistory({ newPage: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keySearch]);

  return (
    <div className="mx-4 sm:mx-auto w-auto sm:w-1216 relative mb-8">
      <div className="flex mt-6">
        <div className="col-span-2">
          <LeftNavination />
        </div>
        <div className="sm:pl-20 flex-grow">
          {listHistory.length === 0 && (
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

          {listHistory.length > 0 && (
            <div className="relative">
              <InfiniteScroll
                dataLength={listHistory.length}
                next={getMore}
                hasMore={listHistory.length < total}
                loader={
                  <div className="flex items-center justify-center w-full h-16">
                    <CircularProgress />
                  </div>
                }
              >
                {listHistory.map((item, index) => (
                  <EachHistory
                    memberID={item.memberId}
                    key={index}
                    value={item.pv}
                    isTransferred={item.status === "Transferred"}
                    date={item.transferDate}
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
  );
}
