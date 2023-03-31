/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import { CircularProgress, Drawer } from "@material-ui/core";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddIconOrange, FilterBlack, LeftNavination } from "src/components";
import { DateMonth } from "src/components/datePickerOnlyMonth/index";
import NoDataIcon from "src/components/svgs/no-data";
import { notifyToast } from "src/constants/toast";
// import { getNoteList } from "src/feature/notes/notes.slice";
import { ItemArray } from "src/feature/notes/types";
import { RootState } from "src/state/store";
import styles from "./style.module.css";
import Link from "next/link";
import { routeCreateNoteBase } from "src/constants/routes";
import { useRouter } from "next/router";
import FilterNavination from "./filter-navigation";
import { SearchHelpCenter } from "src/components/search/search-help-center";
import { getNoteListDispatch } from "src/feature/notes/notes.actions";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
dayjs.extend(isBetween);
interface ListNoteTypes {
  searchKey: string;
  startDate: Date;
  endDate: Date;
  status: string | undefined;
  setSearchKey: (searchKey: string) => void;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
  setStatus: (status: string) => void;
}
export function NoteListModule({
  searchKey,
  startDate,
  endDate,
  status,
  setSearchKey,
  setStartDate,
  setEndDate,
  setStatus,
}: ListNoteTypes) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [arrayDate, setArrayDate] = useState([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const categories = [
    "Joined",
    "Contact Back Again",
    "Not Interest",
    "Interest",
    "Waiting for the first contact",
  ];
  const NoteData = useSelector((state: RootState) => state.note.NoteData);
  const loading = useSelector((state: RootState) => state.note.loading);
  const errorMessage = useSelector((state: RootState) => state.note.errorMessage);
  const width = useGetScreenWidth();
  const dispatch = useDispatch();
  const get = useCallback(
    (days) => {
      for (let i = 0; i < days.length; i++) {
        const check = NoteData?.data?.filter((Note) => {
          const start = new Date(Note.startDate);
          const end = new Date(Note.endDate);
          const startCheck = new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate(),
            0,
            0,
            0,
          );
          const endCheck = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0);
          const dayCheck = new Date(days[i].title);
          if (dayCheck >= startCheck && dayCheck <= endCheck) {
            return true;
          } else if (
            new Date(days[i].title).getDate() === new Date(Note.endDate).getDate() &&
            new Date(days[i].title).getDate() === new Date(Note.startDate).getDate()
          ) {
            if (new Date(Note.endDate).getTime() - new Date(days[i].title).getTime() < 86400000) {
              return true;
            }
          }
          return false;
        });
        days[i].list = check;
      }
      setArrayDate(days);
    },
    [NoteData],
  );
  function abc(a: Array<Date>) {
    const arr = [];
    for (let i = 0; i < a.length; i++) {
      const date = a[i].toISOString();
      arr.push({ title: date, list: [] });
    }
    return arr;
  }
  const getArrayDate = useCallback(() => {
    const a = getDaysInMonth(startDate?.getMonth(), endDate?.getFullYear());
    return abc(a);
  }, [endDate, startDate]);

  useEffect(() => {
    const days = getArrayDate();
    NoteData && get(days);
  }, [NoteData, get, getArrayDate]);

  useEffect(() => {
    // dispatch(
    //   getNoteList({
    //     startDate: startDate?.toISOString(),
    //     endDate: endDate?.toISOString(),
    //     keyword: searchKey,
    //     status,
    //   }),
    // );

    dispatch(
      getNoteListDispatch({
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        keyword: searchKey,
        status,
      }),
    );
  }, [startDate, endDate, dispatch, status, searchKey]);
  useEffect(() => {
    errorMessage && notifyToast("error", errorMessage);
  }, [errorMessage]);
  function getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  const handleChangeDate = (value: Date) => {
    const fromDate = new Date(value?.getFullYear(), value?.getMonth(), value.getDate(), 0, 0, 0);
    const toDate = new Date(value?.getFullYear(), value?.getMonth() + 1, 0, 23, 59, 59);
    setStartDate(fromDate);
    setEndDate(toDate);
  };
  const getStatus = (status: string) => {
    switch (status) {
      case "Joined":
        return "bg-orange text-white ";
      case "Contact Back Again":
        return "bg-blue text-white";
      case "Not Interest":
        return "bg-lighterGray text-lighterGray";
      case "Interest":
        return "bg-orangeLight";
      case "Waiting for the first contact":
        return "bg-lighterGray";
    }
  };
  const handleEdit = (_id: string | undefined) => {
    router.push(`/edit-note/${_id}`);
  };
  const handleSearch = (value: string) => {
    setSearchKey(value);
  };
  return (
    <>
      <div className="mx-auto w-auto sm:w-1216 mb-8 mt-6 flex relative">
        <div className="hidden sm:block w-1/4 mr-6">
          {showFilter ? (
            <LeftNavination />
          ) : (
            <FilterNavination categories={categories} category={status} setCategory={setStatus} />
          )}
        </div>

        <div className="w-full mx-4 sm:mx-0 sm:w-3/4">
          <div className="flex  justify-between mb-5 sm:mb-6">
            <div className="text-base sm:text-xl text-black-dark">{t`note_list`}</div>
            <div className="flex">
              <div onClick={() => setShowFilter((prevCount) => !prevCount)}>
                <FilterBlack className="mr-6 sm:mr-8 cursor-pointer" />
              </div>
              <div className="text-orange items-center flex">
                <DateMonth onChange={handleChangeDate} />
              </div>
            </div>
          </div>
          <div className="min-h-[200px] sm:min-h-0">
            {loading ? (
              <div
                className={`absolute ${
                  showFilter ? "top-1/2 sm:-top-40" : ""
                } left-1/2 -translate-x-1/2 sm:-translate-x-0 -translate-y-1/2 sm:-translate-y-0 sm:left-36 flex items-center justify-center w-auto sm:w-full h-full bg-opacity-30`}
              >
                <CircularProgress />
              </div>
            ) : (
              arrayDate.length > 0 &&
              arrayDate.map((item: ItemArray, index) => {
                return (
                  <div key={index}>
                    {item.list?.length > 0 && (
                      <div>
                        <div className="text-black-dark">
                          {dayjs(item.title).format("dddd DD").toString()}
                        </div>
                        <div>
                          {item.list.map((item2) => {
                            return (
                              <div
                                key={item2._id}
                                onClick={() => handleEdit(item2._id)}
                                className={`rounded-0.3 cursor-pointer w-full h-auto ${getStatus(
                                  item2.status,
                                )} mb-2 px-2.5 py-1.5`}
                              >
                                <div className="w-2/3  text-sm truncate-2-line">{item2.title}</div>
                                <div
                                  className={`text-xs ${
                                    // eslint-disable-next-line no-nested-ternary
                                    item2.status === "Joined"
                                      ? ""
                                      : item2.status === "Contact Back Again"
                                      ? ""
                                      : item2.status === "Not Interest"
                                      ? "text-lighterGray"
                                      : "text-brown"
                                  }`}
                                >
                                  <div className="flex align-center">
                                    <div>
                                      <div>
                                        {dayjs(item2.startDate).format("DD-MM-YYYY").toString()}
                                      </div>
                                      <div>{dayjs(item2.startDate).format("HH:mm").toString()}</div>
                                    </div>
                                    <div className="p-2.5">&nbsp;-&nbsp;</div>
                                    <div>
                                      <div>
                                        {dayjs(item2.endDate).format("DD-MM-YYYY").toString()}
                                      </div>
                                      <div>{dayjs(item2.endDate).format("HH:mm").toString()}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
            {loading
              ? ""
              : NoteData?.data?.length === 0 && (
                  <div className="mt-12 mb-5 flex flex-col justify-center items-center">
                    <div>
                      <NoDataIcon />
                    </div>
                    <span className="mt-4">{t`no_data`}</span>
                  </div>
                )}
          </div>
        </div>
        <div className="relative">
          <Link href={routeCreateNoteBase}>
            <div
              className={`${styles.add_button} cursor-pointer fixed justify-center rounded-full`}
            >
              <AddIconOrange />
            </div>
          </Link>
        </div>
        <div className="absolute -top-24 right-0 hidden sm:block">
          <SearchHelpCenter placeholder={t`search`} handleSearch={handleSearch} />
        </div>
      </div>
      {width !== "Desktop" && (
        <Drawer anchor="left" open={!showFilter} onClose={() => setShowFilter(true)}>
          <div className="p-2">
            <FilterNavination categories={categories} category={status} setCategory={setStatus} />
          </div>
        </Drawer>
      )}
    </>
  );
}
