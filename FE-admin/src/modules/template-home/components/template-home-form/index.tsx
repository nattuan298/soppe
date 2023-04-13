import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Button, CollapsibleBlock, Modal } from "src/components";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { routeHomePageTemplateManagement } from "src/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { notifyToast } from "src/constants/toast";
import { v4 as uuidv4 } from "uuid";
import arrayMove from "array-move";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

import { RootState } from "src/store";
import { fetchBannerSliceActiveList } from "src/store/internal-banner-slice.action";
import { fetchProductSectionActiveList } from "src/store/internal-product-section-loop.action";
import { fetchHomeTemplateListSelected } from "src/store/template-home.action";
import { getParams } from "src/store/router-params.slice";
import { internalProductSlide } from "./schema";
import { InformationTemplatePage } from "./information";
import { SectionBanner } from "./section-banner";
import {
  createSectionTemplateHomeService,
  createTemplateHomeService,
  deleteSectionTemplateHomeService,
  editTemplateHomeService,
} from "src/services/templatehome.services";

import "./style.css";

interface ParamsType {
  id: string;
}

export interface SectionForm {
  id: string;
  isNew: boolean;
  data: {
    position: number;
    name: string;
    icon: string;
    countDown: boolean;
    type: string;
    startDate: string;
    endDate: string;
    sectionSlideId: string;
  };
  error: {
    nameError: string | null;
    countdownPeriodError: string | null;
    sectionSlideIdError: string | null;
  };
}

const DEFAULT_COUNTRY = "Thailand";

