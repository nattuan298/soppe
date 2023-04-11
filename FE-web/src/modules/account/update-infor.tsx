import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { ButtonMui, DatePicker, Select, Title } from "src/components";
import { CheckBoxWithText } from "src/components/checkbox/with-text";
import DialogCustome from "src/components/dialog";
import InputBasic from "src/components/input/input-basic";
import SelectCountry from "src/components/select/country";
import { apiRoute } from "src/constants/apiRoutes";
import { CountryPhoneCodeType } from "src/constants/country_phone_code";
import { ListPreFix } from "src/constants/signup";
import { fetchUserInformation } from "src/feature/user/action";
import { UserInforType } from "src/feature/user/type";
import axios from "src/lib/client/request";
import { validateEmail } from "src/lib/validate";

type InforType = Pick<
  UserInforType,
  "firstName" | "lastName" | "gender" | "email" | "dateOfBirth"
>;
const cookies = new Cookies();

export default function UpdateInfor({
  onCancel,
  user,
}: {
  onCancel: () => void;
  user: UserInforType;
}) {
  const { t } = useTranslation("common");
  const [state, setState] = useState<InforType>({
    firstName: "",
    lastName: "",
    gender: "Male",
    email: "",
    dateOfBirth: Date(),
  });
  const [errors, setErrors] = useState<Partial<InforType>>({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const userInfor = cookies.get("member");
  console.log(userInfor);
  const handleChange = (name: keyof InforType) => (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: e.target.value });
    if (name === "email") {
      setErrors({ ...errors, email: "" });
    }
  };

  const handleChangeSelect = (name: keyof InforType) => (e: { value: string | null }) => {
    if (e.value) {
      setState({ ...state, [name]: e.value });
    }
  };

  useEffect(() => {
    const { firstName, lastName, gender, email, dateOfBirth } = user;
    setState({ firstName, lastName, gender, email, dateOfBirth });
  }, [user]);

  const handleClickCheckbox = (params: { checked: boolean; name?: string }) => {
    const { name, checked } = params;
    if (state.gender !== name && checked && name) {
      setState({ ...state, gender: name });
    }
  };

  const handleChangeDate = (value: Date) => {
    setState({ ...state, dateOfBirth: value.toString() });
  };



  const disabledButton = !state.firstName.trim() || !state.lastName.trim() || !state.dateOfBirth;

  const onSubmit = async () => {
    if (state.email && !validateEmail(state.email)) {
      return setErrors({ ...errors, email: "email_wrong_format" });
    }

    try {
      setLoading(true);
      const body: Partial<InforType> & { dateOfBirth: string } = {
        ...state,
        dateOfBirth: dayjs(state.dateOfBirth).format("YYYY-MM-DD"),
      };

      delete body.dateOfBirth;

      await axios.put(`users/${userInfor.user._id}`, body);

      await dispatch(fetchUserInformation());
      setLoading(false);
      onCancel();
    } catch (e) {}
  };

  const handleCancel = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleConfirmModal = () => {
    handleCloseModal();
    onCancel();
  };
  console.log(state);
  return (
    <div className="grid md:grid-cols-5">
      <div className="md:col-span-4">
        <div className="grid md:grid-cols-2 gap-3.5 md:gap-8">
          <div className="col-span-1 row-span-1">
            <Title title={t`first-name`} isRequired />
            <div className="flex">
              <div className="pl-[7px] md:pl-4 flex-grow">
                <InputBasic
                  placeholder={t`first-name`}
                  value={state.firstName}
                  onChange={handleChange("firstName")}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 row-span-1">
            <Title title={t`last-name`} isRequired />
            <InputBasic
              placeholder={t`last-name`}
              value={state.lastName}
              onChange={handleChange("lastName")}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3.5 md:gap-8 mt-4">
          <div className="col-span-1 row-span-1">
            <Title title={t`gender`} isRequired />
            <div className="flex items-center pt-2">
              <CheckBoxWithText
                text={t`male`}
                checked={state.gender === "Male"}
                className="mr-8"
                name="Male"
                onChange={handleClickCheckbox}
              />
              <CheckBoxWithText
                text={t`female`}
                checked={state.gender === "Female"}
                name="Female"
                onChange={handleClickCheckbox}
              />
            </div>
          </div>

          <div className="col-span-1 row-span-1">
            <Title title={t`email`} />
            <InputBasic
              placeholder={t`email`}
              value={state.email}
              onChange={handleChange("email")}
              helperText={errors.email}
              t={t}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3.5 md:gap-8 mt-4">
          <div className="col-span-1 row-span-1">
            <Title title={t`date_of_birth`} isRequired />
            <DatePicker
              defaultDate={new Date(state.dateOfBirth)}
              onChange={handleChangeDate}
              maxDate={new Date()}
            />
          </div>

        </div>
        <div className="grid md:grid-cols-2 gap-3.5 md:gap-8 mt-4">
          <div className="col-span-1 row-span-1">
            <ButtonMui
              textClassName="font-normal"
              disabled={disabledButton || loading}
              showCircle={loading}
              onClick={onSubmit}
            >{t`submit`}</ButtonMui>
          </div>

          <div className="col-span-1 row-span-1">
            <ButtonMui variant="outlined" textClassName="font-normal" onClick={handleCancel}>
              {t`cancel`}
            </ButtonMui>
          </div>
        </div>
      </div>

      <DialogCustome
        open={isOpenModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmModal}
      >
        <div
          className="text-center mb-8 mt-6 text-sm"
          style={{ maxWidth: 211 }}
        >{t`confirm_message_popup`}</div>
      </DialogCustome>
    </div>
  );
}
