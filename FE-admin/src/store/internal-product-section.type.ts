import { ParamListRequestProductModel } from "src/types/params-list-request.model";

export const FETCH_PRODUCT_SECTION_LIST = "internalProductSection/internalProductSection";

export interface WatcherProductSectionListType {
  type: string;
  payload: ParamListRequestProductModel;
}