export function TemplateHomeForm() {
  const [status, setStatus] = useState<string>("Inactive");
  const [sections, setSections] = useState<Array<any>>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [location, setLocation] = useState<string>(DEFAULT_COUNTRY);

  const { id } = useParams<ParamsType>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const { hometemplateSelect, loading } = useSelector(
    (state: RootState) => state.internalHometemplate,
  );

  const checkValidate = useMemo(
    () =>
      sections.some(
        ({ error }: SectionForm) =>
          error.countdownPeriodError || error.nameError || error.sectionSlideIdError,
      ),
    [sections],
  );

  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
      dispatch(fetchHomeTemplateListSelected(id));
    } else {
      const defaultSection = createNewSection(1);
      setSections([defaultSection]);
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchBannerSliceActiveList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductSectionActiveList(location));
  }, [location, dispatch]);

  const redirectPage = () => {
    const page = sessionStorage.getItem("template-homepage-slide");
    if (!page) {
      history.push(routeHomePageTemplateManagement);
    }
    return history.push(`${routeHomePageTemplateManagement}?page=${page}`);
  };

  const createTemplateHome = async (name: string, countryCode: string) => {
    const sectionsBody = sections.map(({ data }: SectionForm) => ({
      icon: data.icon,
      name: data.name,
      countDown: data.countDown,
      startDate: data.startDate,
      endDate: data.endDate,
      type: data.type,
      position: data.position,
      sectionSlideId: data.sectionSlideId,
    }));
    const body = { status, countryCode, sections: sectionsBody, name };
    try {
      const response = await createTemplateHomeService(body);
      if (!response?.statusCode) {
        redirectPage();
      }
    } catch (error: any) {
      notifyToast("error", error.message, t);
    }
  };

  const editTemplateHome = async (name: string, countryCode: string) => {
    const existSections = hometemplateSelect?.sections || [];
    const existSectionsId = existSections.map(({ _id }) => _id);
    const currentSectionsId = sections.map(({ data }) => data._id);
    const addSectionsId = currentSectionsId.filter((item) => !existSectionsId.includes(item));
    const deleteProducts = existSectionsId.filter((item) => !currentSectionsId.includes(item));
    try {
      const deletePromise = deleteProducts.map(
        (item) => item && deleteSectionTemplateHomeService(item),
      );
      await Promise.all([...deletePromise]);
      const sectionAddBody = sections
        .filter(({ data }) => addSectionsId.includes(data._id))
        .map(({ data }: SectionForm) => ({ ...data }));
      const responseAdd =
        sectionAddBody.length > 0 &&
        (await createSectionTemplateHomeService(id, { sections: sectionAddBody }));
      const editSectionBody = sections
        .filter(({ data }) => !addSectionsId.includes(data._id))
        .map(({ data }: SectionForm) => ({ ...data }));
      const editTemplateHomeBody = {
        _id: id,
        name,
        status,
        countryCode,
        sections: editSectionBody,
      };
      const responseEdit = await editTemplateHomeService(editTemplateHomeBody);
      if (!responseEdit?.statusCode && !responseAdd?.statusCode) {
        redirectPage();
      }
    } catch (error: any) {
      notifyToast("error", error.message, t);
    }
  };

  const handleSubmit = async (values: any) => {
    const { name } = values;
    if (name === "" || checkValidate) {
      return;
    }
    try {
      if (id && hometemplateSelect) {
        editTemplateHome(name, location);
      } else {
        createTemplateHome(name, location);
      }
    } catch (e: any) {
      notifyToast("error", e.response.data?.message, t);
    }
  };

  const getExistSections = (existSections: Array<any>) => {
    const sections = existSections.map((item) => ({
      id: uuidv4(),
      isNew: false,
      data: { ...item },
      error: {
        nameError: null,
        countdownPeriodError: null,
        sectionSlideIdError: null,
      },
    }));
    return sections;
  };

  useEffect(() => {
    if (!hometemplateSelect || loading) {
      return;
    }
    setStatus(hometemplateSelect?.status || "Inactive");
    setLocation(hometemplateSelect?.countryCode || DEFAULT_COUNTRY);
    const existSections = getExistSections(hometemplateSelect.sections || []);
    setSections(existSections);
  }, [hometemplateSelect, loading]);

  const initialValues = useMemo(() => {
    if (hometemplateSelect) {
      const { name } = hometemplateSelect;
      return {
        name,
      };
    }
    return {
      name: "",
    };
  }, [hometemplateSelect]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: internalProductSlide,
  });

  const handleChangeLocation = (value: string) => {
    if (value) {
      const defaultSection = createNewSection(1);
      setSections([defaultSection]);
      setLocation(value);
    }
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    redirectPage();
  };

  const createNewSection = (position: number) => {
    return {
      id: uuidv4(),
      isNew: true,
      data: {
        position,
        name: "",
        icon: "",
        countDown: false,
        type: "PRODUCT",
        startDate: "",
        endDate: "",
        sectionSlideId: "",
      },
      error: {
        nameError: "required_fields",
        countdownPeriodError: null,
        sectionSlideIdError: "required_fields",
      },
    };
  };

  const handleAddNewSection = () => {
    const position = sections.length + 1;
    const defaultSection = createNewSection(position);
    setSections([...sections, defaultSection]);
  };

  const updateSection = (section: SectionForm) => {
    setSections((state) =>
      state
        .map((item) => {
          if (item.id === section.id) {
            return section;
          }
          return item;
        })
        .map((item: SectionForm, idx, currentSectiosn) => {
          const { error } = item;
          const checkUniqueName = currentSectiosn.find(
            ({ id, data }) =>
              item.id !== id &&
              item.data.name.toLocaleUpperCase() === data.name.toLocaleUpperCase(),
          );
          if (checkUniqueName) {
            error.nameError = "Section name must be unique.";
          } else if (item.data.name !== "" && error.nameError === "Section name must be unique.") {
            error.nameError = null;
          }
          return { ...item, error };
        }),
    );
  };

  const deleteSection = (id: string) => {
    setSections((preState) =>
      preState
        .filter((section) => section.id !== id)
        .map((item: SectionForm, index) => {
          const { data } = item;
          data.position = index + 1;
          return { ...item, data };
        }),
    );
  };

  const handleSetShowError = () => {
    setShowError(true);
  };

  const onSortEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const oldIndex = source.index;
    const newIndex = destination.index;
    const newArray = arrayMove(sections, oldIndex, newIndex);
    const newSections = newArray.map((item: SectionForm, index) => {
      const { data } = item;
      data.position = index + 1;
      return { ...item, data };
    });
    setSections(newSections);
  };

  const disableDeleteSeciton = useMemo(() => sections.length === 1, [sections.length]);
  const disableAddSection = useMemo(() => sections.length >= 10, [sections.length]);

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-start">
          <div className="w-full flex-1 items-start">
            <CollapsibleBlock className="mb-5 section-banner" heading={t`template-information`}>
              <InformationTemplatePage
                formik={formik}
                status={status}
                location={location}
                disableCountry={!!id}
                setStatus={setStatus}
                handleChangeLocation={handleChangeLocation}
              />
            </CollapsibleBlock>
            <DragDropContext onDragEnd={onSortEnd}>
              <Droppable droppableId="droppable">
                {(provided: DroppableProvided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {sections.map((section, index) => (
                      <Draggable key={section.id} draggableId={section.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps}>
                            <SectionBanner
                              key={section.id}
                              section={section}
                              updateSection={updateSection}
                              deleteSection={deleteSection}
                              showError={showError}
                              disableDeleteSeciton={disableDeleteSeciton}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="w-full mb-5">
              <Button
                variant="text"
                disabled={disableAddSection}
                className={`w-full wide:py-5 py-4 text-center ${
                  disableAddSection ? "disable-new-section" : "add-new-section"
                }`}
                onClick={handleAddNewSection}
              >{t`add-new-section`}</Button>
            </div>
            <div className="button-wapper px-5 mb-10 flex">
              <Button
                variant="text"
                type="submit"
                className="bg-orange-light text-white h-12 w-72 hover:bg-orange-hover"
                onClick={handleSetShowError}
              >
                {t`submit`}
              </Button>
              <Button
                variant="text"
                className="bg-white border h-12 w-72 ml-4 button-cancel"
                onClick={openModal}
              >
                {t`cancel`}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Modal
        open={isOpenModal}
        confirmType={"cancel"}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
}
