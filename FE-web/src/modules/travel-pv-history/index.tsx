import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import { CollapsibleBodyRow } from "src/components/collapsible-table";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import NoDataIcon from "src/components/svgs/no-data";
import styles from "./travel-pv-history.module.css";
import { FormatNumber } from "src/lib/format-number";
import { CountryPhoneCodeType, ListCountryPhoneCode } from "src/constants/country_phone_code";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/store";
import paramsSerializer from "src/lib/paramsSerializer";
// import { getTravelPVHistory } from "src/feature/travel-pv-history";
import { TravelPVHistoryType, TripType } from "src/feature/travel-pv-history/types";
import { Pagination } from "src/components";
import { SelectCustoms as CustomSelect } from "src/components/select/select-customs";
import NumberFormatCustome from "src/components/text/number-format";
import { stringNumberToStringWithToFix } from "src/utils";
import {
  getTripTravelDispatch,
  getTripTravelHistoryDispatch,
} from "src/feature/travel-pv-history/travel-pv-history.action";
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
  citizenship: string;
  bonusTrip: string;
  mb2su?: React.ReactNode;
  mb2ex?: React.ReactNode;
  privPv?: React.ReactNode;
  leftPv?: React.ReactNode;
  rightPv?: React.ReactNode;
  tripPv?: React.ReactNode;
}

function PreviewHistory({
  citizenship,
  bonusTrip,
  mb2su,
  mb2ex,
  privPv,
  leftPv,
  rightPv,
  tripPv,
}: PreviewHistoryProps) {
  const { t } = useTranslation("common");

  const getCitizenship = (): string => {
    const index = ListCountryPhoneCode.findIndex(
      (item: CountryPhoneCodeType) => item.name === citizenship,
    );

    return ListCountryPhoneCode[index].flag;
  };

  return (
    <div className={`${styles.preview} grid grid-cols-5 gap-x-5 gap-y-5`}>
      <div className="block md:hidden">
        <p className="font-medium text-[10px] md:text-sm">{t`mb2su`}</p>
        <p className="pt-2.5 text-[10px] md:text-sm">{mb2su}</p>
      </div>
      <div className="block md:hidden">
        <p className="font-medium text-[10px] md:text-sm">{t`mb2ex`}</p>
        <p className="pt-2.5 text-[10px] md:text-sm">{mb2ex}</p>
      </div>
      <div className="block md:hidden">
        <p className="font-medium text-[10px] md:text-sm"> {t`priv_pv`}</p>
        <p className="pt-2.5 text-[10px] md:text-sm">{privPv}</p>
      </div>
      <div className="block md:hidden">
        <p className="font-medium  text-[10px] md:text-sm">{t`left_pv`}</p>
        <p className="pt-2.5  text-[10px] md:text-sm">{leftPv}</p>
      </div>
      <div className="block md:hidden">
        <p className="font-medium  text-[10px] md:text-sm">{t`right_pv`}</p>
        <p className="pt-2.5 text-[10px] md:text-sm">{rightPv}</p>
      </div>
      <div className="block md:hidden">
        <p className="font-medium text-[10px] md:text-sm">{t`trip_tp`}</p>
        <p className="pt-2.5  text-[10px] md:text-sm">{tripPv}</p>
      </div>
      <div className="w-4/5 sm:w-full">
        <p className="font-medium text-[10px] md:text-sm">{t`bonus_trip_tp`}</p>
        <p className="pt-2.5 text-[10px] md:text-sm">{bonusTrip}</p>
      </div>
      <div className=" mb-5">
        <p className="font-medium  text-[10px] md:text-sm">{t`lb`}</p>
        {citizenship && (
          <div className="pt-2.5 text-[10px] md:text-sm">
            <img alt="" src={getCitizenship()} className="w-4 sm:w-6 h-4 sm:h-6"></img>
          </div>
        )}
      </div>
    </div>
  );
}

interface TravelPVHistoryProps {
  from?: Date;
  to?: Date;
}

