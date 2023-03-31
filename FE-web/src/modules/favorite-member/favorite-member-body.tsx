import { TableBody, TableCell, TableRow, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import { useRouter } from "next/router";
import { notifyToast } from "src/constants/toast";
import axios from "src/lib/client/request";
import { RootState } from "src/state/store";
import NoDataIcon from "src/components/svgs/no-data";
import { LoadingIndicator } from "src/components/animation/loading-indicator";
import { FavoriteMemberModel } from "src/feature/favorite-member/types";
import { OrganizationIcon } from "src/components/svg";
import { FavoriteIcon } from "src/components/svgs";
import { removeMember } from "src/feature/favorite-member/favorite-member.slice";
import cls from "./favorite-member.module.css";
import { CollapsibleBodyRow } from "src/components/collapsible-table";
import React from "react";
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
  favoriteMember: FavoriteMemberModel;
  isSponsor?: boolean;
}
const Information = ({ favoriteMember, isSponsor }: InfoPropsType) => {
  const { memberId, sponsorId, memberName, sponsorName } = favoriteMember;
  const id = isSponsor ? sponsorId : memberId;
  const name = isSponsor ? sponsorName : memberName;
  const dispatch = useDispatch();
  const route = useRouter();

  const unFavoriteMember = async () => {
    try {
      dispatch(removeMember(memberId));
      await axios.put("/members/unfavorite-member", { memberId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message = e.response?.data?.message;
      message && notifyToast("error", message);
    }
  };

  const handleClickOrganization = () => {
    route.push("/organization-chart");
  };

  return (
    <div className="md:w-36 w-20 flex flex-col">
      <div
        className={`w-full grid ${isSponsor ? "grid-cols-3" : "grid-cols-4"} gap-[10px] sm:gap-0`}
      >
        <div
          className={`text-left col-span-3 text-orange font-normal ${
            isSponsor ? "text-[10px] sm:text-sm" : "text-sm"
          } `}
        >
          {id}
        </div>
        {!isSponsor && (
          <div className="col-span-1 flex justify-between items-center">
            <div
              className={`cursor-pointer ${cls.organizaIcon} mr-[11.5px] sm:mr-0`}
              onClick={unFavoriteMember}
            >
              <FavoriteIcon />
            </div>
            <div className={`cursor-pointer ${cls.organizaIcon}`} onClick={handleClickOrganization}>
              <OrganizationIcon fillColor2="#0075c9" />
            </div>
          </div>
        )}
      </div>
      <div
        className={`text-black-dark ${
          isSponsor ? "text-[10px] sm:text-sm" : "text-sm"
        } w-full h-5 sm:h-10 text-left ${cls.userName}`}
      >
        {name || "_"}
      </div>
    </div>
  );
};

interface PreviewFavoriteMemberProps {
  sponsor?: React.ReactNode;
  type?: string;
  star?: string;
  matching?: string;
  position?: string;
}

function PreviewFavoriteMember({
  sponsor,
  type,
  star,
  matching,
  position,
}: PreviewFavoriteMemberProps) {
  const { t } = useTranslation("common");
  return (
    <div className="grid grid-cols-9 md:flex md:grid-cols-none gap-x-2 gap-y-2">
      <div className="col-span-3">
        <p className="text-[10px] font-bold">{t`sponsor`}</p>
        <p className="pt-1">{sponsor || "_"}</p>
      </div>
      <div className="col-span-1">
        <p className="text-[10px] font-bold">{t`type`}</p>
        <p className="pt-1 text-[10px]"> {type || "_"}</p>
      </div>
      <div className="col-span-1">
        <p className="text-[10px] font-bold">{t`star`}</p>
        <p className="pt-1 text-[10px]">{star || "_"}</p>
      </div>
      <div className="col-span-2">
        <p className="text-[10px] font-bold">{t`c-matching`}</p>
        <p className="pt-1 text-[10px]">{matching || "_"}</p>
      </div>
      <div className="col-span-2">
        <p className="text-[10px] font-bold">{t`h-position`}</p>
        <p className="pt-1 text-[10px]">{position || "_"}</p>
      </div>
    </div>
  );
}
interface SponsorTableBodyProps {
  members: Array<FavoriteMemberModel>;
  screen: string;
}
export default function SponsorTableBody({ members, screen }: SponsorTableBodyProps) {
  const classes = useStyles();
  const { loading } = useSelector((state: RootState) => state.favoriteMember);
  const { t } = useTranslation("common");
  if (loading) {
    return <LoadingTable />;
  }
  if (!members.length) {
    return <NoDataTable />;
  }
  return (
    <React.Fragment>
      {screen === "Desktop" && (
        <TableBody>
          {members.map((favoriteMember: FavoriteMemberModel) => {
            const { team, memberId, level, type, star, currentMatching, highestPosition } =
              favoriteMember;
            return (
              <TableRow key={memberId}>
                <TableCell className={classes.bodyCell}>
                  <Information favoriteMember={favoriteMember} />
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {t(team.toLowerCase()) || "_"}
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {level || "_"}
                </TableCell>
                <TableCell align="left" className={`${classes.bodyCell} text-black-dark`}>
                  <Information favoriteMember={favoriteMember} isSponsor />
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
      )}
      {screen === "Mobile" && (
        <TableBody>
          {members.map((favoriteMember: FavoriteMemberModel, index: number) => {
            const { team, memberId, level, type, star, currentMatching, highestPosition } =
              favoriteMember;
            return (
              <CollapsibleBodyRow
                index={index}
                colSpan={6}
                key={memberId}
                preview={
                  <PreviewFavoriteMember
                    sponsor={<Information favoriteMember={favoriteMember} isSponsor />}
                    type={type}
                    star={star}
                    matching={currentMatching}
                    position={highestPosition}
                  />
                }
              >
                <TableCell className={classes.bodyCell}>
                  <Information favoriteMember={favoriteMember} />
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {t(team.toLowerCase()) || "_"}
                </TableCell>
                <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                  {level || "_"}
                </TableCell>
              </CollapsibleBodyRow>
            );
          })}
        </TableBody>
      )}
    </React.Fragment>
  );
}
