export interface FavoriteMemberModel {
  memberId: string;
  memberName: string;
  team: string;
  level: number;
  sponsorId: string;
  sponsorName: string;
  type: string;
  star: string;
  currentMatching: string;
  highestPosition: string;
  isFavorite: boolean;
}

export interface WatcherFetchFavoriteMemberListType {
  type: string;
  payload: string;
}

export const FETCH_FAVORITE_MEMBER_LIST = "analysis/favorite-member";
