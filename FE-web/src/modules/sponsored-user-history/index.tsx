import { Table, TableBody, TableCell, TableHead, makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LeftNavination, LoadingIndicator } from "src/components";
import { CollapsibleBodyRow } from "src/components/collapsible-table";
import { SponsorHistoryDetail } from "src/feature/sponsor-user-history/types";
import { phoneNumberFormatter3 } from "src/lib/format";
import { RootState } from "src/state/store";
import dayjs from "dayjs";
import styles from "./sponsored-user-history.module.css";
import NoDataIcon from "src/components/svgs/no-data";
import InfiniteScroll from "react-infinite-scroll-component";
import { getHistorySponsoredAction } from "src/feature/sponsor-user-history/sponsor-user-history.action";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";

const StyledTableHead = withStyles({
  root: {
    background: "#F4F5FA",
    height: 32,
    "& .MuiTableCell-head": {
      borderBottom: "none",
    },
  },
})(TableHead);

const useStyles = makeStyles({
  infiniteScroll: {
    overflow: "none",
  },
  headCell: {
    padding: "0px 10px",
  },
  headLeft: {
    padding: "0px 10px",
    borderRadius: "5px 0px 0px 5px",
  },
  headRight: {
    padding: "0px 10px",
    borderRadius: "0px 5px 5px 0px",
  },
  bodyCell: {
    padding: "24px 10px 24px 10px",
  },
});
interface PreviewHistoryProps {
  dateOfBirth?: string;
  citizenship?: string;
  phone: string;
  email?: string;
}

function PreviewHistory({ citizenship, dateOfBirth, phone, email }: PreviewHistoryProps) {
  const { t } = useTranslation("common");
  return (
    <div className={`${styles.preview} grid grid-cols-2 md:flex md:grid-cols-none gap-x-5 gap-y-2`}>
      <div className="block md:hidden">
        <p className="font-medium">Phone Number</p>
        <p className="pt-2.5">{phoneNumberFormatter3(phone)}</p>
      </div>
      <div className="block md:hidden">
        <p className="font-medium">Email</p>
        <p className="pt-2.5">{email}</p>
      </div>
      <div className="">
        <p className="font-medium">{t`date_of_birth`}</p>
        <p className="pt-2.5">{dayjs(dateOfBirth).format("DD-MM-YYYY")}</p>
      </div>
      <div>
        <p className="font-medium">{t`citizenship`}</p>
        <p className="pt-2.5">{citizenship}</p>
      </div>
    </div>
  );
}

interface SponsoredUserHistoryProps {
  search?: string;
}

export function SponsoredUserHistory({ search, ...props }: SponsoredUserHistoryProps) {
  const { t } = useTranslation("common");
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, total, sponsorHistoryDetail } = useSelector(
    (state: RootState) => state.sponsorHistory,
  );

  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const getHistory = useCallback(() => {
    // dispatch(getSponsoredUserHistory({ page, pageSize, search }));
    dispatch(getHistorySponsoredAction({ page, pageSize, search }));
  }, [dispatch, page, pageSize, search]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  const hasMore = useMemo(() => sponsorHistoryDetail.length < total, [sponsorHistoryDetail, total]);

  const getMoreItemHistory = () => {
    setPage((page) => page + 1);
  };
  const width = useGetScreenWidth();

  return (
    <div className="md:mx-auto lg:w-1216 mb-8 px-3.5 md:px-0" {...props}>
      <div className="float-left w-1/4 hidden md:block">
        <LeftNavination />
      </div>
      <div className="md:float-right relative md:w-3/4 md:pl-4">
        <div className="w-full ">
          <p className="text-sm font-medium pt-5 md:pt-0">{t`sponsored-user-history`}</p>
          <div className="mt-5 mb-5">
            <InfiniteScroll
              dataLength={sponsorHistoryDetail?.length}
              next={getMoreItemHistory}
              hasMore={hasMore}
              className={`${styles.infiniteScroll}`}
              loader={
                <div className="w-full h-12">
                  <div className="w-12 mt-4 m-auto">
                    <LoadingIndicator size={20} className={"#FF7500"} />
                  </div>
                </div>
              }
            >
              {!loading && !sponsorHistoryDetail.length ? (
                <div className="w-full ">
                  <div className="w-48 m-auto mt-12 text-center">
                    <NoDataIcon />
                    <p className={`${styles.noData}`}>{t`no_data`}</p>
                  </div>
                </div>
              ) : (
                <Table aria-label="customized table">
                  <StyledTableHead>
                    <TableCell className={classes.headLeft} align="left">
                      {t`name`}
                    </TableCell>
                    <TableCell className={classes.headCell} align="center">
                      {t`date`}
                    </TableCell>
                    <TableCell className={classes.headCell} align="center">
                      {t`payment`}
                    </TableCell>
                    {width === "Desktop" && (
                      <React.Fragment>
                        <TableCell className={classes.headCell} align="center">
                          {t`phone-number`}
                        </TableCell>
                        <TableCell className={classes.headCell} align="center">
                          {t`email`}
                        </TableCell>
                      </React.Fragment>
                    )}
                    <TableCell className={classes.headRight}></TableCell>
                  </StyledTableHead>
                  <TableBody>
                    {sponsorHistoryDetail.map((history: SponsorHistoryDetail, index: number) => (
                      <CollapsibleBodyRow
                        index={index}
                        colSpan={6}
                        key={history._id}
                        preview={
                          <PreviewHistory
                            dateOfBirth={history.dateOfBirth}
                            citizenship={history.citizenship}
                            email={history.email}
                            phone={history.phoneNumber}
                          />
                        }
                      >
                        <TableCell className={classes.bodyCell}>{history.fullName}</TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {dayjs(history.createdAt).format("YYYY-MM-DD")}
                        </TableCell>
                        {history.status === "Pending" ? (
                          <TableCell className={classes.bodyCell} align="center">
                            <span className={`${styles.statusPending}`}>{history.status}</span>
                          </TableCell>
                        ) : (
                          <TableCell className={classes.bodyCell} align="center">
                            <span className={`${styles.statusPaid}`}>{history.status}</span>
                          </TableCell>
                        )}
                        {width === "Desktop" && (
                          <React.Fragment>
                            <TableCell className={classes.bodyCell} align="center">
                              {phoneNumberFormatter3(history.phoneNumber)}
                            </TableCell>
                            <TableCell className={classes.bodyCell} align="center">
                              {history.email}
                            </TableCell>
                          </React.Fragment>
                        )}
                      </CollapsibleBodyRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {/* {!loading && !sponsorHistoryDetail.length ? (
                <div className="w-full ">
                  <div className="w-48 m-auto mt-12">
                    <NoDataIcon />
                  </div>
                </div>
              ) : null} */}
            </InfiniteScroll>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
