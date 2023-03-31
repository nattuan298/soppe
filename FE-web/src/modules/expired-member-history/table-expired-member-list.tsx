import NumberFormatCustome from "src/components/text/number-format";
import { ExpiredMemberListType } from "src/feature/expired-member-list/types";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useTranslation from "next-translate/useTranslation";
interface TableNoCollapsibleProps {
  list: ExpiredMemberListType;
  index: number;
  screen?: string;
}

export const TableExpiredMemberList = ({ list, index, screen }: TableNoCollapsibleProps) => {
  const [isOpen, setisOpen] = useState(false);
  const { t } = useTranslation("common");

  const handleToggleButton = () => {
    setisOpen((preState) => !preState);
  };
  useEffect(() => {
    if (screen! === "Desktop") {
      setisOpen(false);
    }
  }, [screen]);
  return (
    <div style={{ height: isOpen ? "auto" : 70, border: isOpen ? "1px solid #FF7500" : "none" }}>
      <div
        className={`flex w-full rounded ${index % 2 === 0 ? "bg-lighterGray" : ""}`}
        style={{ height: 70, fontSize: 14 }}
      >
        <div
          className="text-sm font-medium md:w-[35%] w-[40%]"
          style={{ marginLeft: 12, marginTop: 10 }}
        >
          <div className="w-full h-5 flex">
            <div className="text-orange text-sm float-left">{list.userId}</div>
          </div>
          <p className="float-left" style={{ color: "#231F20" }}>
            {list.userName}
          </p>
        </div>
        <div className="text-sm font-medium" style={{ width: "25%" }}>
          <p style={{ color: "#FF0000", marginTop: "24px" }}>{list.expireDate}</p>
        </div>
        <div
          className="text-sm font-medium pl-4 md:pl-0"
          style={{ width: "15%", marginTop: "24px" }}
        >
          <NumberFormatCustome value={list.gen} />
        </div>
        {screen! === "Desktop" && (
          <div
            className="text-sm font-medium text-orange"
            style={{ width: "25%", marginTop: "10px", marginRight: "8px" }}
          >
            <p>{list.sponsorId || "_"}</p>
            <p className="" style={{ color: "#231F20" }}>
              {list.sponsorName || "_"}
            </p>
          </div>
        )}
        {screen! === "Mobile" && (
          <div className="flex flex-row-reverse items-center pl-10" style={{ width: "6%" }}>
            <div
              className={`w-6 rounded-full flex items-center justify-center cursor-pointer ${
                index % 2 === 0 ? "bg-white" : "bg-lighterGray"
              }`}
              onClick={handleToggleButton}
            >
              {!isOpen && <KeyboardArrowDownIcon fontSize="small" />}
              {isOpen && <KeyboardArrowUpIcon fontSize="small" className="text-orange" />}
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <>
          <div
            className={`flex w-full pt-2 rounded pl-3 pr-3 pb-6 ${
              index % 2 !== 0 ? "bg-white" : "bg-lighterGray"
            }`}
          >
            <div className="text-sm" style={{ width: "20%" }}>
              <div
                className="md:text-sm text-[10px] font-medium text-orange"
                style={{ width: "200px", marginTop: "10px", marginRight: "8px" }}
              >
                <p className="text-[10px] text-black font-medium">{t("sponsor")}</p>
                <p>{list.sponsorId || "_"}</p>
                <p className="" style={{ color: "#231F20" }}>
                  {list.sponsorName || "_"}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
