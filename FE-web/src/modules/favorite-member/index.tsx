import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import { orderBy } from "lodash";

import { RootState } from "src/state/store";
import { CustomSelect } from "src/components/select/custom-select";
import { fetchFavoriteMemberList } from "src/feature/favorite-member/favorite-member.action";
import FavoriteMemberTable from "./favorite-member-table";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";

export default function FavoriteMembers({ searchId }: { searchId: string }) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [team, setTeam] = useState<string | number>("Left");
  const { favoriteMembers } = useSelector((state: RootState) => state.favoriteMember);

  useEffect(() => {
    dispatch(fetchFavoriteMemberList(searchId));
  }, [dispatch, searchId]);

  const options = useMemo(() => {
    if (favoriteMembers.length === 0) {
      return [
        { title: t`left`, value: "Left" },
        { title: t`right`, value: "Right" },
      ];
    }
    const countLeft = favoriteMembers?.filter((item) => item.team === "Left").length;
    const countRight = favoriteMembers?.filter((item) => item.team !== "Left").length;
    return [
      { title: `${t`left`} (${countLeft})`, value: "Left" },
      { title: `${t`right`} (${countRight})`, value: "Right" },
    ];
  }, [favoriteMembers, t]);

  const handleOnChangle = ({ value }: { value: string | number; title: string }) => {
    setTeam(value);
  };

  const members = useMemo(() => {
    const members = favoriteMembers.filter((item) => item.team === team);
    return orderBy(members, "level");
  }, [favoriteMembers, team]);
  const width = useGetScreenWidth();

  return (
    <div className="flex flex-col w-full px-4 md:px-0">
      <div className="mb-4 flex justify-between w-full items-center">
        <div className="text-black-dark text-sm font-medium">{t`favorite_member_list`}</div>
        <CustomSelect
          className="h-9"
          selectClassName={"text-black-dark justify-end py-2 px-4 h-auto min-w-min"}
          options={options}
          defaultValue={team}
          onChange={handleOnChangle}
        />
      </div>
      <FavoriteMemberTable members={members} widthScreen={width} />
    </div>
  );
}
