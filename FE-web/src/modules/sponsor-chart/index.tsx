import { useMemo, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { RootState } from "src/state/store";
import { useSelector } from "react-redux";

import { CustomSelect, OptionType } from "src/components/select/custom-select";
import { HeartIcon } from "src/components/svg";
import { routeFavoriteMemberBase } from "src/constants/routes";
import ListScreen from "./list-screen";
import cls from "./sponsorchart.module.css";

export default function SponsorChart({ keyWord }: { keyWord: string }) {
  const [team, setTeam] = useState<string>("Left");
  const { t } = useTranslation("common");
  const router = useRouter();

  const { sponsorChart, loading } = useSelector((state: RootState) => state.sponsorChart);

  const optionTeams = useMemo(() => {
    const { totalDocs } = sponsorChart;
    const titleLeft =
      totalDocs > 0 && team === "Left" && !loading ? `${t`left`} (${totalDocs})` : t`left`;
    const titleRight =
      totalDocs > 0 && team === "Right" && !loading ? `${t`right`} (${totalDocs})` : t`right`;
    return [
      { title: titleLeft, value: "Left" },
      { title: titleRight, value: "Right" },
    ];
  }, [sponsorChart, team, loading, t]);

  const handleChangeSelect =
    (cbFunction: Function) =>
      ({ value }: OptionType) =>
        cbFunction(value);

  const redirectToFavoritePage = () => {
    router.push(routeFavoriteMemberBase);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-4 flex justify-between w-full items-center">
        <div className="text-black-dark text-sm font-medium">{t`sponsor_chart`}</div>
        <div className="flex items-center">
          <div className="cursor-pointer" onClick={redirectToFavoritePage}>
            <HeartIcon customercolor2="#231F20" />
          </div>
          <CustomSelect
            className={`ml-8 ${cls.customSelect}`}
            selectClassName={"text-black-dark justify-end py-2 px-4 h-auto w-auto"}
            options={optionTeams}
            defaultValue={team}
            onChange={handleChangeSelect(setTeam)}
            disableClick={loading}
          />
        </div>
      </div>
      <ListScreen side={team} keyword={keyWord} />
    </div>
  );
}
