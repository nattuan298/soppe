import { TableBody, TableCell, TableRow, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import axios from "src/lib/client/request";
import { debounce } from "lodash";

import { RootState } from "src/state/store";
import NoDataIcon from "src/components/svgs/no-data";
import { LoadingIndicator } from "src/components/animation/loading-indicator";
import { FavoriteMemberModel } from "src/feature/favorite-member/types";
import { HeartIcon, OrganizationIcon } from "src/components/svg";
import { FavoriteIcon } from "src/components/svgs";
import { notifyToast } from "src/constants/toast";
import { changeFavoriteMember } from "src/feature/organization/organization.slice";

import cls from "../organization.module.css";

const useStyles = makeStyles({
  bodyCell: {
    padding: "15px 10px 15px 10px",
    fontWeight: 400,
  },
});

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

  return (
    <div className="w-36 flex flex-col">
      <div className={`w-full grid ${isSponsor ? "grid-cols-3" : "grid-cols-4"}`}>
        <div className="text-left col-span-3 text-orange font-normal text-sm">{id}</div>
        {!isSponsor && (
          <div className="col-span-1 flex justify-between items-center">
            <div className={`cursor-pointer ${cls.organizaIcon}`} onClick={changeFavorite}>
              {isFavorite ? <FavoriteIcon /> : <HeartIcon fillColor2="#FF0000" />}
            </div>
            <div
              className={`cursor-pointer ${cls.organizaIcon}`}
              onClick={() => window?.location.reload()}
            >
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

export default function SponsorTableBody() {
  const classes = useStyles();
  const { organizationList, loading } = useSelector((state: RootState) => state.organization);

  if (loading) {
    return <LoadingTable />;
  }
  if (!organizationList?.data?.length) {
    return <NoDataTable />;
  }
  return (
    <TableBody>
      {organizationList.data.map((organization: FavoriteMemberModel) => {
        const { team, memberId, level, type, star, currentMatching, highestPosition } =
          organization;
        return (
          <TableRow key={memberId}>
            <TableCell className={classes.bodyCell}>
              <Infomation organization={organization} />
            </TableCell>
            <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
              {team || "_"}
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
        );
      })}
    </TableBody>
  );
}
