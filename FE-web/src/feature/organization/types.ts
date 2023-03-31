export interface ApiListModel<T> {
  data: Array<T>;
  limit: number;
  page: number;
  total: number;
}

export interface ParamsModel {
  page: number;
  pageSize: number;
  team: string;
  keyword?: string;
}

export interface TreeNodeType {
  memberId?: string;
  parentMemberId: string;
  memberName: string;
  locationCode?: string;
  privatePVThisMonth?: number;
  pvOldLeft?: number;
  pvNewLeft?: number;
  pvTotalLeft?: number;
  pvOldRight?: number;
  pvNewRight?: number;
  pvTotalRight?: number;
  team?: string;
  isFavorite?: boolean;
  child?: Array<TreeNodeType>;
}
export interface OrganizationTreeType {
  currentMatching: string;
  highestPosition: string;
  badgePosition: string;
  starPosition: string;
  applicationForm: string;
  copyOfSelfIDCard: string;
  bookBank: string;
  privatePVthisMoth: number;
  pvLeft: number;
  pvLeftThisMonth: number;
  totalPVLeft: number;
  bmcPVLeft: number;
  starSup: number;
  privatePVFirstSixtyDays: number;
  pvRight: number;
  pvRightThisMonth: number;
  totalPVRight: number;
  bmcPVRight: number;
  startEx: number;
  treeData: Array<TreeNodeType>;
}

export const FETCH_ORGANIZATION_CHART = "analysis/orgniztion-chart";

export const FETCH_ORGANIZATION_TREE = "getOrgniztionTree";
export interface WatcherFetchOrganization {
  type: string;
  payload: string;
}
