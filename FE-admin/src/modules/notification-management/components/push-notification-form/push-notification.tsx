import { useTranslation } from "react-i18next";
import { Input } from "src/components";

interface Props {
  formik: any;
}

export default function PushNotification({ formik }: Props) {
  const { t } = useTranslation("common");
  return (
    <div className="w-full">
      <div className="wide:w-6/12 w-2/3 max-w-3xl">
        <label className="block">
          <span className="block mt-2 text-sm lable-notification required">{t`topic`}</span>
          <Input
            name="topic"
            className="h-12 w-full mt-1"
            type="text"
            placeholder={t`topic-name`}
            value={formik.values.topic}
            onChange={formik.handleChange}
            errorMessage={
              formik.touched.topic && formik.errors.topic ? t(formik.errors.topic as "to_ship") : ""
            }
            inputProps={{
              maxLength: 255,
            }}
          />
        </label>
      </div>
      <div className="wide:w-6/12 w-2/3 max-w-3xl">
        <label className="block">
          <span className="block mt-2 text-sm lable-notification">{t`hyperlink`}</span>
          <Input
            name="hyperlink"
            className="h-12 w-full mt-1"
            type="text"
            placeholder={t`hyperlink`}
            value={formik.values.hyperlink}
            onChange={formik.handleChange}
            errorMessage={
              formik.touched.hyperlink && formik.errors.hyperlink
                ? t(formik.errors.hyperlink as "to_ship")
                : ""
            }
            inputProps={{
              maxLength: 255,
            }}
          />
        </label>
      </div>
      <div className="wide:w-6/12 w-2/3 max-w-3xl mt-4">
        <label className="block">
          <span className="block mt-2 text-sm lable-notification required">{t`details`}</span>
          <Input
            name="detail"
            className="w-full mt-1"
            type="text"
            placeholder={t`push-notification-details`}
            multiline={true}
            maxRows={4}
            minRows={4}
            value={formik.values.detail}
            onChange={formik.handleChange}
            errorMessage={
              formik.touched.detail && formik.errors.detail
                ? t(formik.errors.detail as "to_ship")
                : ""
            }
            inputProps={{
              maxLength: 2500,
            }}
          />
        </label>
      </div>
    </div>
  );
}
