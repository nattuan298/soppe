import { TableBody, TableCell, TableRow, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import { useRouter } from "next/router";
import { CollapsibleBodyRow } from "src/components/collapsible-table";
import { G1AnalysisModel } from "src/feature/g1-analysis-analysis/type";
import { RootState } from "src/state/store";
import NoDataIcon from "src/components/svgs/no-data";
import cls from "./g1-analysis.module.css";
import { AutoShipponsor, DocumentSponsor, OrganizationIcon, PVSponsor } from "src/components/svg";
import { LoadingIndicator } from "src/components/animation/loading-indicator";
import NumberFormat from "src/components/text/number-format";
import clsx from "clsx";
import React from "react";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
const useStyles = makeStyles({
  bodyCell: {
    padding: "15px 10px 15px 10px",
    fontWeight: 400,
  },
  closeRow: {
    "&:nth-last-child(2)": {
      "& .MuiTableCell-body": {
        borderBottom: "none",
      },
    },
  },
});

const PreviewAnalysis = ({ analysis }: { analysis: G1AnalysisModel }) => {
  const { t } = useTranslation("common");
  return (
    <div className="w-full flex-col flex my-4">
      {/* <div className="w-full grid grid-cols-9 mb-6"> */}
      <div className="w-full grid grid-cols-5 md:grid-cols-9 mb-4 md:mb-6">
        <div className="md:col-span-3 col-span-1">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`apply_date`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.applyDate || "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex sm:block justify-center">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`expire_date`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.expDate || "_"}
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center">
          <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`update_expire_date`}</div>
          <div className="text-[10px] md:text-sm text-black-dark font-normal">
            {analysis.upgradeExpDate || "_"}
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
              {analysis.newSup || "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-start">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`mem_to_ex`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.newEx || "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-center">
          <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`own_pv`}</div>
          <div className="text-[10px] md:text-sm text-black-dark font-normal">
            {analysis.ownPv ? <NumberFormat value={analysis.ownPv} /> : "_"}
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-center  md:hidden">
          <div className="flex justify-center items-center">
            <DocumentSponsor fillColor2={analysis.document === "Pending" ? "#FF0000" : "#0075C9"} />
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 hidden flex-col items-center  md:flex">
          {analysis.autoShip.toLocaleUpperCase() === "YES" && <AutoShipponsor />}
        </div>
      </div>

      <div className="w-full grid grid-cols-4 md:grid-cols-9  md:hidden">
        <div className="md:col-span-2 col-span-1 flex flex-col items-start">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`left_pv`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.leftPv ? <NumberFormat value={analysis.leftPv} /> : "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col sm:items-center">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`right_pv`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.rightPv ? <NumberFormat value={analysis.rightPv} /> : "_"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1 flex flex-col items-center">
          <div className="flex-col flex items-center w-max">
            <div className="text-[10px] md:text-sm text-black-dark font-medium">{t`pv_level`}</div>
            <div className="text-[10px] md:text-sm text-black-dark font-normal">
              {analysis.pvLevel || "_"}
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

const UserInformation = ({ analysis }: { analysis: G1AnalysisModel }) => {
  const { memberId, memberName } = analysis;
  const route = useRouter();

  const handleClickOrganization = () => {
    route.push("/organization-chart");
  };
  const handleClickPvSponsor = () => {
    route.push("/pv-history-report");
  };
  return (
    <div className="w-36 flex flex-col">
      <div className="w-full grid grid-cols-4 gap-x-2 md:gap-x-0">
        <div className="col-span-2 sm:col-span-3 text-orange font-normal text-sm">{memberId}</div>
        <div className="col-span-1 flex justify-between items-center">
          <div
            className={`cursor-pointer ${cls.organizationIcon} mr-[14.5px] sm:mr-0`}
            onClick={handleClickOrganization}
          >
            <OrganizationIcon fillColor2="#0075c9" />
          </div>
          <div className={`cursor-pointer ${cls.organizationIcon}`} onClick={handleClickPvSponsor}>
            <PVSponsor />
          </div>
        </div>
      </div>
      <div className={`text-black-dark text-sm w-full ${cls.userName} h-10`}>
        {memberName || "_"}
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

export function G1AnalysisTableBody() {
  const classes = useStyles();
  const { g1Analysis, isGettingG1Analysis } = useSelector((state: RootState) => state.g1Analysis);
  const { t } = useTranslation("common");
  const width = useGetScreenWidth();

  if (isGettingG1Analysis) {
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
  if (!g1Analysis.docs?.length) {
    return <NoDataTable />;
  }
  return (
    <TableBody>
      {g1Analysis.docs.map((analysis: G1AnalysisModel, index) => (
        <CollapsibleBodyRow
          className={clsx(classes.closeRow)}
          key={analysis.memberId}
          index={index}
          colSpan={9}
          preview={<PreviewAnalysis analysis={analysis} />}
        >
          <TableCell className={classes.bodyCell}>
            <UserInformation analysis={analysis} />
          </TableCell>
          <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
            {t(analysis.side.toLowerCase()) || "_"}
          </TableCell>
          <TableCell
            align="center"
            className={`${classes.bodyCell} ${
              analysis.statusMember === "Active" ? "text-greenLight" : "text-red"
            }`}
          >
            {analysis.statusMember ? t(analysis.statusMember.toLowerCase()) : "_"}
          </TableCell>
          {width === "Desktop" && (
            <React.Fragment>
              <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                {analysis.ownPv ? <NumberFormat value={analysis.ownPv} /> : "_"}
              </TableCell>
              <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                {analysis.leftPv ? <NumberFormat value={analysis.leftPv} /> : "_"}
              </TableCell>
              <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                {analysis.rightPv ? <NumberFormat value={analysis.rightPv} /> : "_"}
              </TableCell>
              <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                {analysis.pvLevel || "_"}
              </TableCell>
              <TableCell align="center" className={`${classes.bodyCell} text-black-dark`}>
                <div className="flex justify-center items-center">
                  <DocumentSponsor
                    fillColor2={analysis.document === "Pending" ? "#FF0000" : "#0075C9"}
                  />
                </div>
              </TableCell>
            </React.Fragment>
          )}
        </CollapsibleBodyRow>
      ))}
    </TableBody>
  );
}
