export interface InternalBannerLoopModel {
  createdAt?:string;
  name
  :
  string;
  status
  :
  string;
  updatedAt?:string;
  url?:string;
  __v?:number;
  _id:string;
}

export interface InternalBannerLoopBody {
  name: string;
  url: string;
  status: string;
}

export interface InternalBannerSectionModel extends InternalBannerLoopModel {
  type: string;
}
export interface InternalBannerSectionLoopBody extends InternalBannerLoopBody {
  type: string;
}