export const TravelPVHistory = ({ from, to }: TravelPVHistoryProps) => {
  const { t } = useTranslation("common");
  const classes = useStyles();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [params, setParams] = useState<string>("");
  const [tripId, setTripId] = useState<string | number>("");
  const { travelPVHistory, tripList, loading } = useSelector(
    (state: RootState) => state.travelPVHistory,
  );
  const dispatch = useDispatch();

  const trip = useMemo(
    () =>
      tripList.map((trip: TripType) => {
        return {
          title: trip.name,
          value: trip.rCode,
        };
      }),
    [tripList],
  );

  useEffect(() => {
    if (tripList.length > 0) {
      const [tripSelected] = tripList;
      setTripId(tripSelected?.rCode);
    }
  }, [tripList]);

  useEffect(() => {
    // dispatch(getTrip());
    dispatch(getTripTravelDispatch());
  }, [dispatch]);

  useEffect(() => {
    const startDate = dayjs(from).format("YYYY-MM-DD");
    const endDate = dayjs(to).format("YYYY-MM-DD");
    if (!tripId) {
      return;
    }
    setPage(1);
    const params = paramsSerializer({ page: 1, startDate, endDate, pageSize, tripId });
    setParams(`?${params}`);
  }, [from, to, pageSize, tripId]);

  useEffect(() => {
    const startDate = dayjs(from).format("YYYY-MM-DD");
    const endDate = dayjs(to).format("YYYY-MM-DD");
    if (!tripId) {
      return;
    }
    const params = paramsSerializer({ page, startDate, endDate, pageSize, tripId });
    setParams(`?${params}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, from, to, pageSize, tripId]);

  useEffect(() => {
    if (!params) {
      return;
    }
    if (window) {
      window.scrollTo(0, 0);
    }
    // dispatch(getTravelPVHistory(params));
    dispatch(getTripTravelHistoryDispatch({ paramsURL: params }));
  }, [dispatch, params]);

  const handleOnChangle = ({ value }: { value: string | number; title: string }) => {
    setTripId(value);
  };
  const width = useGetScreenWidth();

  return (
    <div className="md:mx-auto md:w-1216 relative mb-8 px-3 md:px-0">
      <div className="md:flex mt-4 md:mt-8">
        <div className="col-span-2 hidden md:block">
          <LeftNavinationReport />
        </div>
        <div className="w-full md:pl-20">
          <div className="mb-4 flex justify-between w-full items-center">
            <p className="text-sm font-medium float-left">{t`travel_tp_history`}</p>
            <CustomSelect
              className="h-9"
              selectClassName={"text-black-dark justify-end py-2 md:px-4 h-auto w-[200px] md:w-72"}
              options={trip}
              defaultValue={tripId}
              onChange={handleOnChangle}
            />
          </div>
          <div className="mb-5">
            <Table aria-label="customized table">
              <StyledTableHead>
                <TableCell className={classes.headLeft} align="left">
                  {t`from_date`}
                </TableCell>
                <TableCell className={classes.headCell} align="left">
                  {t`to_date`}
                </TableCell>
                <TableCell className={classes.headCell} align="left">
                  {t`total_trip_tp`}
                </TableCell>
                {width === "Desktop" && (
                  <React.Fragment>
                    <TableCell className={classes.headCell} align="left">
                      {t`mb2su`}
                    </TableCell>
                    <TableCell className={classes.headCell} align="left">
                      {t`mb2ex`}
                    </TableCell>
                    <TableCell className={classes.headCell} align="left">
                      {t`priv_pv`}
                    </TableCell>
                    <TableCell className={classes.headCell} align="left">
                      {t`left_pv`}
                    </TableCell>
                    <TableCell className={classes.headCell} align="left">
                      {t`right_pv`}
                    </TableCell>
                    <TableCell className={classes.headCell} align="left">
                      {t`trip_tp`}
                    </TableCell>
                  </React.Fragment>
                )}
                <TableCell className={classes.headRight}></TableCell>
              </StyledTableHead>

              <TableBody>
                {travelPVHistory.data?.length === 0 && (
                  <TableRow>
                    <TableCell style={{ border: "none" }} colSpan={9}>
                      <div className="mt-12 mb-12 w-full">
                        {!loading && (
                          <>
                            <div className="m-auto w-48 h-24">
                              <NoDataIcon />
                              <span className="w-24 ml-16 leading-10">{t`no_data`}</span>
                            </div>
                          </>
                        )}
                        {loading && (
                          <div className="flex items-center justify-center w-full mt-4">
                            <CircularProgress />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {(!travelPVHistory.data || travelPVHistory.data.length > 0) && loading && (
                  <TableRow>
                    <TableCell style={{ border: "none" }} colSpan={9}>
                      <div className="w-full flex justify-center">
                        {/* <LoadingIndicator size={36} /> */}
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {travelPVHistory.data &&
                  !loading &&
                  travelPVHistory.data.map((history: TravelPVHistoryType, index: number) => (
                    <CollapsibleBodyRow
                      index={index}
                      colSpan={10}
                      key={"20-10-2001"}
                      preview={
                        <PreviewHistory
                          citizenship={history.locationbase}
                          bonusTrip={history.specialPoint}
                          mb2su={<FormatNumber value={+history.mb2su} />}
                          mb2ex={<FormatNumber value={+history.mb2ex} />}
                          privPv={
                            <NumberFormatCustome
                              value={stringNumberToStringWithToFix(history.privPv)}
                            />
                          }
                          leftPv={
                            <NumberFormatCustome
                              value={stringNumberToStringWithToFix(history.leftPv)}
                            />
                          }
                          rightPv={
                            <NumberFormatCustome
                              value={stringNumberToStringWithToFix(history.rightPv)}
                            />
                          }
                          tripPv={
                            <NumberFormatCustome
                              value={stringNumberToStringWithToFix(history.tripPv)}
                            />
                          }
                        />
                      }
                    >
                      <TableCell className={classes.bodyCell} align="left">
                        {dayjs(history.fromDate).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell className={classes.bodyCell} align="left">
                        {dayjs(history.toDate).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell
                        className={`${classes.bodyCell} ${styles.txtTotalTrip}`}
                        align="left"
                      >
                        <FormatNumber value={history.totalTripPv} />
                      </TableCell>
                      {width === "Desktop" && (
                        <React.Fragment>
                          <TableCell className={classes.bodyCell} align="left">
                            <FormatNumber value={+history.mb2su} />
                          </TableCell>
                          <TableCell className={classes.bodyCell} align="left">
                            <FormatNumber value={+history.mb2ex} />
                          </TableCell>
                          <TableCell className={classes.bodyCell} align="left">
                            <NumberFormatCustome
                              value={stringNumberToStringWithToFix(history.privPv)}
                            />
                          </TableCell>
                          <TableCell className={classes.bodyCell} align="left">
                            <NumberFormatCustome
                              value={stringNumberToStringWithToFix(history.leftPv)}
                            />
                          </TableCell>
                          <TableCell className={classes.bodyCell} align="left">
                            <NumberFormatCustome
                              value={stringNumberToStringWithToFix(history.rightPv)}
                            />
                          </TableCell>
                          <TableCell className={classes.bodyCell} align="left">
                            <NumberFormatCustome
                              value={stringNumberToStringWithToFix(history.tripPv)}
                            />
                          </TableCell>
                        </React.Fragment>
                      )}
                    </CollapsibleBodyRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div className="w-full mt-5">
            <Pagination
              totalPage={travelPVHistory.totalPage}
              selectedPage={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              screen={width}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
