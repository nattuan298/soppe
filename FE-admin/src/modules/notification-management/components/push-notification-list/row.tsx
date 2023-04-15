import { useTranslation } from "react-i18next";
import TableCell from "@material-ui/core/TableCell";
import { format } from "date-fns";

import { ActionButton, ButtonLink, CollapsibleBodyRow, StatusDropdown } from "src/components";
import { NotificationModel } from "src/types/notification.model";
import { textChangeLanguage } from "src/lib/format";

export interface PreviewNotify {
  details: string;
  channel: Array<string>;
}

interface RowNotifyType {
  item: NotificationModel;
  handleDelete: () => void;
  handleChange: (data: NotificationModel, value: string) => void;
}

export const Preview = ({ details, channel }: PreviewNotify) => {
  const { t } = useTranslation("common");
  return (
    <div className="my-7.5">
      <div className="mt-5">
        <label>
          <p className="text-base font-medium">{`${t`channel`} (${channel.length}/4)`}</p>
        </label>
        <div className="mt-4">
          {channel.map((item) => (
            <span className="bg-black-primary py-2 px-11 text-white chanel-item-notifi mr-5 text-base">
              {t(textChangeLanguage(item).toLocaleLowerCase() as "to_ship")}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <label>
          <p className="text-base font-medium">{t`details`}</p>
        </label>
        <label className="text-base">{details}</label>
      </div>
    </div>
  );
};

export default function NotificationListRow({ item, handleDelete, handleChange }: RowNotifyType) {
  const { _id, topic, createdAt, publishDate, status, target, channel, category, detail, isSent } =
    item;
  const titleCreateAt = format(new Date(createdAt), "dd LLL yyyy HH:mm:ss");
  const titlePublishDate = format(new Date(publishDate), "dd LLL yyyy HH:mm:ss");
  const [firstChar, ...restChar] = status;
  const defaultStatus = firstChar + restChar.join("").toLocaleLowerCase();
  const { t } = useTranslation("common");

  const dateSlice = (date: string) => {
    let result = "";

    result =
      date.slice(0, 3) + t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") + date.slice(6);

    return result;
  };

  return (
    <CollapsibleBodyRow
      colSpan={11}
      key={_id}
      preview={<Preview details={detail} channel={channel} />}
    >
      <TableCell>
        <div className="flex">
          <div className="flex product-name wide:w-max w-48">
            <div className="float-left flex justify-between items-center">
              <label>
                <p className="name-banner">{topic}</p>
              </label>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="w-32">{dateSlice(titleCreateAt)}</div>
      </TableCell>
      <TableCell>
        <div className="w-32">{dateSlice(titlePublishDate)}</div>
      </TableCell>
      <TableCell align="center">
        {t(textChangeLanguage(target).toLocaleLowerCase() as "to_ship")}
      </TableCell>
      <TableCell align="center">
        {t(textChangeLanguage(category).toLocaleLowerCase() as "to_ship")}
      </TableCell>
      <TableCell align="center">
        <StatusDropdown
          data={item}
          statusOptions={["active", "inactive"]}
          defaultValue={defaultStatus.toLowerCase()}
          onChange={handleChange}
          trans={t}
        />
      </TableCell>
      <TableCell align="center">
        <div className="flex action-buttons-wrapper justify-center">
          <ButtonLink
            disabled={isSent}
            to={`/admin-dashboard/push-notification/edit-push-notification/${_id}`}
          >
            <ActionButton action="edit" disabled={isSent} />
          </ButtonLink>
          <ActionButton action="delete" onClick={handleDelete} />
        </div>
      </TableCell>
    </CollapsibleBodyRow>
  );
}
