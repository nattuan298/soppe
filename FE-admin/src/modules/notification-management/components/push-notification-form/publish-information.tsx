import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker, Input, MultipleSelect, Select } from "src/components";

interface PropsType {
  formik: any;
}

interface OptionType {
  title: string;
  value: string | number | boolean;
}

export default function PublishInformation({ formik }: PropsType) {
  const { t } = useTranslation("common");

  const [hour, setHour] = useState<string>("0");
  const [minute, setMinute] = useState<string>("0");

  const hourOptions = useMemo(
    () =>
      Array.from(Array(24).keys()).map((item) => ({
        title: `${item < 10 ? `0${item}` : item}`,
        value: `${item}`,
      })),
    [],
  );
  const minuteOptions = useMemo(
    () =>
      Array.from(Array(60).keys()).map((item) => ({
        title: `${item < 10 ? `0${item}` : item}`,
        value: `${item}`,
      })),
    [],
  );

  useEffect(() => {
    const { publishDate } = formik.values;
    if (publishDate === "") {
      setHour("0");
      setMinute("0");
      return;
    }
    const date = new Date(publishDate);
    setHour(`${date.getHours()}`);
    setMinute(`${date.getMinutes()}`);
  }, [formik.values.publishDate]);

  const handleChangeDate = (value: string) => {
    const date = new Date(value);
    date.setHours(Number(hour));
    date.setMinutes(Number(minute));
    date.setSeconds(0);
    formik.setFieldValue("publishDate", date.toISOString());
  };

  const handleChangeHour = (value: string | null) => {
    if (!value) {
      return;
    }
    setHour(value);
    if (formik.values.publishDate !== "") {
      const date = new Date(formik.values.publishDate);
      date.setHours(Number(value));
      formik.setFieldValue("publishDate", date.toISOString());
    }
  };

  const handleChangeMinute = (value: string | null) => {
    if (!value) {
      return;
    }
    setMinute(value);
    if (formik.values.publishDate !== "") {
      const date = new Date(formik.values.publishDate);
      date.setMinutes(Number(value));
      formik.setFieldValue("publishDate", date.toISOString());
    }
  };

  const handleChangeChanel = (values: Array<OptionType>) => {
    const channels = values.map(({ value }) => value) as Array<string>;
    formik.setFieldValue("channel", channels);
  };

  const handleChangeSelect = (key: string) => (value: any) => {
    formik.setFieldValue(key, value);
  };

  const handleChangeTarger = handleChangeSelect("target");
  const handleChangeStatus = handleChangeSelect("status");
  const handleChangeCategory = handleChangeSelect("category");

  return (
    <div className="w-full">
      <div className="wide:w-6/12 w-2/3 max-w-3xl flex justify-between">
        <label className="block w-1/2 mr-4 mb-1">
          <span className="block mt-2 text-sm lable-notification required">{t`target`}</span>
          <Select
            className="float-left w-full h-12 rounded-md mt-1"
            placeholder={t`select-publish-target`}
            onChange={handleChangeTarger}
            options={[
              { title: t`users`, value: "Users" },
              { title: t`internal_users`, value: "Internal Users" },
            ]}
            error={
              formik.touched.target && formik.errors.target
                ? t(formik.errors.target as "to_ship")
                : ""
            }
            defaultValue={formik.values.target}
          />
        </label>
        <label className="block w-1/2 ml-4">
          <span className="block mt-2 text-sm lable-notification required">{t`channel`}</span>
          <MultipleSelect
            className="float-left w-full h-12 rounded-md mt-1"
            placeholder={t`select-publish-channel`}
            options={[
              { title: t`web_app`, value: "Web App" },
              { title: t`mobile_app`, value: "Mobile App" },
              { title: t`email`, value: "Email" },
              { title: t`message`, value: "Message" },
            ]}
            selectedValues={formik.values.channel}
            onChange={handleChangeChanel}
            error={
              formik.touched.channel && formik.errors.channel
                ? t(formik.errors.channel as "to_ship")
                : ""
            }
          />
        </label>
      </div>
      <div className="wide:w-6/12 w-2/3 max-w-3xl flex justify-between mt-4 mb-1">
        <div className="block w-1/2 mr-4">
          <span className="block mt-2 text-sm lable-notification required ">{t`publish-date`}</span>
          <div className="flex w-full items-center">
            <div className="w-3/5 mr-1">
              <DatePicker
                onChange={handleChangeDate}
                className="w-full focus:outline-none focus:ring-1 rounded pl-0 placeholder-italic mt-2 select-date border"
                hasMaxDate={false}
                value={formik.values.publishDate}
                minDate={new Date()}
              />
            </div>
            <div className="w-1/5 mr-1 ml-1">
              <Select
                className="float-left w-full h-12 rounded-md mt-1"
                options={hourOptions}
                defaultValue={hour}
                onChange={handleChangeHour}
                scrollIntoView
              />
            </div>
            :
            <div className="w-1/5 ml-1">
              <Select
                className="float-left w-full h-12 rounded-md mt-1"
                options={minuteOptions}
                defaultValue={minute}
                onChange={handleChangeMinute}
                scrollIntoView
              />
            </div>
          </div>
          <Input
            name="publishDate"
            className="notification-date hidden-input"
            value={formik.values.publishDate}
            errorMessage={
              formik.touched.publishDate && formik.errors.publishDate
                ? t(formik.errors.publishDate as "to_ship")
                : ""
            }
          />
        </div>
        <label className="block w-1/2 ml-4">
          <span className="block mt-2 text-sm lable-notification required">{t`status`}</span>
          <Select
            className="float-left w-full h-12 rounded-md mt-1"
            options={[
              { title: t`active`, value: "Active" },
              { title: t`inactive`, value: "Inactive" },
            ]}
            onChange={handleChangeStatus}
            defaultValue={formik.values.status}
          />
        </label>
      </div>
      <div className="wide:w-6/12 w-2/3 max-w-3xl flex justify-between mt-1 mb-4">
        <label className="block w-1/2 mr-4">
          <span className="block mt-2 text-sm text-black required">{t`category`}</span>
          <Select
            className="float-left w-full h-12 rounded-md mt-1"
            placeholder={t`select-category`}
            options={[
              { title: t`news`, value: "News" },
              { title: t`notice`, value: "Notice" },
              { title: t`promotion`, value: "Promotion" },
            ]}
            onChange={handleChangeCategory}
            error={
              formik.touched.category && formik.errors.category
                ? t(formik.errors.category as "to_ship")
                : ""
            }
            defaultValue={formik.values.category}
          />
        </label>
        <label className="block w-1/2 ml-4"></label>
      </div>
    </div>
  );
}
