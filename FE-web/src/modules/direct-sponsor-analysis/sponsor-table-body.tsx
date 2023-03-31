import { TableBody, TableCell, TableRow, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import { CollapsibleBodyRow } from "src/components/collapsible-table";
import { SponsorAnalysisModel } from "src/feature/direct-sponsor-analysis/type";
import { RootState } from "src/state/store";
import NoDataIcon from "src/components/svgs/no-data";
import cls from "./direct-sponsor.module.css";
import { AutoShipponsor, DocumentSponsor, OrganizationIcon, PVSponsor } from "src/components/svg";
import { LoadingIndicator } from "src/components/animation/loading-indicator";
import NumberFormat from "src/components/text/number-format";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";

const useStyles = makeStyles({
  bodyCell: {
    padding: "15px 10px 15px 10px",
    fontWeight: 400,
  },
});

const PreviewAnalysis = ({ analysis }: { analysis: SponsorAnalysisModel }) => {
  const { t } = useTranslation("common");
  return (
    <div className="w-full flex-col flex my-4">
      <div className="w-full grid grid-cols-5 md:grid-cols-9 mb-4 md:mb-6">
        <div className="md:col-span-3 col-span-1">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`apply_date`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.applyDate ? dayjs(analysis.applyDate).format("DD-MM-YYYY") : "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex sm:block justify-center">
          <div className="flex-col flex items-center w-max ">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`expire_date`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.expireDate ? dayjs(analysis.expireDate).format("DD-MM-YYYY") : "_"}
            </div>
          </div>
        </div>
        <div className=" col-span-2 flex flex-col items-center">
          <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`update_expire_date`}</div>
          <div className="text-[10px] md:text-sm text-black-dark font-normal">
            {analysis.upgradeExpireDate
              ? dayjs(analysis.upgradeExpireDate).format("DD-MM-YYYY")
              : "_"}
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-center">
          <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`apply_level`}</div>
          <div className="text-[10px] md:text-sm text-black-dark font-normal">
            {analysis.applyLevel || "_"}
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 md:grid-cols-9 mb-4 md:mb-6">
        <div className="md:col-span-3 col-span-1">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`max_pin`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.maxPin || "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`last_pin`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.lastPin || "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-center">
          <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`star`}</div>
          <div className="text-[10px] md:text-sm text-black-dark font-normal">
            {analysis.star || "_"}
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-center">
          <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`new-sponsor`}</div>
          <div className="text-[10px] md:text-sm text-black-dark font-normal">
            {analysis.newSponsor || "_"}
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 md:grid-cols-9 mb-4 md:mb-6">
        <div className="md:col-span-3 col-span-1">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`mem_to_sup`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.memToSup || "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-start">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`mem_to_ex`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.memToEx || "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-center">
          <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`own_pv`}</div>
          <div className="text-[10px] md:text-sm text-black-dark font-normal">
            {analysis.ownPV ? <NumberFormat value={analysis.ownPV} /> : "_"}
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-center md:hidden">
          <div className="flex justify-center items-center">
            <DocumentSponsor fillColor2={analysis.document === "Pending" ? "#FF0000" : "#0075C9"} />
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 hidden flex-col items-center md:flex">
          {analysis.autoShip.toLocaleUpperCase() === "YES" && <AutoShipponsor />}
        </div>
      </div>
      <div className="w-full grid grid-cols-4 md:grid-cols-9 md:hidden">
        <div className="md:col-span-2 col-span-1 flex flex-col items-start">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`left_pv`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.leftPV ? <NumberFormat value={analysis.leftPV} /> : "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col sm:items-center">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`right_pv`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.rightPV ? <NumberFormat value={analysis.rightPV} /> : "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-center">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`pv_level`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.pVLevel || "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-3 col-span-1 flex flex-col items-center">
          <div className="flex-col flex items-center w-max">
            {analysis.autoShip.toLocaleUpperCase() === "YES" && <AutoShipponsor className="w-4" />}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserInfomatio = ({ analysis }: { analysis: SponsorAnalysisModel }) => {
  const { userID, userName } = analysis;
  const route = useRouter();

  const handleClickOrganization = () => {
    route.push("/organization-chart");
  };

  const handleClickPvSponsor = () => {
    route.push("/pv-history-report");
  };

  return (
    <div className="w-36 flex flex-col">
      <div className="w-full grid grid-cols-4 gap-x-4 md:gap-x-0">
        <div className="col-span-2 sm:col-span-3 text-orange font-normal text-sm">{userID}</div>
        <div className="col-span-1 flex justify-between items-center">
          <div
            className={`cursor-pointer ${cls.organizaIcon} mr-[14.5px] sm:mr-0`}
            onClick={handleClickOrganization}
          >
            <OrganizationIcon fillColor2="#0075c9" />
          </div>
          <div className={`cursor-pointer ${cls.organizaIcon}`} onClick={handleClickPvSponsor}>
            <PVSponsor />
          </div>
        </div>
      </div>
      <div className={`text-black-dark text-sm w-full ${cls.userName} h-10`}>{userName || "_"}</div>
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

export default function SponsorTableBody() {
  const classes = useStyles();
  const { sponsorAnalysis, loading } = useSelector((state: RootState) => state.sponsorAnalysis);
  const { t } = useTranslation("common");
  const width = useGetScreenWidth();

  if (loading) {
    return (
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
  }
  if (!sponsorAnalysis.data?.length) {
    return <NoDataTable />;
  }
  return (
    <TableBody>
      {sponsorAnalysis.data.map((analysis: SponsorAnalysisModel, index) => (
        <CollapsibleBodyRow
          key={analysis.userID}
          index={index}
          colSpan={9}
          preview={<PreviewAnalysis analysis={analysis} />}
        >
          <TableCell className={classes.bodyCell}>
            <UserInfomatio analysis={analysis} />
          </TableCell>
          <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
            {t(analysis.team.toLowerCase()) || "_"}
          </TableCell>
          <TableCell
            align="center"
            className={`${classes.bodyCell} ${
              analysis.status === "Active" ? "text-greenLight" : "text-red"
            }`}
          >
            {analysis.status && analysis.status !== "Terminate"
              ? t(analysis.status.toLowerCase())
              : "_"}
          </TableCell>
          {width === "Desktop" && (
            <>
              <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                {analysis.ownPV ? <NumberFormat value={analysis.ownPV} /> : "_"}
              </TableCell>
              <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                {analysis.leftPV ? <NumberFormat value={analysis.leftPV} /> : "_"}
              </TableCell>
              <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                {analysis.rightPV ? <NumberFormat value={analysis.rightPV} /> : "_"}
              </TableCell>
              <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                {analysis.pVLevel || "_"}
              </TableCell>
              <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                <div className="flex justify-center items-center">
                  <DocumentSponsor
                    fillColor2={analysis.document === "Pending" ? "#FF0000" : "#0075C9"}
                  />
                </div>
              </TableCell>
            </>
          )}
        </CollapsibleBodyRow>
      ))}
    </TableBody>
  );
}
