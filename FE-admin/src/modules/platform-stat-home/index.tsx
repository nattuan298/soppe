import NavigationDashboard from "./navigation";
import SectionChart from "./section-chart";
import { useTranslation } from "react-i18next";
import { config } from "src/constants/config";
// import SectionIssueReport from "./section-issue";
import "./styles.css";

export function HomeDashboard() {
  const { t } = useTranslation("common");
  return (
    <div className="-mb-10">
      <NavigationDashboard />
      <div className="">
        <SectionChart />
      </div>
      {config.adminReportIssueLink && (
        <div className="w-full pl-5 pr-5 pt-5 m-auto">
          <div className="w-full rounded-navbar bg-white shadow-navbar">
            <div className="w-full flex justify-start items-center px-8 py-8">
              <div className="flex float-left text-xl w-3/9">{t`issue-report`}</div>
            </div>
            <div className="w-full flex justify-start items-center px-8 pb-8">
              <a href={config.adminReportIssueLink} target="_blank" rel="noopener noreferrer">
                <div className="flex float-left text-xl text-blue underline">{t`link_issue_report`}</div>
              </a>
            </div>
          </div>
        </div>
      )}
      {/* <SectionIssueReport /> */}
    </div>
  );
}
