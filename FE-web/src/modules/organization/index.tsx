// import { useMemo, useState } from "react";
import useTranslation from "next-translate/useTranslation";
// import { useRouter } from "next/router";
// import { RootState } from "src/state/store";
// import { useSelector } from "react-redux";

// import { CustomSelect, OptionType } from "src/components/select/custom-select";
// import { HeartIcon } from "src/components/svg";
// import { routeFavoriteMemberBase } from "src/constants/routes";
// import ListScreen from "./list-screen";
// import TreeScreen from "./tree-screen";
// import cls from "./organization.module.css";

export default function Organization() {
  // const [team, setTeam] = useState<string>("Left");
  const { t } = useTranslation("common");
  // const router = useRouter();
  // const optionScreens = [
  //   { title: t`list`, value: "list" },
  //   { title: t`tree`, value: "tree" },
  // ];
  // const defaultScreen = optionScreens[1].value;
  // const [screen, setScreen] = useState<string>(defaultScreen);

  // const { organizationList, loading } = useSelector((state: RootState) => state.organization);

  // const optionTeams = useMemo(() => {
  //   const { total } = organizationList;
  //   const titleLeft = total > 0 && team === "Left" && !loading ? `${t`left`} (${total})` : t`left`;
  //   const titleRight =
  //     total > 0 && team === "Right" && !loading ? `${t`right`} (${total})` : t`right`;
  //   return [
  //     { title: titleLeft, value: "Left" },
  //     { title: titleRight, value: "Right" },
  //   ];
  // }, [organizationList, team, loading, t]);

  // const titlePage = useMemo(
  //   () => (screen === "list" ? t`your_organization_chart` : t`your_organization_tree`),
  //   [t, screen],
  // );

  // const handleChangeSelect =
  //   (cbFunction: Function) =>
  //     ({ value }: OptionType) =>
  //       cbFunction(value);

  // const redirectToFavoritePage = () => {
  //   router.push(routeFavoriteMemberBase);
  // };

  return (
    <div className="">
      <div className="mb-4 flex justify-center w-screen sm:w-full items-center">
        <div className="text-black-dark text-sm font-medium">{t("coming_soon")}</div>

        {/* <div className="text-black-dark text-sm font-medium">{titlePage}</div>
        <div className="flex items-center">
          <div className="cursor-pointer" onClick={redirectToFavoritePage}>
            <HeartIcon customercolor2="#231F20" />
          </div>
          <CustomSelect
            className={`ml-8 ${cls.customSelect}`}
            selectClassName={"text-black-dark justify-end py-2 px-4 h-auto w-28"}
            options={optionScreens}
            defaultValue={screen}
            onChange={handleChangeSelect(setScreen)}
          />
          {screen === "list" && (
            <CustomSelect
              className={`ml-8 ${cls.customSelect}`}
              selectClassName={"text-black-dark justify-end py-2 px-4 h-auto w-auto"}
              options={optionTeams}
              defaultValue={team}
              onChange={handleChangeSelect(setTeam)}
              disableClick={loading}
            />
          )}
        </div> */}
      </div>
      {/* {useMemo(
        () => (screen === "list" ? <ListScreen team={team} /> : <TreeScreen />),
        [screen, team],
      )} */}
    </div>
  );
}
