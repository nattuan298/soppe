/* eslint-disable indent */
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  ButtonMui,
  ButtonMuiDelete,
  ButtonMuiLight,
  DatePicker,
  LeftNavination,
  ModalConfirm,
  Select,
  Title,
} from "src/components";
import InputBasic from "src/components/input/input-basic";
import TextArea from "src/components/input/text-area";
import { SelectNoteStatus } from "src/components/select/select-status-note";
import DeleteIcon from "src/components/svgs/deleteIcon";
import { routeNotesBase } from "src/constants/routes";
import { NoteModelForm } from "src/feature/notes/types";
import { createNote, deleteNote, updateNote } from "src/services/note.services";
// import { getNoteById } from "src/feature/notes/notes.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/store";
import { CircularProgress } from "@material-ui/core";
import { notifyToast } from "src/constants/toast";
import { getNoteListByIdDispatch } from "src/feature/notes/notes.actions";

interface AddressFormProps {
  mode?: "create" | "edit";
}
dayjs.extend(isBetween);
const valueStatus = [
  {
    title: "joined",
    value: "Joined",
  },
  {
    title: "interest",
    value: "Interest",
  },
  {
    title: "contact_back_again",
    value: "Contact Back Again",
  },
  {
    title: "not_interest",
    value: "Not Interest",
  },
  {
    title: "waiting_for_the_first_contact",
    value: "Waiting for the first contact",
  },
];
export function NoteFormModule({ mode }: AddressFormProps) {
  const [, setErrorDate] = useState("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState<boolean>(false);
  const [confirmTypeCancel] = useState<"cancel">("cancel");
  const [confirmType] = useState<"action">("action");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [hourStartDate, setHourStartDate] = useState<string>("0");
  const [minuteStartDate, setMinuteStartDate] = useState<string>("0");
  const [hourEndDate, setHourEndDate] = useState<string>("0");
  const [minuteEndDate, setMinuteEndDate] = useState<string>("0");
  const [listHours, setListHours] = useState<Array<{ title: string; value: string }>>([]);
  const [listMinutes, setListMinutes] = useState<Array<{ title: string; value: string }>>([]);

  const date = new Date();
  const [note, setNote] = useState<NoteModelForm>({
    title: "",
    status: "Joined",
    startDate: date.toISOString(),
    endDate: date.toISOString(),
    details: "",
  });
  const [error, setError] = useState({
    title: "",
    status: "",
    startDate: "",
    endDate: "",
    details: "",
  });
  const noteDetail = useSelector((state: RootState) => state.note.noteDetail);
  const loading = useSelector((state: RootState) => state.note.loading);
  const [match, setMatch] = useState(true);
  useEffect(() => {
    if (mode === "edit") {
      const newValue = {
        title: noteDetail.title,
        memberId: noteDetail.memberId,
        status: noteDetail.status,
        startDate: noteDetail.startDate,
        endDate: noteDetail.endDate,
        details: noteDetail.details,
      };
      setHourStartDate(new Date(noteDetail.startDate).getHours().toString());
      setMinuteStartDate(new Date(noteDetail.startDate).getMinutes().toString());
      setHourEndDate(new Date(noteDetail.endDate).getHours().toString());
      setMinuteEndDate(new Date(noteDetail.endDate).getMinutes().toString());
      setNote(newValue);
    }
  }, [noteDetail, mode]);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const router = useRouter();
  const { id } = router.query;
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
  const minuteOptionsStep = minuteOptions.filter((item) => parseInt(item.value) % 5 === 0);

  useEffect(() => {
    const endHourOptionsStep = hourOptions.filter(
      (item) => parseInt(item.value) > parseInt(hourStartDate),
    );
    const endMinuteOptionsStep = minuteOptionsStep.filter(
      (item) => parseInt(item.value) >= parseInt(minuteStartDate),
    );
    if (new Date(note.startDate).getTime() > new Date(note.endDate).getTime()) {
      setNote({ ...note, endDate: note.startDate });
    }
    const startCheck = new Date(
      new Date(note.startDate).getFullYear(),
      new Date(note.startDate).getMonth(),
      new Date(note.startDate).getDate(),
      0,
      0,
      0,
    );
    const endCheck = new Date(
      new Date(note.endDate).getFullYear(),
      new Date(note.endDate).getMonth(),
      new Date(note.endDate).getDate(),
      0,
      0,
      0,
    );
    if (new Date(startCheck).getTime() === new Date(endCheck).getTime()) {
      setMatch(true);
      if (parseInt(hourStartDate) - new Date(note.endDate).getHours() <= 1) {
        const hourStartDateHere = parseInt(hourStartDate) + 1;
        setHourEndDate(hourStartDateHere.toString());
      }
      setListHours(endHourOptionsStep);
      setListMinutes(endMinuteOptionsStep);
      setMinuteEndDate(minuteStartDate);
    } else {
      setMatch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.startDate, note.endDate, hourStartDate, minuteStartDate]);
  useEffect(() => {
    if (id && mode === "edit") {
      // dispatch(getNoteById(id));
      dispatch(getNoteListByIdDispatch({ id }));
    }
  }, [dispatch, id, mode]);

  const handleChange = (name: "title" | "details") => (e: ChangeEvent<HTMLInputElement>) => {
    if (name) {
      if (name === "title") {
        const newValue = { ...note, title: e.target.value };
        setNote(newValue);
        setError({ ...error, title: "" });
      }
      if (name === "details") {
        const newValue = { ...note, details: e.target.value };
        setNote(newValue);
        setError({ ...error, details: "" });
      }
    }
  };
  const handleChangeSelect = (name: "status") => (e: { title: string; value: string }) => {
    if (e.value) {
      if (name === "status") {
        setNote({ ...note, status: e.value });
      }
    }
  };
  useEffect(() => {
    if (new Date(note.startDate).getTime() > new Date(note.endDate).getTime()) {
      setNote({ ...note, endDate: note.startDate });
    }
  }, [note]);

  const handleChangeStartDate = (value: Date) => {
    setErrorDate("");
    setNote({ ...note, startDate: value.toISOString() });
  };
  const handleChangeEndDate = (value: Date) => {
    setErrorDate("");
    setNote({ ...note, endDate: value.toISOString() });
  };
  const handleChangeHourStartDate = (e: { title: string; value: string }) => {
    if (!e.value) {
      return;
    }
    setErrorDate("");
    setHourStartDate(e.value);
    const startCheck = new Date(
      new Date(note.startDate).getFullYear(),
      new Date(note.startDate).getMonth(),
      new Date(note.startDate).getDate(),
      0,
      0,
      0,
    );
    const endCheck = new Date(
      new Date(note.endDate).getFullYear(),
      new Date(note.endDate).getMonth(),
      new Date(note.endDate).getDate(),
      0,
      0,
      0,
    );
    if (startCheck.getTime() === endCheck.getTime()) {
      if (e.value === "23") {
        const dates = new Date(note.endDate);
        dates.setDate(dates.getDate() + 1);
        setNote({ ...note, endDate: dates.toISOString() });
        setHourEndDate("0");
      } else {
        const value = parseInt(e.value) + 1;
        setHourEndDate(value.toString());
        setMinuteEndDate(minuteStartDate);
      }
    }
  };
  const handleChangeMinuteStartDate = (e: { title: string; value: string }) => {
    if (!e.value) {
      return;
    }
    setErrorDate("");
    setMinuteStartDate(e.value);
    if (new Date(note.startDate).getTime() === new Date(note.endDate).getTime()) {
      setMinuteEndDate(e.value);
    }
  };
  const handleChangeHourEndDate = (e: { title: string; value: string }) => {
    if (!e.value) {
      return;
    }
    setErrorDate("");
    setHourEndDate(e.value);
  };

  const handleChangeMinuteEndDate = (e: { title: string; value: string }) => {
    if (!e.value) {
      return;
    }
    setErrorDate("");
    setMinuteEndDate(e.value);
  };
  const handleValidate = () => {
    let isValid = true;
    const newError = { ...error };
    if (note.title === "") {
      newError.title = "required_fields";
      isValid = false;
    }
    setError(newError);
    return isValid;
  };
  async function handleSubmit() {
    setLoadingButton(true);
    const isValid = handleValidate();
    !isValid && setLoadingButton(false);
    if (isValid && mode === "create") {
      const startDate = new Date(note.startDate);
      startDate.setHours(parseInt(hourStartDate));
      startDate.setMinutes(parseInt(minuteStartDate));
      const endDate = new Date(note.endDate);
      endDate.setHours(parseInt(hourEndDate));
      endDate.setMinutes(parseInt(minuteEndDate));
      const bodyRequest = {
        ...note,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await createNote(bodyRequest);
        if (response.status === 201) {
          setLoadingButton(false);
          router.push(routeNotesBase);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setErrorDate(e.response.data.message);
        setLoadingButton(false);
      }
    } else if (isValid && mode === "edit") {
      const startDate = new Date(note.startDate);
      startDate.setHours(parseInt(hourStartDate));
      startDate.setMinutes(parseInt(minuteStartDate));
      const endDate = new Date(note.endDate);
      endDate.setHours(parseInt(hourEndDate));
      endDate.setMinutes(parseInt(minuteEndDate));
      const bodyRequest = {
        ...note,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await updateNote(id, bodyRequest);
        if (response.status === 200) {
          setLoadingButton(false);
          router.push(routeNotesBase);
        }
      } catch (e) {
        /* @ts-ignore */
        setErrorDate(e.response.data.message);
        setLoadingButton(false);
      }
    }
  }
  const handleConfirmCancel = async () => {
    setNote({
      title: "",
      status: "Joined",
      startDate: date.toISOString(),
      endDate: date.toISOString(),
      details: "",
    });
    router.push(routeNotesBase);
  };
  const handleCancelConfirm = async () => {
    setIsOpenModal(false);
    setIsOpenModalCancel(false);
  };
  const handleConfirm = async () => {
    try {
      const response = await deleteNote(id);
      if (response.status === 200) {
        router.push(routeNotesBase);
      }
    } catch (error) {
      /* @ts-ignore */
      notifyToast("error", error.response.data.message);
    }
  };
  return (
    <>
      <div className="mx-4 sm:mx-auto w-auto sm:w-1216 mb-8 mt-6 flex relative">
        <div className="hidden sm:block w-1/4 mr-6">
          <LeftNavination />
        </div>
        {loading && mode === "edit" ? (
          <div className="absolute -top-40 left-36 flex items-center justify-center w-full h-full bg-opacity-30">
            <CircularProgress />
          </div>
        ) : (
          <div className="w-full sm:w-3/4">
            <div>
              <div className="grid-cols-2 grid gap-4 sm:gap-8">
                <div className="col-span-2 sm:col-span-1">
                  <Title title={t`title`} isRequired />
                  <InputBasic
                    placeholder={t`title`}
                    maxlegth={255}
                    value={note.title}
                    onChange={handleChange("title")}
                    error={!!error.title}
                    helperText={error.title}
                    t={t}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Title title={t`status`} isRequired />
                  <SelectNoteStatus
                    options={valueStatus}
                    defaultValue={note.status}
                    onChange={handleChangeSelect("status")}
                    trans={t}
                  />
                </div>
              </div>
              <div className="grid-cols-1 grid gap-8 my-4 sm:my-0">
                <div className="col-span-1">
                  <Title title={t`details`} />
                  <TextArea
                    placeholder={t`details`}
                    maxLen={2000}
                    value={note.details}
                    onChange={handleChange("details")}
                  />
                </div>
              </div>
              <div className="grid-cols-2 grid gap-4 sm:gap-8">
                <div className="col-span-2 sm:col-span-1">
                  <Title title={t`start_date_time`} isRequired />
                  <div className="flex">
                    <div className="w-3/5">
                      <DatePicker
                        defaultDate={new Date(note.startDate)}
                        onChange={handleChangeStartDate}
                      />
                    </div>
                    <div className="w-1/5 mr-1 ml-1">
                      <Select
                        className="float-left w-full h-12 rounded-md"
                        options={hourOptions}
                        defaultValue={hourStartDate}
                        onChange={handleChangeHourStartDate}
                      />
                    </div>
                    <div className="py-3">:</div>
                    <div className="w-1/5 ml-1">
                      <Select
                        className="float-left w-full h-12 rounded-md"
                        options={minuteOptionsStep}
                        defaultValue={minuteStartDate}
                        onChange={handleChangeMinuteStartDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Title title={t`end_date_time`} isRequired />
                  <div className="flex">
                    <div className="w-3/5">
                      <DatePicker
                        defaultDate={new Date(note.endDate)}
                        onChange={handleChangeEndDate}
                        minDate={new Date(note.startDate)}
                      />
                    </div>
                    <div className="w-1/5 mr-1 ml-1">
                      <Select
                        className="float-left w-full h-12 rounded-md"
                        options={match ? listHours : hourOptions}
                        defaultValue={hourEndDate}
                        onChange={handleChangeHourEndDate}
                      />
                    </div>
                    <div className="py-3">:</div>
                    <div className="w-1/5 ml-1">
                      <Select
                        className="float-left w-full h-12 rounded-md"
                        options={match ? listMinutes : minuteOptionsStep}
                        defaultValue={minuteEndDate}
                        onChange={handleChangeMinuteEndDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {mode === "create" ? (
                  <div className="sm:flex w-full mt-6">
                    <div className="w-full sm:w-1/2">
                      <ButtonMui
                        onClick={handleSubmit}
                        showCircle={loadingButton}
                      >{t`save`}</ButtonMui>
                    </div>
                    <div className="w-full sm:w-1/2 mt-4 sm:mt-0 ml-0 sm:ml-[15px]">
                      <ButtonMuiLight
                        variant="outlined"
                        textClassName="font-normal"
                        onClick={() => setIsOpenModalCancel(true)}
                      >
                        {t`cancel`}
                      </ButtonMuiLight>
                    </div>
                  </div>
                ) : (
                  <div className="sm:flex w-full mt-6">
                    <div className="w-full sm:w-1/3">
                      <ButtonMui
                        showCircle={loadingButton}
                        onClick={handleSubmit}
                      >{t`save`}</ButtonMui>
                    </div>
                    <div className="w-full sm:w-1/3 mt-4 sm:mt-0 ml-0 sm:ml-[15px]">
                      <ButtonMuiLight
                        variant="outlined"
                        textClassName="font-normal"
                        onClick={() => setIsOpenModalCancel(true)}
                      >
                        {t`cancel`}
                      </ButtonMuiLight>
                    </div>
                    <div className="w-full sm:w-1/3 mt-4 sm:mt-0 ml-0 sm:ml-[15px]">
                      <ButtonMuiDelete
                        startIcon={<DeleteIcon />}
                        variant="outlined"
                        textClassName="font-normal"
                        onClick={() => setIsOpenModal(true)}
                      >
                        {t`delete_note`}
                      </ButtonMuiDelete>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalConfirm
        open={isOpenModalCancel}
        confirmType={confirmTypeCancel}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirmCancel}
      />
      <ModalConfirm
        open={isOpenModal}
        confirmType={confirmType}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
      />
    </>
  );
}
