import { TableBody, TableCell, TableRow, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import axios from "src/lib/client/request";
import { debounce } from "lodash";
import { useRouter } from "next/router";

import { RootState } from "src/state/store";
import NoDataIcon from "src/components/svgs/no-data";
import { FavoriteMemberModel } from "src/feature/favorite-member/types";
import { HeartIcon, OrganizationIcon } from "src/components/svg";
import { FavoriteIcon } from "src/components/svgs";
import { notifyToast } from "src/constants/toast";
import { changeFavoriteMember } from "src/feature/sponsor-chart/sponsor-chart.slice";

import cls from "../sponsorchart.module.css";
import { LoadingIndicator } from "src/components";
import { CollapsibleBodyRow } from "src/components/collapsible-table";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";

const useStyles = makeStyles({
  bodyCell: {
    padding: "15px 10px 15px 10px",
    fontWeight: 400,
  },
});
const PreviewAnalysis = ({ organization }: { organization: FavoriteMemberModel }) => {
  const { type, star, currentMatching, highestPosition } = organization;
  const { t } = useTranslation("common");
  return (
    <div className="w-full grid grid-cols-5 gap-x-2 mb-6">
      <div className="flex-col flex">
        <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`sponsor`}</div>
        <div className="text-[10px] md:text-sm text-black-dark font-normal">
          <InfomationMobile organization={organization} isSponsor />
        </div>
      </div>
      <div className="flex-col flex items-center">
        <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`type`}</div>
        <div className="text-[10px] md:text-sm text-black-dark font-normal"> {type || "_"}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`star`}</div>
        <div className="text-[10px] md:text-sm text-black-dark font-normal">{star || "_"}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`c-matching`}</div>
        <div className="text-[10px] md:text-sm text-black-dark font-normal">
          {currentMatching || "_"}
        </div>
      </div>
      <div className="flex-col flex items-center w-max">
        <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`h-position`}</div>
        <div className="text-[10px] md:text-sm text-black-dark font-normal">
          {highestPosition || "_"}
        </div>
      </div>
    </div>
  );
};
const NoDataTable = () => {
  const { t } = useTranslation("common");
  return (
    <TableBody>
      <TableRow>
        <TableCell style={{ border: "none" }} colSpan={9}>
          <div className="w-full">
            <div className="w-48 m-auto mt-12 text-center">
              <NoDataIcon />
              <p className={`${cls.noData}`}>{t`no_data`}</p>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

const LoadingTable = () => (
  <TableBody>
    <TableRow>
      <TableCell style={{ border: "none" }} colSpan={9}>
        <div className="w-full flex justify-center">
          <LoadingIndicator size={36} className={cls.LoadingIndicator} />
        </div>
      </TableCell>
    </TableRow>
  </TableBody>
);

interface InfoPropsType {
  organization: FavoriteMemberModel;
  isSponsor?: boolean;
}
const Infomation = ({ organization, isSponsor }: InfoPropsType) => {
  const { memberId, memberName, isFavorite, sponsorId, sponsorName } = organization;

  const id = isSponsor ? sponsorId : memberId;
  const name = isSponsor ? sponsorName : memberName;
  const dispatch = useDispatch();
  const route = useRouter();

  const changeFavorite = debounce(async () => {
    try {
      const urlAPI = isFavorite ? "/members/unfavorite-member" : "/members/favorite-member";
      dispatch(changeFavoriteMember(memberId));
      await axios.put(urlAPI, { memberId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message = e.response?.data?.message;
      message && notifyToast("error", message);
    }
  }, 200);

  const handleClickOrganization = () => {
    route.push("/organization-chart");
  };

  return (
    <div className="md:w-36 w-24 flex flex-col">
      <div className={`w-full grid ${isSponsor ? "grid-cols-3" : "grid-cols-4"}`}>
        <div className="text-left col-span-3 text-orange font-normal text-sm">{id}</div>
        {!isSponsor && (
          <div className="col-span-1 flex justify-between items-center">
            <div
              className={`cursor-pointer mr-[14.5px] sm:mr-0 ${cls.organizaIcon}`}
              onClick={changeFavorite}
            >
              {isFavorite ? <FavoriteIcon /> : <HeartIcon fillColor2="#FF0000" />}
            </div>
            <div className={`cursor-pointer ${cls.organizaIcon}`} onClick={handleClickOrganization}>
              <OrganizationIcon fillColor2="#0075c9" />
            </div>
          </div>
        )}
      </div>
      <div className={`text-black-dark text-sm w-full h-10 text-left ${cls.userName}`}>
        {name || "_"}
      </div>
    </div>
  );
};
const InfomationMobile = ({ organization, isSponsor }: InfoPropsType) => {
  const { memberId, memberName, isFavorite, sponsorId, sponsorName } = organization;

  const id = isSponsor ? sponsorId : memberId;
  const name = isSponsor ? sponsorName : memberName;
  const dispatch = useDispatch();
  const route = useRouter();

  const changeFavorite = debounce(async () => {
    try {
      const urlAPI = isFavorite ? "/members/unfavorite-member" : "/members/favorite-member";
      dispatch(changeFavoriteMember(memberId));
      await axios.put(urlAPI, { memberId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message = e.response?.data?.message;
      message && notifyToast("error", message);
    }
  }, 200);

  const handleClickOrganization = () => {
    route.push("/organization-chart");
  };

  return (
    <div className="md:w-36 w-24 flex flex-col">
      <div className={`w-full grid ${isSponsor ? "grid-cols-3" : "grid-cols-4"}`}>
        <div className="text-left col-span-3 text-orange font-normal text-[10px]">{id}</div>
        {!isSponsor && (
          <div className="col-span-1 flex justify-between items-center">
            <div className={`cursor-pointer ${cls.organizaIcon}`} onClick={changeFavorite}>
              {isFavorite ? <FavoriteIcon /> : <HeartIcon fillColor2="#FF0000" />}
            </div>
            <div className={`cursor-pointer ${cls.organizaIcon}`} onClick={handleClickOrganization}>
              <OrganizationIcon fillColor2="#0075c9" />
            </div>
          </div>
        )}
      </div>
      <div className={`text-black-dark text-[10px] w-full h-10 text-left ${cls.userName}`}>
        {name || "_"}
      </div>
    </div>
  );
};
export default function SponsorTableBody() {
  const { t } = useTranslation("common");
  const classes = useStyles();
  const { sponsorChart, loading } = useSelector((state: RootState) => state.sponsorChart);
  const width = useGetScreenWidth();

  if (loading) {
    return <LoadingTable />;
  }
  if (!sponsorChart?.data?.length) {
    return <NoDataTable />;
  }
  return (
    <TableBody>
      {sponsorChart.data.map((organization: FavoriteMemberModel, index: number) => {
        const { team, memberId, level, type, star, currentMatching, highestPosition } =
          organization;
        return (
          <>
            {width === "Desktop" && (
              <TableRow key={memberId}>
                <TableCell className={classes.bodyCell}>
                  <Infomation organization={organization} />
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {team === "left" ? t`left` : t`right` || "_"}
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {level || "_"}
                </TableCell>
                <TableCell align="left" className={`${classes.bodyCell} text-black-dark`}>
                  <Infomation organization={organization} isSponsor />
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {type || "_"}
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {star || "_"}
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {currentMatching || "_"}
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {highestPosition || "_"}
                </TableCell>
              </TableRow>
            )}
            {width === "Mobile" && (
              <CollapsibleBodyRow
                key={memberId}
                index={index}
                colSpan={4}
                preview={<PreviewAnalysis organization={organization} />}
              >
                <TableCell className={classes.bodyCell}>
                  <Infomation organization={organization} />
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {team === "left" ? t`left` : t`right` || "_"}
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {level || "_"}
                </TableCell>
              </CollapsibleBodyRow>
            )}
          </>
        );
      })}
    </TableBody>
  );
}
