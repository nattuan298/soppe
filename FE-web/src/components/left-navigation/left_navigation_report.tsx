import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import {
  routeCommissionReportBase,
  routeCycleAndFOBReportBase,
  routeCycleHistoryReportBase,
  routeDirectSponsorAnalysisBase,
  routeEcommissionStatementBase,
  routeExpiredMemberListBase,
  routeFavoriteMemberBase,
  routeG1Analysis,
  routeMakePinOfCirectSponsorTeamBase,
  routeMyAccountBase,
  routeNearExpireMemberListBase,
  routeNewPinOfCirectSponsorTeamBase,
  routeNewRegisterUpdateSuExSteamBase,
  routeOrganizationChart,
  routeReportAnalysisBase,
  routeSponsorChart,
  routeTravelPVHistoryBase,
  routeTripProcess,
} from "src/constants/routes";
import {
  AccountInfoIcon,
  AnalysisIcon,
  DocumentWithIconTime,
  ExpireMember,
  HeartIcon,
  NearExpireMember,
  OrganizationIcon,
  TravelVali,
} from "../svg";
import OneGroup from "./group_menu";
import cls from "./index.module.css";

const menu = [
  {
    title: "personal_report",
    childMenu: [
      {
        icon: <AnalysisIcon />,
        title: "personal_statistic",
        urlBase: routeReportAnalysisBase,
      },
      {
        icon: <AccountInfoIcon />,
        title: "account_info",
        urlBase: routeMyAccountBase,
      },
      { icon: <OrganizationIcon />, title: "organization_chart", urlBase: routeOrganizationChart },
      { icon: <HeartIcon />, title: "favorite-member", urlBase: routeFavoriteMemberBase },
      { icon: <OrganizationIcon />, title: "sponsor_chart", urlBase: routeSponsorChart },
    ],
  },
  {
    title: "direct_sponsor_report",
    childMenu: [
      {
        icon: <DescriptionOutlinedIcon />,
        title: "g1_analysis",
        urlBase: routeG1Analysis,
      },
      {
        icon: <DescriptionOutlinedIcon />,
        title: "direct_sponsor_team_analysis",
        urlBase: routeDirectSponsorAnalysisBase,
      },
      {
        icon: <DescriptionOutlinedIcon />,
        title: "new_pin_of_direct_sponsor_team",
        urlBase: routeNewPinOfCirectSponsorTeamBase,
      },
      {
        icon: <DescriptionOutlinedIcon />,
        title: "matching_pin_of_direct_sponsor_team",
        urlBase: routeMakePinOfCirectSponsorTeamBase,
      },
      {
        icon: <DescriptionOutlinedIcon />,
        title: "new_register_update_su_ex_s_team",
        urlBase: routeNewRegisterUpdateSuExSteamBase,
      },
    ],
  },
  {
    title: "commission",
    childMenu: [
      {
        icon: <DescriptionOutlinedIcon />,
        title: "ecommission_statement",
        urlBase: routeEcommissionStatementBase,
      },
      {
        icon: <DescriptionOutlinedIcon />,
        title: "commission_report",
        urlBase: routeCommissionReportBase,
      },
      {
        icon: <DocumentWithIconTime />,
        title: "cycle_and_fob_report",
        urlBase: routeCycleAndFOBReportBase,
      },
      {
        icon: <DocumentWithIconTime />,
        title: "cycle_history_report",
        urlBase: routeCycleHistoryReportBase,
      },
    ],
  },
  {
    title: "travel_bonus",
    childMenu: [
      { icon: <TravelVali />, title: "trip_progress", urlBase: routeTripProcess },
      {
        icon: <DescriptionOutlinedIcon />,
        title: "travel_tp_history",
        urlBase: routeTravelPVHistoryBase,
      },
    ],
  },
  {
    title: "member",
    childMenu: [
      {
        icon: <NearExpireMember />,
        title: "near_expire_member_list",
        urlBase: routeNearExpireMemberListBase,
      },
      { icon: <ExpireMember />, title: "expired_member_list", urlBase: routeExpiredMemberListBase },
    ],
  },
];

export default function LeftNavinationReport({
  hidden = true,
  isMobile = false,
  onClose,
}: {
  hidden?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <div>
      <div className={`${cls.container} w-auto sm:w-60 ${hidden && "hidden sm:block"}`}>
        {menu.map((item) => (
          <OneGroup
            key={item.title}
            title={item.title}
            childMenu={item.childMenu}
            isMobile={isMobile}
            handleClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}
