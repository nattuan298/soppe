import { Tooltip } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import classNames from "classnames";
import axios from "src/lib/client/request";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";

import { AccountIcon, HeartIcon } from "src/components/svg";
import { TreeNodeType } from "src/feature/organization/types";
import { FavoriteIcon } from "src/components/svgs";
import { notifyToast } from "src/constants/toast";
import { changeFavoriteMember } from "src/feature/organization/organization.slice";

import cls from "../organization.module.css";

const AvatarUser = ({ name }: { name: string }) => (
  <div className={`w-10 h-10 rounded-1/2 ${cls.avatarUserDetail} flex items-center justify-center`}>
    <div className="text-lg text-orange font-medium">{name.charAt(0).toLocaleUpperCase()}</div>
  </div>
);

const AvatarDefault = () => (
  <div className={`w-10 h-10 rounded-1/2 ${cls.defaultAvatar} flex items-center justify-center`}>
    <AccountIcon className="mx-auto" width={"18"} height={"18"} customercolor2="#707070" />
  </div>
);
export function NodeEmpty() {
  const { t } = useTranslation("common");
  return (
    <div className="w-full flex items-center justify-center my-1">
      <div className="flex flex-col items-center justify-center">
        <AvatarDefault />
        <div className="w-24 mb-4 text-black-dark font-normal text-xs">{t`empty`}</div>
      </div>
    </div>
  );
}

const ItemToolTip = ({
  name,
  price,
  className,
}: {
  name: string;
  price: number | undefined;
  className: string;
}) => {
  return (
    <div className={classNames("flex items-center", className)}>
      <div className={classNames("rounded-1/2 flex items-center justify-center", cls.pvCicle)}>
        {name.substring(0, 2).toLocaleUpperCase()}
      </div>
      <div className="flex items-start justify-start">
        <div className="text-black-dark text-base">{price}</div>
        <div className={cls.pv}>pv</div>
      </div>
    </div>
  );
};

const TooltipDetail = ({ node }: { node: TreeNodeType }) => {
  const { t } = useTranslation("common");
  return (
    <div className={classNames(cls.tooltipDetail, "flex flex-col")}>
      <div className="flex items-center mb-4">
        <div className={cls.privatePv}>{t`private-pv-this-month`}</div>
        <div className="flex items-start justify-start">
          <div className="text-black-dark text-base">{node.privatePVThisMonth}</div>
          <div className={cls.pv}>pv</div>
        </div>
      </div>
      <div className="grid grid-cols-2 mb-3">
        <ItemToolTip name="OL" price={node.pvOldLeft} className="col-span-1" />
        <ItemToolTip name="OR" price={node.pvOldRight} className="col-span-1" />
      </div>
      <div className="grid grid-cols-2 mb-3">
        <ItemToolTip name="NL" price={node.pvNewLeft} className="col-span-1" />
        <ItemToolTip name="NR" price={node.pvNewRight} className="col-span-1" />
      </div>
      <div className="grid grid-cols-2">
        <ItemToolTip name="TL" price={node.pvTotalLeft} className="col-span-1" />
        <ItemToolTip name="TR" price={node.pvTotalRight} className="col-span-1" />
      </div>
    </div>
  );
};

const FavoriteComponent = ({
  isFavorite,
  memberId,
}: {
  isFavorite: boolean | undefined;
  memberId: string;
}) => {
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
    <div className="flex justify-between items-center">
      <div className={`cursor-pointer ${cls.organizaIcon}`} onClick={changeFavorite}>
        {isFavorite ? (
          <FavoriteIcon />
        ) : (
          <HeartIcon
            customercolor2="#231F20"
            width="12"
            height="12"
            className="cursor-pointer mt-0.5"
          />
        )}
      </div>
    </div>
  );
};

export function NodeUserDetail({ node, isRoot }: { node: TreeNodeType; isRoot?: boolean }) {
  const { memberId = "A", memberName, isFavorite } = node;
  return (
    <div className="w-full flex items-center justify-center my-1">
      <Tooltip className={"detail-tooltip"} title={<TooltipDetail node={node} />} placement="right">
        <div className="flex flex-col items-center justify-center">
          <AvatarUser name={memberName.trim()} />
          <div className="w-24 text-xs text-orange truncate">{memberId.trim()}</div>
          <div className="flex items-center w-24 justify-center">
            <div className="text-xs text-black-dark truncate mr-1">{memberName}</div>
            {!isRoot && <FavoriteComponent isFavorite={isFavorite} memberId={memberId} />}
          </div>
        </div>
      </Tooltip>
    </div>
  );
}
