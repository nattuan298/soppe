import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";

import { RootState } from "src/store";
import {
  CollapsibleBlock,
  Input,
  InputDatePicker,
  Radio,
  SingleAutocomplete,
} from "src/components";
import { DeleteIconSection, DisableDeleteIconSection } from "src/components/icons";
import { UploadSigleImage } from "src/components/upload-image-video/upload-single-image";
import { SectionForm } from "./index";
import { getImageByKey, uploadImageFull } from "src/services/upload-image.services";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface SectionBannerProps {
  section: SectionForm;
  updateSection: (section: SectionForm) => void;
  deleteSection: (id: string) => void;
  showError: boolean;
  disableDeleteSeciton: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

export const SectionBanner = ({
  section,
  showError,
  disableDeleteSeciton,
  dragHandleProps,
  updateSection,
  deleteSection,
}: SectionBannerProps) => {
  const { t } = useTranslation("common");
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [urlPreview, setUrlPreview] = useState<string | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [stateName, setStateName] = useState(section.data.name);

  const { type, countDown, sectionSlideId } = section.data;
  const { countdownPeriodError, nameError, sectionSlideIdError } = section.error;

  const { productSectionActive } = useSelector(
    (state: RootState) => state.internalProductSectionLoop,
  );

  const { bannerSectionActive } = useSelector((state: RootState) => state.internalBannersSlice);

  const sectionOptions = useMemo(() => {
    if (type === "PRODUCT") {
      return productSectionActive.map(({ _id, name }) => ({ _id, name }));
    }
    return bannerSectionActive.map(({ _id, name }) => ({ _id, name }));
  }, [type, productSectionActive, bannerSectionActive]);

  useEffect(() => {
    const getImageURL = async (key: any) => {
      const url = await getImageByKey({ key });
      setUrlPreview(encodeURI(url));
    };
    if (!section.isNew) {
      const { data } = section;
      if (data.startDate && data.endDate) {
        setFrom(new Date(data.startDate));
        setTo(new Date(data.endDate));
      }
      if (data.icon && data.icon !== "") {
        getImageURL(data.icon);
      }
      setStateName(data.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getKeyImage = async (file: File) => {
    const key = await uploadImageFull({ file, moduleName: "banner" });
    return key;
  };

  useEffect(() => {
    const updateIconImage = async () => {
      if (icon) {
        const keyImage = await getKeyImage(icon);
        const { data, error } = section;
        data.icon = keyImage;
        updateSection({ ...section, data, error });
      }
    };
    updateIconImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icon]);

  const IconDelete = useMemo(
    () => (disableDeleteSeciton ? <DisableDeleteIconSection /> : <DeleteIconSection />),
    [disableDeleteSeciton],
  );

  const labelSelectSlice = useMemo(() => {
    if (type === "PRODUCT") {
      return t`select-product-slide`;
    }
    return t`select-banner-slide`;
  }, [type, t]);

  const placeHolderSelectSlice = useMemo(() => {
    if (type === "PRODUCT") {
      return t`search-select-product-slide`;
    }
    return t`search-select-banner-slide`;
  }, [type, t]);

  const selectedOptions = useMemo(() => {
    const selectedOption = sectionOptions.filter(({ _id }) => _id === sectionSlideId);
    return selectedOption;
  }, [sectionOptions, sectionSlideId]);

  const heading = useMemo(
    () => (
      <div className="flex mr-12">
        <div className="flex flex-grow items-center">
          <div {...dragHandleProps}>
            <MenuIcon />
          </div>
          <p className="ml-6">{`${t("section")} ${section.data.position}`}</p>
          <p className="ml-6 text-orange-light">{stateName}</p>
        </div>
        <button onClick={() => deleteSection(section.id)} disabled={disableDeleteSeciton}>
          {IconDelete}
        </button>
      </div>
    ),
    [section, dragHandleProps, IconDelete, disableDeleteSeciton, stateName, deleteSection],
  );

  const handleSelectDate = useCallback(
    (startDate, endDate) => {
      const { data, error } = section;
      setFrom(startDate);
      setTo(endDate);
      if (startDate && endDate) {
        data.startDate = startDate.toISOString();
        data.endDate = endDate.toISOString();
        error.countdownPeriodError = null;
      } else {
        data.startDate = "";
        data.endDate = "";
        error.countdownPeriodError = "required_fields";
      }
    },
    [section],
  );

  const handleSelectSectionType = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { data, error } = section;
    data.type = value;
    data.sectionSlideId = "";
    error.sectionSlideIdError = "required_fields";
    if (value === "BANNER") {
      data.countDown = false;
      data.startDate = "";
      data.endDate = "";
      error.countdownPeriodError = null;
    }
    updateSection({ ...section, data, error });
  };

  const handleChangeSectionSlideId = ({ _id }: { _id: string }) => {
    const { data, error } = section;
    if (_id) {
      data.sectionSlideId = _id;
      error.sectionSlideIdError = null;
    } else {
      data.sectionSlideId = "";
      error.sectionSlideIdError = "required_fields";
    }
    updateSection({ ...section, data, error });
  };

  const handleChangeName = () => {
    const { data, error } = section;
    data.name = stateName;
    if (stateName.trim() === "") {
      error.nameError = "required_fields";
    } else {
      error.nameError = null;
    }
    updateSection({ ...section, data, error });
  };

  const handleUpdateCountdown = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { data, error } = section;
    data.countDown = value === "1";
    if (value === "0") {
      data.startDate = "";
      data.endDate = "";
      error.countdownPeriodError = null;
    } else if (data.startDate === "") {
      error.countdownPeriodError = "required_fields";
    }
    updateSection({ ...section, data, error });
  };

  const handleChangeStateName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setStateName(value);
  };

  return (
    <CollapsibleBlock heading={heading} classHeading="flex-grow" className="section-banner mb-5">
      <div className="w-full">
        <div className="w-6/12">
          <label className="block">
            <span className="block mt-2 text-sm text-black required">{t`section-name`}</span>
            <Input
              name="section-name"
              className="h-12 w-full mt-1"
              type="text"
              placeholder={t`section-name`}
              inputProps={{
                maxLength: 2500,
              }}
              value={stateName}
              onChange={handleChangeStateName}
              onBlur={handleChangeName}
            />
            {useMemo(() => {
              if (showError) {
                return <p className="text-sm text-red-light mt-2">{t(nameError as "to_ship")}</p>;
              }
              return null;
            }, [t, showError, nameError])}
          </label>
        </div>
        <div className="w-6/12">
          <span className="block mt-2 text-sm text-black">{t`section-icon`}</span>
          <UploadSigleImage
            name={t`upload-the-image-or-video`}
            maxFileSize={2097152}
            urlDefaultPreview={urlPreview}
            setImage={setIcon}
          />
        </div>
        <div className="w-6/12 flex mt-2">
          <div className="block w-full">
            <span className="block mt-2 text-sm text-black required">{t`section-type`}</span>
            <div className="radio-group">
              <div className="float-left flex justify-between items-center ">
                <Radio
                  checked={type === "PRODUCT"}
                  onChange={handleSelectSectionType}
                  value={"PRODUCT"}
                  name="radio-button-demo"
                />
                <label className="radio-lable">
                  <span className="text-sm">{t`product-side`}</span>
                </label>
              </div>
              <div className="float-left flex justify-between items-center pl-12">
                <Radio
                  checked={type === "BANNER"}
                  onChange={handleSelectSectionType}
                  value={"BANNER"}
                  name="radio-button-demo"
                />
                <label className="radio-lable">
                  <span className="text-sm">{t`banner-slide`}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {type !== "BANNER" && (
          <div className="w-6/12 flex mt-2">
            <div className="block w-full">
              <span className="block mt-2 text-sm text-black required">{t`count-down`}</span>
              <div className="radio-group">
                <div className="float-left flex justify-between items-center ">
                  <Radio
                    checked={countDown}
                    onChange={handleUpdateCountdown}
                    value={"1"}
                    name="radio-button-demo"
                    disabled={type === "BANNER"}
                  />
                  <label className="radio-lable">
                    <span className="text-sm">{t`enable`}</span>
                  </label>
                </div>
                <div className="float-left flex justify-between items-center pl-12">
                  <Radio
                    checked={!countDown}
                    onChange={handleUpdateCountdown}
                    value={"0"}
                    name="radio-button-demo"
                    disabled={type === "BANNER"}
                  />
                  <label className="radio-lable">
                    <span className="text-sm">{t`disable`}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        {countDown && (
          <div className="w-6/12 flex mt-2">
            <label className="block w-7/12 mr-2">
              <span className="block mt-2 mb-1 text-sm text-black required">
                {t`count-down-period`}
              </span>
              <InputDatePicker
                handleSelect={handleSelectDate}
                className="h-12 w-full focus:outline-none ring-gray-300 ring-1 focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic"
                defaultFrom={from}
                defaultTo={to}
                minDate={new Date()}
              />
              {showError && (
                <p className="text-sm text-red-light mt-2">
                  {t(countdownPeriodError as "to_ship")}
                </p>
              )}
            </label>
          </div>
        )}

        <div className="w-6/12 flex mt-2 mb-5">
          <label className="block w-7/12 mr-2">
            <span className="block mt-2 mb-1 text-sm text-black required">{labelSelectSlice}</span>
            {/* <Select
                className="float-left w-full h-12 rounded-md mt-1"
                placeholder={placeHolderSelectSlice}
                options={sectionOptions}
                defaultValue={sectionSlideId}
                onChange={handleChangeSectionSlideId}
              />
              {showError && <p className="text-sm text-red-light mt-16">{sectionSlideIdError}</p>} */}
            <SingleAutocomplete
              className="float-left w-full h-12 rounded-md mt-1 text-sm"
              options={sectionOptions}
              placeholder={placeHolderSelectSlice}
              errorMessage={
                // (showError && t(validate.errorSectionSlideId as "to_ship")) || undefined
                (showError && t(sectionSlideIdError as "to_ship")) || undefined
              }
              selectedOptions={selectedOptions}
              onSelect={handleChangeSectionSlideId}
            />
          </label>
        </div>
      </div>
    </CollapsibleBlock>
  );
};
