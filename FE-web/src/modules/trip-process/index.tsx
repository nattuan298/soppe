import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "src/components";

import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import { TripProcessBar } from "src/components/trip-process-bar/trip-process-bar";
import { ModalUserSummaryInfo } from "src/components/user-summary";
// import { getTripPV } from "src/feature/trip-process-pv/trip-process-pv.slice";
import { getTripPvDispatch } from "src/feature/trip-process-pv/trip-process-pv.action";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
import { RootState } from "src/state/store";

export function TripProcess() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const route = useRouter();

  const { tripPV } = useSelector((state: RootState) => state.tripProcess);

  const {
    currentPointBig = "0",
    firstSeatPointBig = "0",
    initialPointBig = "0",
    remainingNumberBig = "0",
    secondSeatPointBig = "0",
    currentPointSmall = "0",
    initialPointSmall = "0",
    firstSeatPointSmall = "0",
    remainingNumberSmall = "0",
    secondSeatPointSmall = "0",
    smallTripName = "",
    bigTripName = "",
  } = tripPV[0] || {};

  const bigTripData = {
    currentPoint: parseFloat(currentPointBig),
    initialPoint: parseFloat(initialPointBig),
    firstSeatPoint: parseFloat(firstSeatPointBig),
    secondSeatPoint: parseFloat(secondSeatPointBig),
    remainingNumber: parseFloat(remainingNumberBig),
    tripName: bigTripName,
  };

  const smallTripData = {
    currentPoint: parseFloat(currentPointSmall),
    initialPoint: parseFloat(initialPointSmall),
    firstSeatPoint: parseFloat(firstSeatPointSmall),
    secondSeatPoint: parseFloat(secondSeatPointSmall),
    remainingNumber: parseFloat(remainingNumberSmall),
    tripName: smallTripName,
  };

  useEffect(() => {
    // dispatch(getTripPV());
    dispatch(getTripPvDispatch());
  }, [dispatch]);

  const handleClickOrganization = () => {
    route.push("/travel-pv-history");
  };
  const width = useGetScreenWidth();
  return (
    <div className="md:mx-auto md:w-1216 relative mb-8 px-4 md:px-0">
      {width !== "Mobile" && <ModalUserSummaryInfo showDate width={330} />}
      <div className="md:flex mt-4 md:mt-6">
        <div className="col-span-2 hidden md:block">
          <LeftNavinationReport />
        </div>
        <div className="flex flex-col space-y-8 md:w-[716px] md:pl-20">
          <TripProcessBar title={t("big-trip-pv")} data={bigTripData} />
          <TripProcessBar title={t("small-trip-pv")} data={smallTripData} />
          <Button
            loadingSize={30}
            colorClass="text-white"
            className="w-full bg-orange hover:bg-lighterOrange focus:ring-0 h-[50px] rounded-md mb-6 text-white text-base"
            onClick={handleClickOrganization}
          >
            {t("view-trip-pv-history")}
          </Button>
        </div>
      </div>
    </div>
  );
}
